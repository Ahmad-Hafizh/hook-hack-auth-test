import { prisma } from "@/config/prisma/prisma";
import { NextResponse } from "next/server";

export async function checkStep({
  sessionId,
  expectedStep,
}: {
  sessionId: string;
  expectedStep: number;
}): Promise<{ valid: boolean; response?: NextResponse }> {
  const isExist = await prisma.pDCASession.findUnique({
    where: { id: sessionId },
    select: {
      isChoosingSpeed: true,
      isHavingCompetitorUrls: true,
      step: true,
    },
  });

  if (!isExist) {
    return {
      valid: false,
      response: NextResponse.json(
        { error: "Invalid session state" },
        { status: 400 },
      ),
    };
  }

  if (!isExist.isChoosingSpeed && expectedStep > 6) {
    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: { step: 6 },
    });

    return {
      valid: false,
      response: NextResponse.json(
        {
          error: "Invalid session state",
          step: 6,
        },
        { status: 400 },
      ),
    };
  } else if (isExist.isHavingCompetitorUrls && expectedStep > 12) {
    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: { step: 14 },
    });

    return {
      valid: false,
      response: NextResponse.json(
        {
          error: "Invalid session state",
          step: 14,
        },
        { status: 400 },
      ),
    };
  } else if (!isExist.isHavingCompetitorUrls && !isExist.isChoosingSpeed) {
    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: { step: 10 },
    });

    return {
      valid: false,
      response: NextResponse.json(
        {
          error: "Invalid session state",
          step: 10,
        },
        { status: 400 },
      ),
    };
  } else if (isExist.step !== expectedStep) {
    return {
      valid: false,
      response: NextResponse.json(
        {
          error: "Invalid session state",
          redirect: `${process.env.NEXT_PUBLIC_APP_V2_URL}/app-v3/projects`,
        },
        { status: 400 },
      ),
    };
  }

  return { valid: true };
}
