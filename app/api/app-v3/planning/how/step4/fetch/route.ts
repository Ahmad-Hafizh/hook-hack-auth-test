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
            logo: true,
            orientation: true,
            background_color: true,
            background_image: true,
            font: true,
            background_music: true,
            voice_over: true,
          },
        },
      },
    });

    const dataRows = await prisma.dataRowFinalizedNew.findUnique({
      where: {
        pdca_session_id: sessionId,
      },
      select: {
        data_rows_finalized: true,
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
        designSettings: { ...pdcaSession.planning_how },
        dataRows: dataRows?.data_rows_finalized || [],
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
