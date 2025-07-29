import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/config/prisma/prisma";
import stripe from "@/lib/stripe/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  console.log("[Stripe Webhook] Received request.");
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
      console.log(`[Stripe Webhook] Verified event: ${event.type}`);
    } catch (err: any) {
      console.error(
        `[Stripe Webhook] Signature verification failed: ${err.message}`
      );
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      console.log(
        "[Stripe Webhook] Handling checkout.session.completed event."
      );
      await handleCheckoutSessionCompleted(event.data.object);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  try {
    console.log(`[Stripe Webhook] Processing session: ${session.id}`);
    if (session.payment_status !== "paid") {
      console.log(`[Stripe Webhook] Session ${session.id} not paid, skipping.`);
      return;
    }

    // Get customer email
    const customerEmail = session.customer_details?.email;
    let user = null;
    if (customerEmail) {
      console.log(
        `[Stripe Webhook] Searching for user with email: ${customerEmail}`
      );
      user = await prisma.user.findFirst({
        where: { email: customerEmail },
      });
    }

    // If no user is found, log an error and stop.
    if (!user) {
      console.error(
        `Webhook Error: No user found with email: ${customerEmail}. Cannot add credit.`
      );
      return;
    }

    console.log(`[Stripe Webhook] Found user: ${user.userId}`);

    // Fetch line items to get quantity
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 1,
    });
    const quantity = lineItems.data[0]?.quantity || 0; // Default to 0 if not found

    if (quantity === 0) {
      console.log("No quantity found, skipping credit update.");
      return;
    }

    console.log(
      `[Stripe Webhook] Quantity found: ${quantity}. Updating credits for user ${user.userId}.`
    );

    // Increment user credit by quantity, finding the user by their Clerk ID
    await prisma.user.update({
      where: { userId: user.userId },
      data: { credit: { increment: quantity } },
    });

    console.log(
      `[Stripe Webhook] Credits updated for user ${user.userId}. Creating transaction record.`
    );

    // Add transaction record, linking via the Clerk ID
    await prisma.transaction.create({
      data: {
        userId: user.userId,
        amount: session.amount_total || 0,
        quantity,
        stripeSessionId: session.id,
        status: "completed",
        type: "purchase",
      },
    });

    console.log(
      `[Stripe Webhook] Successfully added ${quantity} credits to user ${user.userId} and logged transaction.`
    );
  } catch (error) {
    console.error(
      "[Stripe Webhook] Error in handleCheckoutSessionCompleted:",
      error
    );
  }
}
