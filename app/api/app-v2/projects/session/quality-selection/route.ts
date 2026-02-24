import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../planning/utils/checkUserSession";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  const { qualitySelection, sessionId } = await req.json();

  try {
    const { valid } = await checkUserSession(sessionId);
    if (!valid) {
      // Fallback for local sessions
      return NextResponse.json({ sessionId });
    }

    const updatedSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        isChoosingSpeed: qualitySelection === "speed" ? true : false,
      },
    });

    return NextResponse.json({ sessionId: updatedSession.id });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
