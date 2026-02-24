import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const PDCASession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: {
          select: {
            selected_competitor_matrix: true,
          },
        },
        competitiveMatrixesNew: true,
      },
    });

    if (!PDCASession || !PDCASession.planning_what) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "Success",
        competitiveMatrix: (PDCASession.competitiveMatrixesNew as any)?.[0] || null,
        selectedCompetitiveMatrix:
          PDCASession.planning_what.selected_competitor_matrix || [],
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
