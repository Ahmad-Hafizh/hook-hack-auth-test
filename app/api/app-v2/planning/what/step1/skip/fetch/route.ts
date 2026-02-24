import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const PDCASession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: {
          select: {
            product: true,
            competitor_urls: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        user_url: PDCASession?.planning_what?.product || "",
        competitor_urls: PDCASession?.planning_what?.competitor_urls || [],
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
