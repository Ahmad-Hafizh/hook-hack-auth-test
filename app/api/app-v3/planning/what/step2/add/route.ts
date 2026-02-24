import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, newCandidate } = await req.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        competitorCandidatesNew: true,
      },
    });

    if (!pdcaSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const updatedCandidates = [
      newCandidate,
      ...(pdcaSession.competitorCandidatesNew?.candidates as any[]),
    ];

    await prisma.competitorCandidatesNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { candidates: updatedCandidates },
      create: {
        pdca_session_id: sessionId,
        candidates: updatedCandidates,
      },
    });

    return NextResponse.json(
      {
        message: "Candidate added successfully",
        candidates: updatedCandidates,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
