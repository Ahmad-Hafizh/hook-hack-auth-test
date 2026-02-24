import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/config/prisma/prisma";
import stripe from "@/lib/stripe/stripe";
import { getPlanByPriceId, getPlanByKey, VIDEO_ADDON, PlanConfig } from "@/lib/stripe/plans";
import { sendSubscriptionEmail } from "@/lib/resendService";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/** Returns true if the plan is a support-only plan (no video credits) */
function isSupportPlan(plan: PlanConfig | undefined): boolean {
  return plan?.key === "company_support";
}

/** Resolve user from email — uses findUnique on unique email field */
async function resolveUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

/** Resolve user from Stripe customer ID metadata or email fallback */
async function resolveUserFromCustomerId(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return null;

  // Prefer userId from customer metadata (set during checkout)
  const metaUserId = customer.metadata?.userId;
  if (metaUserId) {
    const user = await prisma.user.findUnique({ where: { userId: metaUserId } });
    if (user) return user;
  }

  // Fallback: email lookup
  const email = customer.email;
  if (!email) return null;
  return resolveUserByEmail(email);
}

/** Check if a transaction with this stripeSessionId already exists (idempotency) */
async function isAlreadyProcessed(stripeSessionId: string): Promise<boolean> {
  const existing = await prisma.transaction.findUnique({
    where: { stripeSessionId },
    select: { id: true },
  });
  return !!existing;
}

