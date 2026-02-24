import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../utils/checkUserSession";
import { checkPageStep } from "../../../utils/checkPageStep";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const pDCASession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: { planning_what: true },
    });

    return NextResponse.json(
      { message: "Success", product: pDCASession?.planning_what?.product },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
