import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe/stripe";

export async function POST(req: NextRequest) {
  try {
    const headerList = await headers();
    const origin = headerList.get("origin");

    const { priceId, mode = "payment" } = await req.json();
    console.log("🔍 Creating checkout session:", { priceId, mode });

    // Let's also check what type of price this is
    let price;
    let correctMode = mode;
    try {
      price = await stripe.prices.retrieve(priceId);
      console.log("🔍 Price details:", {
        id: price.id,
        type: price.type,
        recurring: price.recurring,
        currency: price.currency,
        unit_amount: price.unit_amount,
      });

      // Auto-correct mode based on price type
      if (price.recurring && mode === "payment") {
        correctMode = "subscription";
        console.log("🔍 Auto-correcting mode from 'payment' to 'subscription'");
      } else if (!price.recurring && mode === "subscription") {
        correctMode = "payment";
        console.log("🔍 Auto-correcting mode from 'subscription' to 'payment'");
      }
    } catch (priceError) {
      console.log("🔍 Could not retrieve price details:", priceError);
    }

    const sessionConfig: any = {
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: correctMode, // Use the corrected mode
      success_url: `${origin}/order/success`,
      cancel_url: `${origin}/order/cancel`,
    };

    // Add subscription-specific settings if mode is subscription
    if (correctMode === "subscription") {
      sessionConfig.billing_address_collection = "required";
      sessionConfig.allow_promotion_codes = true;
    }

    console.log("🔍 Session config:", sessionConfig);

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("❌ Stripe checkout error:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
