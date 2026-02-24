import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { checkValidity } from "../../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, product_url } = body;

    const { valid } = await checkValidity({
      sessionId,
      expectedStep: 2,
    });

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid session or step" },
        { status: 400 },
      );
    }

    await prisma.planningWhat.upsert({
      where: { pdca_session_id: sessionId },
      update: { product: product_url },
      create: {
        pdca_session_id: sessionId,
        product: product_url,
      },
    });

    // const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
    //   mode: "instant",
    //   provider: "openai",
    //   product_name: product_url.replace(/https?:\/\//, "").split("/")[0],
    //   url: product_url.startsWith("http")
    //     ? product_url
    //     : `https://${product_url}`,
    //   video_length: `${duration}s`,
    //   layout: "horizontal",
    //   language: "ja",
    //   thinking_level: "low",
    //   context: "英会話スクールのLPから要点を抽出",
    // });

    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error || "Error" }, { status: 500 });
  }
}
