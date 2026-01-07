import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import { checkUserSession } from "../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, key_message, strong_points, competitorsMatrix } = body;

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
      await checkPageStep(sessionId, "what_scratch");
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const session = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    await prisma.competitorMatrix.create({
      data: {
        pdca_session_id: sessionId,
        keyMessages: key_message,
        strongPoints: strong_points,
        competitorsMatrix: competitorsMatrix,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
