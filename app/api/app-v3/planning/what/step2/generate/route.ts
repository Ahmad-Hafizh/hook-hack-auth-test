import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, excludeKeywords } = await req.json();
    const PDCASession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: { select: { product: true } },
      },
    });

    if (!PDCASession || !PDCASession.planning_what) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    let responseData: any = {};
    try {
      const { data } = await callAppV2Api.post("/v1/keywords", {
        text: PDCASession.planning_what.product,
        provider: "OpenAI",
        max_keywords: 12,
        exclude_keywords: excludeKeywords,
      });
      console.log(data);
      responseData = data.keywords;
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 502 });
    }

    return NextResponse.json(
      { message: "Success", keywords: responseData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || "internal server Error" },
      { status: 500 },
    );
  }
}
