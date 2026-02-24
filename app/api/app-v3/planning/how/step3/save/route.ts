import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, finalizedRows } = await req.json();

    const pdcaSession: any = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
    });

    if (!pdcaSession) {
      return NextResponse.json(
        { error: "PDCA Session not found" },
        { status: 404 },
      );
    }

    await prisma.dataRowFinalizedNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { data_rows_finalized: finalizedRows },
      create: {
        data_rows_finalized: finalizedRows,
        pdca_session_id: sessionId,
      },
    });

    // Step 3 doesn't require an API call, just validation
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
