import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

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
