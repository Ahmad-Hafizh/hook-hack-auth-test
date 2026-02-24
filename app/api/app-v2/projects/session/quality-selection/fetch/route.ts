import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        isChoosingSpeed: true,
      },
    });

    return NextResponse.json({ isChoosingSpeed: pdcaSession?.isChoosingSpeed });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
