import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkValidity } from "../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, selectedIds, candidates, step } = body;

    const { valid, userId, response } = await checkValidity({
      sessionId,
      expectedStep: step || 4,
    });

    if (!valid) {
      return (
        response ||
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    const planning_what = await prisma.planningWhat.update({
      where: { pdca_session_id: sessionId },
      data: {
        selected_competitor_candidates: selectedIds,
        selected_competitor_matrix: undefined,
      },
      select: {
        product: true,
      },
    });

    await prisma.competitorCandidatesNew.upsert({
      where: { pdca_session_id: sessionId },
      update: {},
      create: {
        candidates: candidates,
        pdca_session_id: sessionId,
      },
    });

    const userUrl =
      planning_what.product?.startsWith("http://") ||
      planning_what.product?.startsWith("https://")
        ? planning_what.product
        : `https://${planning_what.product?.replace(/\s/g, "")}`;

    // console.log("payload", {
    //   competitors: [
    //     {
    //       url: "https://auto.mahindra.com/suv/thar",
    //       title: "mahindra",
    //       hero_text: {
    //         headline: "string",
    //         subhead: "string",
    //         cta: "string",
    //       },
    //       meta_description: "mahindra",
    //     },
    //     {
    //       url: "https://www.jeep.com/wrangler.html",
    //       title: "jeep wrangler",
    //       hero_text: {
    //         headline: "string",
    //         subhead: "string",
    //         cta: "string",
    //       },
    //       meta_description: "jeep",
    //     },
    //     {
    //       url: "https://www.forcemotors.com/vehicle/force-gurkha",
    //       title: "force",
    //       hero_text: {
    //         headline: "string",
    //         subhead: "string",
    //         cta: "string",
    //       },
    //       meta_description: "force",
    //     },
    //   ],
    //   user_url: userUrl,
    //   provider: "gemini",
    //   thinking_level: "high",
    //   language: "ja",
    //   brand_hint: "string",
    //   audience: "string",
    //   tone: "professional",
    // });

    const seenUrls = new Set<string>();
    const selectedCandidates = candidates
      .filter((candidate: any) => {
        if (!selectedIds.includes(candidate.url)) return false;
        if (seenUrls.has(candidate.url)) return false;
        seenUrls.add(candidate.url);
        return true;
      })
      .slice(0, 3)
      .map((candidate: any) => ({
        url: candidate.url,
        title: candidate.title || candidate.service_name || candidate.company_name || candidate.name || "",
        meta_description: candidate.meta_description || "",
        hero_text: candidate.hero_text || { headline: "", subhead: "", cta: "" },
      }));

    const externalPayload = {
      competitors: selectedCandidates,
      user_url: userUrl,
      provider: "openai",
      thinking_level: "high",
      language: "ja",
      brand_hint: "string",
      audience: "string",
      tone: "professional",
      use_cache: false,
    };

    console.log("[step2] Payload to /v1/key-message:", JSON.stringify(externalPayload, null, 2));

    let key_message;
    try {
      const { data } = await callAppV2Api.post(
        "/v1/key-message",
        externalPayload,
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

      key_message = data;
    } catch (apiError: any) {
      console.error("[step2] /v1/key-message FAILED");
      console.error("[step2] Status:", apiError.response?.status);
      console.error("[step2] Response data:", JSON.stringify(apiError.response?.data, null, 2));
      console.error("[step2] Error message:", apiError.message);
      return NextResponse.json(
        {
          error: apiError.response?.data || apiError.message,
          message: "Failed to generate key message",
        },
        { status: apiError.response?.status || 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Success",
        key_message,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Step 3 error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error && error.message,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
