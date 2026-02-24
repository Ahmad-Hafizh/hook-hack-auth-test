import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../utils/checkUserSession";
import { checkPageStep } from "../../../utils/checkPageStep";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, videoUrls } = body;

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: { id: true, renderedVideos: true },
    });

    if (!pdcaSession) {
      return NextResponse.json(
        { error: "Session not found", redirect: "/app-v2/projects" },
        { status: 404 },
      );
    }

    if (pdcaSession.renderedVideos) {
      await prisma.renderedVideo.deleteMany({
        where: { pdca_session_id: pdcaSession.id },
      });
    }

    await prisma.renderedVideo.createMany({
      data: videoUrls.map((url: string) => ({
        pdca_session_id: pdcaSession.id,
        video_url: url,
      })),
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
