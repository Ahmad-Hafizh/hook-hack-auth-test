import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkValidity } from "../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, competitiveMatrix, selectedCompetitiveMatrix, step } =
      body;

    const { valid, userId, response } = await checkValidity({
      sessionId,
      expectedStep: step || 3,
    });
    if (!valid) {
      return (
        response ||
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    const planning_what = await prisma.planningWhat.update({
      where: { id: sessionId },
      data: {
        selected_competitor_matrix: selectedCompetitiveMatrix,
        selected_value_organization: undefined,
      },
      select: {
        product: true,
      },
    });

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
        product: planning_what.product || "",
        user_id: userId,
        pdca_session_id: sessionId,
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
