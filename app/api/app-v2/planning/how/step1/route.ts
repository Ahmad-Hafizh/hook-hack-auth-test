import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { checkUserSession } from "../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, budget } = body;

    const { valid } = await checkUserSession(sessionId);
    if (!valid) {
      return NextResponse.json(
        {
          error: "Unauthorized or invalid session",
          redirect: "/app-v2/planning/what",
        },
        { status: 401, statusText: "invalid" }
      );
    }

    const checkResult: { valid: boolean; response?: NextResponse } =
      await checkPageStep(sessionId, "how");
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const session = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      include: { competitor_matrix: true },
    });

    const { data } = await callAppV2Api.post("/v1/video-tests/plan", {
      monthly_budget: budget,
      currency: "JPY",
      test_term_weeks: 4,
      strong_points: session?.competitor_matrix?.strongPoints || ["string"],
      provider: "openai",
      language: "en",
    });

    await prisma.planningPlan.upsert({
      where: { pdca_session_id: sessionId },
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
        pdca_session_id: sessionId,
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
