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
      select: {
        positioningPatternsNew: true,
      },
    });

    const formattedData = positioningPatterns.map(
      (item: any, index: number) => ({
        pattern_label: item.pattern_label || `Pattern ${index + 1}`,
        pattern_number: item.pattern_number.toString() || `${index + 1}`,
        one_liner: item.one_liner || "",
        functional_value: item.functional_value || [],
        emotional_value: item.emotional_value || [],
      }),
    );

    // Upsert positioning patterns as JSON into single record
    await prisma.positioningPatternsNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { positioning_patterns: formattedData },
      create: { pdca_session_id: sessionId, positioning_patterns: formattedData },
    });

    return NextResponse.json(
      {
        message: "Session updated",
        redirectTo: "/app-v2/planning/" + sessionId + "/how",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Step7 route error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
