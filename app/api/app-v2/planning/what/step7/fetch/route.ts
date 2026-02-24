import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: {
          select: {
            selected_positioning_patterns: true,
          },
        },
        positioningPatternsNew: true,
      },
    });

    if (!pdcaSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Success",
        positioningPatterns: (pdcaSession.positioningPatternsNew as any)?.[0]?.positioning_patterns || [],
        selectedPositioningPatterns:
          pdcaSession.planning_what?.selected_positioning_patterns,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || "internal server error" },
      { status: 500 },
    );
  }
}
