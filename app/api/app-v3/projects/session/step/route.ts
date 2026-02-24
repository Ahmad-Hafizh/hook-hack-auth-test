import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, step } = await req.json();

    const updateSessionStep = await prisma.pDCASession.update({
      where: {
        id: sessionId,
      },
      data: { step: step },
      select: {
        step: true,
      },
    });

    return NextResponse.json(
      {
        message: "Step updated successfully",
        step: updateSessionStep.step,
      },
      { status: 200 },
    );
  } catch (error) {
    // DB failed - return default fallback
    return NextResponse.json(
      {
        error: "Failed to update step",
      },
      { status: 500 },
    );
  }
}
