import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    const renders = await prisma.renderedVideo.findMany({
      where: {
        pdca_session_id: sessionId,
      },
    });

    return NextResponse.json(
      { renders, message: "Renders fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
