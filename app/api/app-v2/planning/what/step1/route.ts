import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { checkPageStep } from "../../utils/checkPageStep";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, sessionId } = body;

    const checkPage: { valid: boolean; response?: NextResponse } =
      await checkPageStep(sessionId, "what_scratch");
    if (!checkPage.valid) {
      return checkPage.response;
    }

    const { data } = await callAppV2Api.post("/v1/keywords", {
      text: product,
      provider: "OpenAI",
      max_keywords: 12,
    });

    await prisma.planningSession.update({
      where: { id: sessionId },
      data: {
        lastPage: "what_scratch",
        product: product,
      },
    });

    return NextResponse.json(
      { message: "Success", keywords: data.keywords },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
