import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";
import { checkUserSession } from "../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, selected_keyVisual, keyVisuals } = body;

    // Validate required fields
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 422 },
      );
    }

    if (
      !selected_keyVisual ||
      !Array.isArray(selected_keyVisual) ||
      selected_keyVisual.length === 0
    ) {
      return NextResponse.json(
        {
          error: "selected_keyVisual is required and must be a non-empty array",
        },
        { status: 422 },
      );
    }

    const pDCASession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        step: 4,
        planning_what: {
          update: {
            selected_keyVisual: selected_keyVisual,
          },
        },
      },
      select: {
        planning_what: {
          select: { product: true },
        },
        id: true,
      },
    });

    if (!pDCASession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const keyVisualsData = keyVisuals.map((kv: any) => ({
      url: kv.url,
      screenshot_url: kv.screenshot_url,
      title: kv.title,
      meta_description: kv.meta_description,
      pdca_session_id: sessionId,
    }));

    // TODO: keyVisual model has been removed from schema.
    // Key visuals data is passed through to the key-message API but no longer persisted to DB.

    let key_message;

    const filteredCompetitors = keyVisuals.filter((kv: any) =>
      selected_keyVisual.includes(kv.url),
    );

    const userUrl =
      pDCASession.planning_what?.product?.startsWith("http://") ||
      pDCASession.planning_what?.product?.startsWith("https://")
        ? pDCASession?.planning_what?.product
        : `https://${pDCASession?.planning_what?.product?.replace(/\s/g, "")}`;

    try {
      const response = await callAppV2Api.post("/v1/key-message", {
        competitors: filteredCompetitors,
        user_url: userUrl,
        provider: "openai",
        language: "ja",
        brand_hint: "string",
        audience: "string",
        tone: "professional",
      });

      key_message = response.data;
      await prisma.competitiveMatrixesNew.upsert({
        where: { pdca_session_id: sessionId },
        update: {
          user: response.data.user,
          suggestion: response.data.suggestion,
          competitor: response.data.competitors,
        },
        create: {
          pdca_session_id: sessionId,
          user: response.data.user,
          suggestion: response.data.suggestion,
          competitor: response.data.competitors,
        },
      });
    } catch (apiError: any) {
      return NextResponse.json(
        {
          error: apiError,
          details: apiError.response?.data || apiError.message,
        },
        { status: apiError.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Success", key_message },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Step 3 error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
