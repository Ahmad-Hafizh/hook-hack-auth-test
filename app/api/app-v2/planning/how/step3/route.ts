import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, finalizedRows } = await req.json();

    const pdcaSession: any = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_how: {
          select: {
            video_duration: true,
          },
        },
        dataRowFinalizedNew: true,
      },
    });

    if (!pdcaSession || !pdcaSession.planning_how) {
      return NextResponse.json(
        { error: "Session or planning_how not found" },
        { status: 404 },
      );
    }

    // Upsert FinalizedRows as JSON into single record
    await prisma.dataRowFinalizedNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { data_rows_finalized: finalizedRows },
      create: { pdca_session_id: sessionId, data_rows_finalized: finalizedRows },
    });

    // Step 3 doesn't require an API call, just validation
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
