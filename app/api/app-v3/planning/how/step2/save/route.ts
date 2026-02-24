import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, dataRows, selectedDataRows } = await req.json();

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_how: {
          update: {
            selected_data_rows: selectedDataRows,
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
