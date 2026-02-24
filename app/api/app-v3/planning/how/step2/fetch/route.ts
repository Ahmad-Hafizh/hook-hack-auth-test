import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_how: {
          select: {
            selected_data_rows: true,
            video_duration: true,
            job_id_variant: true,
          },
        },
      },
    });

    const dataRow = await prisma.dataRowNew.findUnique({
      where: { pdca_session_id: sessionId },
    });

    return NextResponse.json(
      {
        message: "Success",
        selected_data_rows: pdcaSession?.planning_how?.selected_data_rows,
        data_rows: dataRow?.data_rows || [],
        duration: pdcaSession?.planning_how?.video_duration,
        job_id: pdcaSession?.planning_how?.job_id_variant,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
