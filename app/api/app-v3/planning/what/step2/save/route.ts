import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, candidates } = await req.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
    });

    if (!pdcaSession) {
      return NextResponse.json(
        { error: "PDCA Session not found" },
        { status: 404 },
      );
    }

    await prisma.competitorCandidatesNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { candidates: candidates },
      create: {
        candidates: candidates,
        pdca_session_id: sessionId,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
