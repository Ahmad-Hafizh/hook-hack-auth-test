import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import { checkUserSession } from "../../utils/checkUserSession";
import callAppV2Api from "@/config/axios/axiosAppV2";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, competitiveMatrix, selectedCompetitiveMatrix } = body;

    const session = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        step: 5,
        planning_what: {
          update: {
            selected_competitor_matrix: selectedCompetitiveMatrix,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    // Don't return 404 for local sessions

    await prisma.competitiveMatrixesNew.upsert({
      where: { pdca_session_id: sessionId },
      update: {
        user: competitiveMatrix.user,
        suggestion: competitiveMatrix.suggestion,
        competitor: competitiveMatrix.competitors,
      },
      create: {
        pdca_session_id: sessionId,
        user: competitiveMatrix.user,
        suggestion: competitiveMatrix.suggestion,
        competitor: competitiveMatrix.competitors,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error", details: error },
      { status: 500 },
    );
  }
}
