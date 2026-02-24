import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../planning/utils/checkUserSession";
import { prisma } from "@/config/prisma/prisma";
import { checkValidity } from "../../../planning/utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const { qualitySelection, sessionId } = await req.json();

    const { valid } = await checkValidity({
      sessionId,
      expectedStep: 1,
    });

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        isChoosingSpeed: qualitySelection === "speed" ? true : false,
        isHavingCompetitorUrls: false,
      },
    });

    return NextResponse.json(
      { message: "Quality selection saved" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "internal server error" },
      { status: 500 },
    );
  }
}
