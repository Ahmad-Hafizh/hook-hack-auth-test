import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../../utils/checkPageStep";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, key_message, strong_points } = body;

    const checkResult: { valid: boolean; response?: NextResponse } =
      await checkPageStep(sessionId, "what_skip");
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const session = await prisma.planningSession.update({
      where: { id: sessionId },
      data: {
        lastPage: "how",
      },
    });

    await prisma.creativeBrief.create({
      data: {
        planningSessionId: session.id,
        keyMessages: key_message,
        strongPoints: strong_points,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        url: `${process.env.NEXT_PUBLIC_APP_V2_URL}/planning/how`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
