import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, dataRows, selectedDataRows, finalizedRows } =
      await req.json();

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

    await prisma.dataRowNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { data_rows: dataRows },
      create: {
        data_rows: dataRows,
        pdca_session_id: sessionId,
      },
    });

    await prisma.dataRowFinalizedNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { data_rows_finalized: finalizedRows },
      create: {
        data_rows_finalized: finalizedRows,
        pdca_session_id: sessionId,
      },
    });

    if (!pdcaSession) {
      return NextResponse.json(
        { error: "Session or planning_how not found" },
        { status: 404 },
      );
    }

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
