import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe/stripe";

export async function POST(req: NextRequest) {
  try {
    const headerList = await headers();
    const origin = headerList.get("origin");

    const { priceId } = await req.json();
    console.log(priceId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/order/success`,
      cancel_url: `${origin}/order/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
