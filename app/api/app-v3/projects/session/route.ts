import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../planning/utils/getUser";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();

    const { userDbId } = await getUser();
    if (!userDbId) {
      // Fallback: return empty sessions
      return NextResponse.json({ pdcaSessions: [] }, { status: 200 });
    }

    const pdcaSessions = await prisma.pDCASession.findMany({
      where: { pdca_id: projectId },
      select: {
        id: true,
        name: true,
        status: true,
        hypotesis: true,
        memo: true,
        step: true,
        isChoosingSpeed: true,
        isHavingCompetitorUrls: true,
      },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ pdcaSessions: pdcaSessions }, { status: 200 });
  } catch (error) {
    // DB failed - return empty sessions as fallback
    console.log("DB fallback - returning empty sessions:", error);
    return NextResponse.json({ pdcaSessions: [] }, { status: 200 });
  }
}
