import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        dataRowFinalizedNew: true,
        planning_how: {
          select: {
            video_duration: true,
          },
        },
      },
    });

    if (!pdcaSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Success",
        finalizedRows: (pdcaSession.dataRowFinalizedNew as any)?.[0]?.data_rows_finalized || [],
        duration: pdcaSession.planning_how?.video_duration,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
