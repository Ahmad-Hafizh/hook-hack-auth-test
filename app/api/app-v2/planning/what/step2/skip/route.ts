import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../../utils/checkPageStep";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, user, suggestion, competitors } = body;

    const checkResult: { valid: boolean; response?: NextResponse } =
      await checkPageStep({
        sessionId,
        expectedPage: "what",
        whatType: "skip",
      });
    if (!checkResult.valid) {
      return checkResult.response;
    }

    let session = null;
    try {
      session = await prisma.pDCASession.findUnique({
        where: { id: sessionId },
      });
    } catch (dbError) {
      console.log("DB read skipped (local session):", dbError);
    }

    // Don't return 404 for local sessions
    // if (!session) {
    //   return NextResponse.json({ error: "Session not found" }, { status: 404 });
    // }

    await prisma.competitiveMatrixesNew.upsert({
      where: { pdca_session_id: sessionId },
      update: {
        user: user,
        suggestion: suggestion,
        competitor: competitors,
      },
      create: {
        pdca_session_id: sessionId,
        user: user,
        suggestion: suggestion,
        competitor: competitors,
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
