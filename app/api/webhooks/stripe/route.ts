import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/config/prisma/prisma";
import stripe from "@/lib/stripe/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
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
    } catch (err: any) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
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
    if (session.payment_status !== "paid") return;

    // Get customer email
    const customerEmail = session.customer_details?.email;
    // Try to find user by session email, fallback to satrio@samurai-style.tokyo
    let user = null;
    if (customerEmail) {
      user = await prisma.user.findFirst({
        where: { email: customerEmail },
      });
    }
    if (!user) {
      user = await prisma.user.findFirst({
        where: { email: "satrio@samurai-style.tokyo" },
      });
    }
    if (!user) return;

    // Fetch line items to get quantity
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 1,
    });
    const quantity = lineItems.data[0]?.quantity || 1;

    // Increment user credit by quantity
    await prisma.user.update({
      where: { id: user.id },
      data: { credit: { increment: quantity } },
    });

    // Add transaction record
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
      `Added ${quantity} credits to user ${user.id} and logged transaction.`
    );
  } catch (error) {
    console.error("Error handling checkout session completed:", error);
  }
}
