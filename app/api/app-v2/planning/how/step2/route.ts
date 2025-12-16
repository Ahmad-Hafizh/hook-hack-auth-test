import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import { checkUserSession } from "../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, template_id } = body;

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

    const creativeBrief = await prisma.creativeBrief.findUnique({
      where: { planningSessionId: sessionId },
    });

    const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
      key_message: creativeBrief?.keyMessages || "string",
      strong_points: creativeBrief?.strongPoints || ["string"],
      provider: "openai",
      language: "en",
    });

    await prisma.planningPlan.update({
      where: { planningSessionId: sessionId },
      data: {
        template_id: template_id,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        job_id: data.job_id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
