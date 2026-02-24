import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, positioningPatterns, selectedPositioningPatterns } =
      await req.json();

    const pdcaSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_what: {
          update: {
            selected_positioning_patterns:
              selectedPositioningPatterns.toString(),
          },
        },
      },
    });

    await prisma.positioningPatternsNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { positioning_patterns: positioningPatterns },
      create: {
        positioning_patterns: positioningPatterns,
        pdca_session_id: sessionId,
      },
    });

    return NextResponse.json(
      {
        message: "Session updated",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
