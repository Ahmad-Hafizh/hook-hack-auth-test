import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import { checkUserSession } from "../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, patternCombinations } = body;

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

    const { data } = await callAppV2Api.post("/v1/creatomate/renders", {
      template_id: "f9a7fdef-4311-4b0c-942a-6f3f00a353dd",
      videos: patternCombinations,
      provider: "creatomate",
    });

    const renderedVideoData = data.renders.map((video: any, index: number) => ({
      planningSessionId: sessionId,
      videoUrl: video.result_url,
      hook: patternCombinations[index].hooks,
      bodyAMessage: patternCombinations[index].strong_point_1_messages,
      bodyBMessage: patternCombinations[index].strong_point_2_messages,
      bodyCMessage: patternCombinations[index].strong_point_3_messages,
      cta: patternCombinations[index].ctas,
    }));

    await prisma.renderedVideo.createMany({
      data: renderedVideoData,
    });

    await prisma.planningSession.update({
      where: { id: sessionId },
      data: { lastPage: "generation" },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
