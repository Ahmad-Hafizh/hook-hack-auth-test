import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import { checkUserSession } from "../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, keywords } = body;

    const { valid } = await checkUserSession(sessionId);
    if (!valid) {
      return NextResponse.json(
        {
          error: "Unauthorized or invalid session",
          redirect: "/app-v2/planning/what",
        },
        { status: 401, statusText: "invalid" }
      );
    }

    const checkResult: { valid: boolean; response?: NextResponse } =
      await checkPageStep(sessionId, "what_scratch");
    if (!checkResult.valid) {
      return checkResult.response;
    }

    // call websites endpoint
    const websitesResp = await callAppV2Api.post("/v1/websites", {
      keywords,
      limit: 5,
    });
    const websites = websitesResp?.data;
    if (!websites || !Array.isArray(websites.websites)) {
      throw new Error("Invalid websites response from v1/websites");
    }

    const urls = websites.websites
      .map((website: any) => website.url)
      .filter(Boolean);
    if (urls.length === 0) {
      throw new Error("No website URLs returned for screenshot generation");
    }

    // call screenshots endpoint
    const visualsResp = await callAppV2Api.post("/v1/websites/screenshot", {
      urls,
    });
    const visuals = visualsResp?.data;
    if (!visuals || !Array.isArray(visuals.items)) {
      throw new Error("Invalid visuals response from v1/websites/screenshot");
    }

    // Build visuals array to return
    const visualsUrls = visuals.items.map((item: any) => ({
      url: item.url,
      screenshot_url: item.screenshot?.link ?? null,
      title: item.title ?? null,
      meta_description: item.meta_description ?? null,
    }));

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        keyword: keywords[0] || "",
      },
    });

    return NextResponse.json(
      { message: "Success", key_visuals: visualsUrls },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error" },
      { status: 500 }
    );
  }
}
