import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../planning/utils/checkUserSession";
import { prisma } from "@/config/prisma/prisma";
import { checkValidity } from "../../../planning/utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const { analyticsSelection, sessionId } = await req.json();

    const { valid } = await checkValidity({
      sessionId,
      expectedStep: 2,
    });

    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        isHavingCompetitorUrls: analyticsSelection === "skip" ? true : false,
        isChoosingSpeed: false,
      },
    });

    return NextResponse.json(
      { message: "Analytics selection saved" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error", error: error },
      { status: 500 },
    );
  }
}
