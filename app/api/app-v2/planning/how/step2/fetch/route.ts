import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      include: {
        planning_how: {
          select: {
            selected_data_rows: true,
            video_duration: true,
          },
        },
        dataRowsNew: true,
      },
    });

    if (!pdcaSession || !pdcaSession.planning_how) {
      return NextResponse.json(
        { error: "Session or planning_how not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Success",
        selected_data_rows: pdcaSession.planning_how.selected_data_rows,
        data_rows: pdcaSession.dataRowsNew?.data_rows || [],
        duration: pdcaSession.planning_how.video_duration,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
