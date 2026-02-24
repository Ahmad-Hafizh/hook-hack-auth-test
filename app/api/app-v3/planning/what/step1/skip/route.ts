import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkValidity } from "../../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, competitor_urls, user_url } = body;

    const { valid, userId } = await checkValidity({
      sessionId,
      expectedStep: 1,
    });
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_what: {
          upsert: {
            create: {
              competitor_urls,
              product: user_url,
            },
            update: {
              competitor_urls,
              product: user_url,
            },
          },
        },
      },
    });

    const { data } = await callAppV2Api.post(
      "/v1/key-message",
      {
        competitors: competitor_urls.map((url: string) => ({
          url: url.startsWith("http") ? url : `https://${url}.com`,
        })),
        user_url: user_url.startsWith("http")
          ? user_url
          : `https://${user_url}.com`,
        provider: "openai",
        language: "en",
        tone: "professional",
      },
      {
        headers: {
          "X-User-ID": userId,
          "X-PDCA-Session-ID": sessionId,
        },
      },
    );

    await prisma.competitiveMatrixesNew.upsert({
      where: { pdca_session_id: sessionId },
      update: {
        user: data.user,
        suggestion: data.suggestion,
        competitor: data.competitors,
      },
      create: {
        pdca_session_id: sessionId,
        user: data.user,
        suggestion: data.suggestion,
        competitor: data.competitors,
      },
    });

    return NextResponse.json(
      { message: "Success", key_message: data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
