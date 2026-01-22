import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../../utils/checkPageStep";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, key_message, strong_points, competitor_matrix } = body;

    const checkResult: { valid: boolean; response?: NextResponse } =
      await checkPageStep(sessionId, "what_skip");
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
        pdca_session_id: session.id,
        keyMessages: key_message,
        strongPoints: strong_points,
        competitorsMatrix: competitor_matrix,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        url: `${process.env.NEXT_PUBLIC_APP_V2_URL}/planning/how`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
