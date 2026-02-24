import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ad_ids } = await request.json();

    const { data } = await callAppV2Api.post(
      "/v1/google-ads/report/jobs",
      {
        provider: "string",
        language: "ja",
        include_recommendations: true,
        thinking_level: "low",
        period: "monthly",
        custom_prompt: "string",
        max_age_minutes: 180,
        force_regenerate: false,
        selected_ad_ids: ad_ids,
      },
      {
        headers: {
          "X-User-ID": "a",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 },
    );
  }
}
