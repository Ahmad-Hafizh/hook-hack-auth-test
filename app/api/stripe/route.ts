import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe/stripe";
import { prisma } from "@/config/prisma/prisma";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";

export async function POST(req: NextRequest) {
  try {
    const headerList = await headers();
    const origin = headerList.get("origin");

    const { userId } = await getUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user email from DB
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { email: true },
    });

    if (!user?.email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const { priceId, mode = "payment", planKey } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "priceId is required" },
        { status: 400 }
      );
    }

    // Find or create Stripe Customer by email, always store userId in metadata
    const existingCustomers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      // Ensure userId is stored in customer metadata
      if (customer.metadata?.userId !== userId) {
        customer = await stripe.customers.update(customer.id, {
          metadata: { userId },
        });
      }
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
    }

    // Auto-correct mode based on price type
    let correctMode = mode;
    try {
      const price = await stripe.prices.retrieve(priceId);
      if (price.recurring && mode === "payment") {
        correctMode = "subscription";
      } else if (!price.recurring && mode === "subscription") {
        correctMode = "payment";
      }
    } catch {
      // If price retrieval fails, use the provided mode
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionConfig: any = {
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: correctMode,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order/cancel`,
      metadata: {
        planKey: planKey || "",
        priceId,
        userId,
      },
    };

    // Add subscription-specific settings
    if (correctMode === "subscription") {
      sessionConfig.billing_address_collection = "required";
      sessionConfig.allow_promotion_codes = true;
      sessionConfig.subscription_data = {
        metadata: { planKey: planKey || "", userId },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
