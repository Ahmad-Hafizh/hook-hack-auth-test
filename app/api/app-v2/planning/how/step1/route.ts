import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, budget } = body;

    // const checkResult: { valid: boolean; response?: NextResponse } = await checkPageStep(sessionId, 'how', 1);
    // if (!checkResult.valid) {
    //   return checkResult.response;
    // }

    const session = await prisma.planningSession.findUnique({
      where: { id: sessionId },
      include: { creativeBrief: true },
    });

    const { data } = await callAppV2Api.post("/v1/video-tests/plan", {
      monthly_budget: budget,
      currency: "JPY",
      test_term_weeks: 4,
      strong_points: session?.creativeBrief?.strongPoints || ["string"],
      provider: "openai",
      language: "en",
    });

    await prisma.planningPlan.upsert({
      where: { planningSessionId: sessionId },
      update: {
        currency: data.plan.currency,
        estimated_cost_per_video: data.plan.estimated_cost_per_video,
        test_term_weeks: data.plan.test_term_weeks,
        recommended_min_spend_per_video:
          data.plan.recommended_min_spend_per_video,
        videos_per_month: data.plan.videos_per_month,
        platform: data.plan.assumptions.platform,
        target_impressions_per_video:
          data.plan.assumptions.target_impressions_per_video,
        typical_cpm: data.plan.assumptions.typical_cpm,
        budget,
      },
      create: {
        planningSessionId: sessionId,
        currency: data.plan.currency,
        estimated_cost_per_video: data.plan.estimated_cost_per_video,
        test_term_weeks: data.plan.test_term_weeks,
        recommended_min_spend_per_video:
          data.plan.recommended_min_spend_per_video,
        videos_per_month: data.plan.videos_per_month,
        platform: data.plan.assumptions.platform,
        target_impressions_per_video:
          data.plan.assumptions.target_impressions_per_video,
        typical_cpm: data.plan.assumptions.typical_cpm,
        budget,
      },
    });

    return NextResponse.json(
      { message: "Success", plan: data.plan },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
