import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../planning/utils/getUser";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!user.userDbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await prisma.pDCASession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        lastPage: true,
        isChoosingSpeed: true,
        isHavingCompetitorUrls: true,
        step: true,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Step is valid",
        page: session.lastPage,
        isChoosingSpeed: session.isChoosingSpeed,
        isHavingCompetitorUrls: session.isHavingCompetitorUrls,
        step: session.step,
      },
      { status: 200 },
    );
  } catch (error) {
    // DB failed - return default fallback
    console.log("DB fallback - returning default page:", error);
    return NextResponse.json(
      {
        message: "Local session fallback",
        isChoosingSpeed: false,
        isHavingCompetitorUrls: false,
      },
      { status: 200 },
    );
  }
}
