import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, renders } = await req.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        renderedVideos: true,
      },
    });

    if (!pdcaSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    if (pdcaSession.renderedVideos.length > 0) {
      await prisma.renderedVideo.deleteMany({
        where: {
          pdca_session_id: sessionId,
        },
      });
      await prisma.pDCASession.createMany({
        data: renders.map((render: any) => ({
          pdca_session_id: sessionId,
        })),
      });
    } else {
      await prisma.pDCASession.createMany({
        data: renders.map((render: any) => ({
          pdca_session_id: sessionId,
        })),
      });
    }

    return NextResponse.json(
      { message: "Renders saved successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
