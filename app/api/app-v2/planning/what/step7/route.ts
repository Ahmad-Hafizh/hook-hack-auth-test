import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const pdcaSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        lastPage: "how",
      },
    });

    return NextResponse.json(
      {
        message: "Session updated",
        redirectTo: "/app-v2/planning/" + sessionId + "/how",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
