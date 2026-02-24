import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const PDCASession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        competitorCandidatesNew: true,
        planning_what: {
          select: {
            selected_competitor_candidates: true,
            product: true,
          },
        },
      },
    });

    if (!PDCASession || !PDCASession.planning_what) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Success",
        candidates: PDCASession.competitorCandidatesNew?.candidates || [],
        selected_competitor_candidates:
          PDCASession.planning_what.selected_competitor_candidates,
        product: PDCASession.planning_what.product,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
