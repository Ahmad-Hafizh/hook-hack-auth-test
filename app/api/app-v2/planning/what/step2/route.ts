import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import { checkUserSession } from "../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, keywords, selectedKeywords } = body;

    // Validate required fields
    if (
      !selectedKeywords ||
      typeof selectedKeywords !== "string" ||
      !selectedKeywords.trim()
    ) {
      return NextResponse.json(
        {
          error: "selectedKeywords is required and must be a non-empty string",
        },
        { status: 422 },
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 422 },
      );
    }

    // Update database with keywords and selected keyword
    const pdcaSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_what: {
          update: {
            selected_keyword: selectedKeywords,
          },
        },
        step: 3,
      },
      select: {
        id: true,
      },
    });

    // call websites endpoint

    const { data: websites } = await callAppV2Api.post("/v1/websites", {
      keywords: [selectedKeywords.trim()],
      limit: 5,
      language: "ja",
      provider: "openai",
    });

    if (!websites || !Array.isArray(websites.websites)) {
      throw new Error("Invalid websites response from v1/websites");
    }

    // call screenshots endpoint
    const { data: visuals } = await callAppV2Api.post(
      "/v1/websites/screenshot",
      {
        urls: websites.websites
          .map((website: any) => website.url)
          .filter(Boolean),
        language: "ja",
        crop: "viewport",
        timeout_sec: 6,
      },
    );

    if (!visuals || !Array.isArray(visuals.items)) {
      throw new Error("Invalid visuals response from v1/websites/screenshot");
    }

    // Build visuals array to return
    const visualsUrls = visuals.items.map((item: any) => ({
      url: item.url,
      screenshot_url: item.screenshot?.link ?? null,
      title: item.title ?? null,
      meta_description: item.meta_description ?? null,
      pdca_session_id: sessionId,
    }));

    // TODO: keyVisual model has been removed from schema.
    // Key visuals data is returned in the response but no longer persisted to DB.

    return NextResponse.json(
      { message: "Success", key_visuals: visualsUrls },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error" },
      { status: 500 },
    );
  }
}
