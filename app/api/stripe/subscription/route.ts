import { NextResponse } from "next/server";
import stripe from "@/lib/stripe/stripe";
import { getPlanByPriceId } from "@/lib/stripe/plans";
import { prisma } from "@/config/prisma/prisma";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import {
  SubscriptionState,
  SubscriptionDetail,
  EMPTY_SUBSCRIPTION,
} from "@/lib/stripe/subscription";
import Stripe from "stripe";

/** Extract period dates from subscription item (Stripe SDK v18+) */
function getPeriodDates(sub: Stripe.Subscription) {
  const item = sub.items.data[0];
  return {
    periodStart: item?.current_period_start
      ? new Date(item.current_period_start * 1000).toISOString()
      : null,
    periodEnd: item?.current_period_end
      ? new Date(item.current_period_end * 1000).toISOString()
      : null,
  };
}

export async function GET() {
  try {
    const { userId } = await getUser();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user with email and credit from DB
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { email: true, credit: true },
    });

    if (!user?.email) {
      return NextResponse.json(EMPTY_SUBSCRIPTION);
    }

    // Find Stripe customer by email
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    if (customers.data.length === 0) {
      return NextResponse.json(EMPTY_SUBSCRIPTION);
    }

    const customer = customers.data[0];

    // Fetch ALL active subscriptions
    const activeSubs = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 10,
    });

    if (activeSubs.data.length === 0) {
      // Check for past_due or trialing
      const otherSubs = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 10,
      });

      if (otherSubs.data.length > 0) {
        const subscriptions: SubscriptionDetail[] = otherSubs.data.map(
          (sub) => {
            const priceId = sub.items.data[0]?.price?.id;
            const plan = priceId ? getPlanByPriceId(priceId) : undefined;
            const { periodStart, periodEnd } = getPeriodDates(sub);
            return {
              subscriptionId: sub.id,
              planKey: plan?.key || sub.metadata?.planKey || null,
              planNameJa: plan?.nameJa || null,
              status: sub.status,
              isSupportPlan: plan?.key === "company_support",
              videosLimit: plan?.videoLimit || 0,
              periodStart,
              periodEnd,
            };
          }
        );

        // Use the first non-support sub as primary, or first sub if all support
        const primaryToolSub =
          subscriptions.find((s) => !s.isSupportPlan) || subscriptions[0];

        const state: SubscriptionState = {
          planKey: primaryToolSub.planKey,
          planNameJa: primaryToolSub.planNameJa,
          status: primaryToolSub.status as SubscriptionState["status"],
          videosUsed: Math.max(
            0,
            (primaryToolSub.videosLimit || 0) - user.credit
          ),
          videosLimit: primaryToolSub.videosLimit || 0,
          periodStart: primaryToolSub.periodStart,
          periodEnd: primaryToolSub.periodEnd,
          stripeCustomerId: customer.id,
          subscriptionId: primaryToolSub.subscriptionId,
          subscriptions,
        };
        return NextResponse.json(state);
      }

      return NextResponse.json({
        ...EMPTY_SUBSCRIPTION,
        stripeCustomerId: customer.id,
      });
    }

    // Build subscription details for all active subs
    const subscriptions: SubscriptionDetail[] = activeSubs.data.map((sub) => {
      const priceId = sub.items.data[0]?.price?.id;
      const plan = priceId ? getPlanByPriceId(priceId) : undefined;
      const { periodStart, periodEnd } = getPeriodDates(sub);
      return {
        subscriptionId: sub.id,
        planKey: plan?.key || sub.metadata?.planKey || null,
        planNameJa: plan?.nameJa || null,
        status: sub.status,
        isSupportPlan: plan?.key === "company_support",
        videosLimit: plan?.videoLimit || 0,
        periodStart,
        periodEnd,
      };
    });

    // Use the first tool sub as primary, or first sub if all support
    const primaryToolSub =
      subscriptions.find((s) => !s.isSupportPlan) || subscriptions[0];
    const { periodStart, periodEnd } = {
      periodStart: primaryToolSub.periodStart,
      periodEnd: primaryToolSub.periodEnd,
    };

    const videosLimit = primaryToolSub.videosLimit || 0;
    const videosUsed = Math.max(0, videosLimit - user.credit);

    const state: SubscriptionState = {
      planKey: primaryToolSub.planKey,
      planNameJa: primaryToolSub.planNameJa,
      status: "active",
      videosUsed,
      videosLimit,
      periodStart,
      periodEnd,
      stripeCustomerId: customer.id,
      subscriptionId: primaryToolSub.subscriptionId,
      subscriptions,
    };

    return NextResponse.json(state);
  } catch (error) {
    console.error("Subscription status error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve subscription status" },
      { status: 500 }
    );
  }
}
