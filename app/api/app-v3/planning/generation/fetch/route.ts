import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        planning_how: {
          select: {
            orientation: true,
            video_duration: true,
          },
        },
        renderedVideos: true,
      },
    });

    const data_row_finalized = await prisma.dataRowFinalizedNew.findUnique({
      where: {
        pdca_session_id: sessionId,
      },
    });

    return NextResponse.json(
      {
        data_row_finalized: data_row_finalized?.data_rows_finalized,
        orientation: pdcaSession?.planning_how?.orientation,
        duration: pdcaSession?.planning_how?.video_duration,
        rendered_videos: pdcaSession?.renderedVideos,
        message: "Renders fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
