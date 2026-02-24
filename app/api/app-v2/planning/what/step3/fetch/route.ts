import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 422 },
      );
    }

    const PDCASession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: {
          select: { selected_keyVisual: true },
        },
        id: true,
      },
    });

    if (!PDCASession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Success",
        key_visuals: [],
        selected_keyVisual: PDCASession.planning_what?.selected_keyVisual || [],
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Fetch step3 error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
