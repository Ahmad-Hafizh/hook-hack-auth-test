import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, sessionId } = body;

    await prisma.planningWhat.upsert({
      where: { pdca_session_id: sessionId },
      update: { product: product },
      create: {
        pdca_session_id: sessionId,
        product: product,
      },
    });

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: { lastPage: "what", step: 2 },
    });

    const { data } = await callAppV2Api.post("/v1/keywords", {
      text: product,
      provider: "openai",
      max_keywords: 12,
    });

    return NextResponse.json(
      { message: "Success", keywords: data.keywords },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