export async function POST(req: NextRequest) {
  console.log("[Stripe Webhook] Received request.");

  if (!webhookSecret) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured.");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log(`[Stripe Webhook] Verified event: ${event.type} (${event.id})`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `[Stripe Webhook] Signature verification failed: ${message}`
      );
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Handler failed:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutSessionCompleted(session: any) {
  try {
    console.log(`[Stripe Webhook] Processing session: ${session.id}`);
    if (session.payment_status !== "paid") {
      console.log(`[Stripe Webhook] Session ${session.id} not paid, skipping.`);
      return;
    }

    // Idempotency check — if transaction already exists, skip entirely
    if (await isAlreadyProcessed(session.id)) {
      console.log(`[Stripe Webhook] Session ${session.id} already processed, skipping.`);
      return;
    }

    // Resolve user: try metadata userId first, then email
    const metaUserId = session.metadata?.userId;
    let user = metaUserId
      ? await prisma.user.findUnique({ where: { userId: metaUserId } })
      : null;

    if (!user) {
      const customerEmail = session.customer_details?.email;
      if (!customerEmail) {
        console.error("[Stripe Webhook] No customer email found.");
        return;
      }
      user = await resolveUserByEmail(customerEmail);
    }

    if (!user) {
      console.error("[Stripe Webhook] No user found for session.");
      return;
    }

    const planKey = session.metadata?.planKey;
    const isSubscription = session.mode === "subscription";

    if (isSubscription && planKey) {
      const plan = getPlanByPriceId(session.metadata?.priceId || "");
      const matchedPlan = plan || getPlanByKey(planKey);

      // Skip credit update for support plans (videoLimit=0 would wipe tool credits)
      if (isSupportPlan(matchedPlan)) {
        console.log(
          `[Stripe Webhook] Support plan detected (${planKey}), skipping credit update for user ${user.userId}`
        );
      } else {
        const videoLimit = matchedPlan?.videoLimit || 0;
        if (videoLimit > 0) {
          await prisma.user.update({
            where: { userId: user.userId },
            data: { credit: videoLimit },
          });
          console.log(
            `[Stripe Webhook] Set ${videoLimit} credits for user ${user.userId} (plan: ${planKey})`
          );
        } else {
          console.warn(
            `[Stripe Webhook] Plan ${planKey} has 0 videoLimit, skipping credit update`
          );
        }
      }
    } else {
      // One-time payment (addon) — increment credits
      const addonCredits = VIDEO_ADDON.videoCount;
      await prisma.user.update({
        where: { userId: user.userId },
        data: { credit: { increment: addonCredits } },
      });
      console.log(
        `[Stripe Webhook] Added ${addonCredits} addon credits to user ${user.userId}`
      );
    }

    // Log transaction (always, including support plans)
    await prisma.transaction.create({
      data: {
        userId: user.userId,
        amount: session.amount_total || 0,
        quantity: isSubscription ? 1 : VIDEO_ADDON.videoCount,
        stripeSessionId: session.id,
        status: "completed",
        type: isSubscription ? "subscription" : "purchase",
      },
    });

    console.log(
      `[Stripe Webhook] Transaction logged for user ${user.userId}.`
    );

    // Send confirmation email
    if (user.email) {
      const planName = isSubscription
        ? (getPlanByKey(planKey)?.nameJa || planKey || "サブスクリプション")
        : "追加動画パック";
      await sendSubscriptionEmail(user.email, user.name || "", "new_subscription", planName).catch((e) =>
        console.error("[Stripe Webhook] Email send failed:", e)
      );
    }
  } catch (error) {
    console.error(
      "[Stripe Webhook] Error in handleCheckoutSessionCompleted:",
      error
    );
    throw error; // Re-throw so Stripe retries
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleInvoicePaid(invoice: any) {
  try {
    console.log(`[Stripe Webhook] Processing invoice.paid: ${invoice.id}`);

    // Skip the first invoice (handled by checkout.session.completed)
    if (invoice.billing_reason === "subscription_create") {
      console.log("[Stripe Webhook] Initial subscription invoice, skipping.");
      return;
    }

    // Idempotency check
    if (await isAlreadyProcessed(invoice.id)) {
      console.log(`[Stripe Webhook] Invoice ${invoice.id} already processed, skipping.`);
      return;
    }

    const user = await resolveUserFromCustomerId(invoice.customer);
    if (!user) {
      console.error(`[Stripe Webhook] No user found for customer: ${invoice.customer}`);
      return;
    }

    // Find the plan from the subscription's price
    const subscriptionId = invoice.subscription;
    if (!subscriptionId) return;

    const subscription = await stripe.subscriptions.retrieve(
      subscriptionId as string
    );
    const priceId = subscription.items.data[0]?.price?.id;
    const plan = priceId ? getPlanByPriceId(priceId) : undefined;

    // Skip credit reset for support plan renewals
    if (isSupportPlan(plan)) {
      console.log(
        `[Stripe Webhook] Support plan renewal, skipping credit reset for user ${user.userId}`
      );
    } else if (plan) {
      const videoLimit = plan.videoLimit;
      // Monthly renewal: reset credits to plan's videoLimit
      await prisma.user.update({
        where: { userId: user.userId },
        data: { credit: videoLimit },
      });
      console.log(
        `[Stripe Webhook] Reset credits to ${videoLimit} for user ${user.userId} (monthly renewal)`
      );
    } else {
      console.warn(
        `[Stripe Webhook] Could not find plan for price ${priceId}, skipping credit reset`
      );
    }

    // Log transaction
    await prisma.transaction.create({
      data: {
        userId: user.userId,
        amount: invoice.amount_paid || 0,
        quantity: 1,
        stripeSessionId: invoice.id,
        status: "completed",
        type: "renewal",
      },
    });

    // Send renewal email
    if (user.email) {
      const planName = plan?.nameJa || "サブスクリプション";
      await sendSubscriptionEmail(user.email, user.name || "", "renewal", planName).catch((e) =>
        console.error("[Stripe Webhook] Email send failed:", e)
      );
    }
  } catch (error) {
    console.error("[Stripe Webhook] Error in handleInvoicePaid:", error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleInvoicePaymentFailed(invoice: any) {
  try {
    console.log(`[Stripe Webhook] Processing invoice.payment_failed: ${invoice.id}`);

    const user = await resolveUserFromCustomerId(invoice.customer);
    if (!user) {
      console.error(`[Stripe Webhook] No user found for customer: ${invoice.customer}`);
      return;
    }

    // Log failed transaction (use unique key: invoice.id + "_failed" to avoid conflict with paid)
    const failedSessionId = `${invoice.id}_failed`;
    if (!(await isAlreadyProcessed(failedSessionId))) {
      await prisma.transaction.create({
        data: {
          userId: user.userId,
          amount: invoice.amount_due || 0,
          quantity: 1,
          stripeSessionId: failedSessionId,
          status: "failed",
          type: "renewal",
        },
      });
    }

    // Send payment failure email
    if (user.email) {
      await sendSubscriptionEmail(user.email, user.name || "", "payment_failed", "").catch((e) =>
        console.error("[Stripe Webhook] Email send failed:", e)
      );
    }

    console.log(
      `[Stripe Webhook] Payment failure logged for user ${user.userId}`
    );
  } catch (error) {
    console.error("[Stripe Webhook] Error in handleInvoicePaymentFailed:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionUpdated(subscription: any) {
  try {
    console.log(
      `[Stripe Webhook] Subscription updated: ${subscription.id}`
    );

    const user = await resolveUserFromCustomerId(subscription.customer);
    if (!user) {
      console.error(`[Stripe Webhook] No user found for customer: ${subscription.customer}`);
      return;
    }

    const priceId = subscription.items.data[0]?.price?.id;
    const plan = priceId ? getPlanByPriceId(priceId) : undefined;

    // Skip credit update for support plans
    if (isSupportPlan(plan)) {
      console.log(
        `[Stripe Webhook] Support plan updated, skipping credit change for user ${user.userId}`
      );
      return;
    }

    // Only update credits if plan was found (avoid wiping credits on unknown plan)
    if (!plan) {
      console.warn(
        `[Stripe Webhook] Unknown plan for price ${priceId}, skipping credit update`
      );
      return;
    }

    const videoLimit = plan.videoLimit;

    await prisma.user.update({
      where: { userId: user.userId },
      data: { credit: videoLimit },
    });

    console.log(
      `[Stripe Webhook] Updated credit limit to ${videoLimit} for user ${user.userId}`
    );
  } catch (error) {
    console.error(
      "[Stripe Webhook] Error in handleSubscriptionUpdated:",
      error
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(subscription: any) {
  try {
    console.log(
      `[Stripe Webhook] Subscription deleted: ${subscription.id}`
    );

    const user = await resolveUserFromCustomerId(subscription.customer);
    if (!user) {
      console.error(`[Stripe Webhook] No user found for customer: ${subscription.customer}`);
      return;
    }

    // Check if the deleted subscription is a support plan
    const priceId = subscription.items.data[0]?.price?.id;
    const deletedPlan = priceId ? getPlanByPriceId(priceId) : undefined;

    if (isSupportPlan(deletedPlan)) {
      console.log(
        `[Stripe Webhook] Support plan canceled, no credit change for user ${user.userId}`
      );
    } else {
      // Tool plan canceled — check if user has other active tool subscriptions
      const activeSubs = await stripe.subscriptions.list({
        customer: subscription.customer,
        status: "active",
        limit: 10,
      });

      const hasActiveToolSub = activeSubs.data.some((sub) => {
        const subPriceId = sub.items.data[0]?.price?.id;
        const subPlan = subPriceId ? getPlanByPriceId(subPriceId) : undefined;
        return subPlan && !isSupportPlan(subPlan);
      });

      if (hasActiveToolSub) {
        console.log(
          `[Stripe Webhook] User ${user.userId} still has active tool subscription, keeping credits`
        );
      } else {
        await prisma.user.update({
          where: { userId: user.userId },
          data: { credit: 0 },
        });
        console.log(
          `[Stripe Webhook] Set credits to 0 for user ${user.userId} (no remaining tool subs)`
        );
      }
    }

    // Send cancellation email
    if (user.email) {
      const planName = deletedPlan?.nameJa || "サブスクリプション";
      await sendSubscriptionEmail(user.email, user.name || "", "cancellation", planName).catch((e) =>
        console.error("[Stripe Webhook] Email send failed:", e)
      );
    }
  } catch (error) {
    console.error(
      "[Stripe Webhook] Error in handleSubscriptionDeleted:",
      error
    );
  }
}
