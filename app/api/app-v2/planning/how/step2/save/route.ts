import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, dataRows, selectedDataRows } = await req.json();

    const pdcaSession: any = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_how: {
          update: {
            selected_data_rows: selectedDataRows,
          },
        },
      },
      select: {
        planning_how: {
          select: {
            selected_data_rows: true,
          },
        },
      },
    });

    if (!pdcaSession || !pdcaSession.planning_how) {
      return NextResponse.json(
        { error: "Session or planning_how not found" },
        { status: 404 },
      );
    }

    // Upsert DataRows as JSON into single record
    await prisma.dataRowNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { data_rows: dataRows },
      create: { pdca_session_id: sessionId, data_rows: dataRows },
    });

    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
