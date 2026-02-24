import { NextResponse } from "next/server";
import { PLANS, VIDEO_ADDON } from "@/lib/stripe/plans";

export async function GET() {
  try {
    const plans = PLANS.map((plan) => ({
      key: plan.key,
      nameJa: plan.nameJa,
      nameEn: plan.nameEn,
      priceMonthly: plan.priceMonthly,
      videoLimit: plan.videoLimit,
      featuresJa: plan.featuresJa,
      priceId: plan.priceId,
      overagePrice: plan.overagePrice,
      mode: plan.mode,
    }));

    const addon = {
      key: VIDEO_ADDON.key,
      nameJa: VIDEO_ADDON.nameJa,
      nameEn: VIDEO_ADDON.nameEn,
      price: VIDEO_ADDON.price,
      videoCount: VIDEO_ADDON.videoCount,
      priceId: VIDEO_ADDON.priceId,
      mode: VIDEO_ADDON.mode,
    };

    return NextResponse.json({ plans, addon });
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { error: "Failed to retrieve plan configuration" },
      { status: 500 }
    );
  }
}
