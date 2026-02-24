import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../../utils/checkPageStep";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, competitor_urls, user_url } = body;

    let data;
    try {
      const { data: responseData } = await callAppV2Api.post(
        "/v1/key-message",
        {
          competitors: competitor_urls,
          user_url,
          provider: "openai",
          language: "en",
          brand_hint: "string",
          audience: "string",
          tone: "professional",
        },
      );
      data = responseData;
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_what: {
          update: {
            competitor_urls: competitor_urls,
            product: user_url,
          },
        },
      },
    });

    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
