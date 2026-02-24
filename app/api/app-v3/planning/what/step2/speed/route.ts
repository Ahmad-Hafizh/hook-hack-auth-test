import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { checkValidity } from "../../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, duration, pointOfView, communicationStyle } = body;

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

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: {
          select: {
            product: true,
          },
        },
      },
    });

    await prisma.planningHow.upsert({
      where: { pdca_session_id: sessionId },
      update: {
        video_duration: duration,
        point_of_view: pointOfView,
        tone: communicationStyle,
      },
      create: {
        pdca_session_id: sessionId,
        video_duration: duration,
        point_of_view: pointOfView,
        tone: communicationStyle,
      },
    });

    const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
      mode: "instant",
      provider: "openai",
      product_name: pdcaSession?.planning_what?.product
        ?.replace(/https?:\/\//, "")
        .split("/")[0],
      url: pdcaSession?.planning_what?.product?.startsWith("http")
        ? pdcaSession?.planning_what?.product
        : `https://${pdcaSession?.planning_what?.product}`,
      video_length: `${duration}s`,
      layout: "horizontal",
      language: "ja",
      thinking_level: "low",
      context: "英会話スクールのLPから要点を抽出",
    });

    return NextResponse.json(
      {
        message: "Success",
        job_id: data.job_id,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error || "Error" }, { status: 500 });
  }
}
