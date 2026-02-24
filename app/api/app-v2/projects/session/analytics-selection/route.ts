import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../planning/utils/checkUserSession";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  const { analyticsSelection, sessionId } = await req.json();

  try {
    const { valid } = await checkUserSession(sessionId);
    if (!valid) {
      // Fallback for local sessions
      return NextResponse.json({ sessionId });
    }

    const updatedSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        isHavingCompetitorUrls: analyticsSelection === "skip" ? true : false,
        lastPage: "what",
      },
    });

    return NextResponse.json({ sessionId: updatedSession.id });
  } catch (error) {
    console.log("analytics-selection fallback:", error);
    // Fallback: return sessionId without DB update
    return NextResponse.json({ sessionId });
  }
}
