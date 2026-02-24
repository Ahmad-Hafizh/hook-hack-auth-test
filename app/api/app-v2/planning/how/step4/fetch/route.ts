import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_how: {
          select: {
            logo: true,
            orientation: true,
            background_music: true,
            voice_over: true,
            background_color: true,
            background_image: true,
            font: true,
          },
        },
      },
    });

    if (!pdcaSession || !pdcaSession.planning_how) {
      return NextResponse.json(
        { error: "Session or planning_how not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Success",
        designSettings: pdcaSession.planning_how,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
