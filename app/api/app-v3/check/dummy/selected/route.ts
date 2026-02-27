import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../planning/utils/getUser";

export async function POST(request: NextRequest) {
  try {
    const { selected_ad_ids } = await request.json();

    const { userDbId } = await getUser();
    if (!userDbId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    try {
      const { data: syncVeifiedResp } = await callAppV2Api.post(
        "/v1/google-ads/ads/sync-verified",
        {
          limit: 20,
          period: "monthly",
          prune_stale: false,
          selected_ad_ids: selected_ad_ids,
        },
        {
          headers: {
            "X-User-ID": "cmm23nv1v000004i76tdtwo1p",
          },
        },
      );

      console.log(syncVeifiedResp);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.detail, message: "Failed to sync verified ads" },
        { status: 500 },
      );
    }

    try {
      await callAppV2Api.post(
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
          selected_ad_ids: selected_ad_ids,
        },
        {
          headers: {
            "X-User-ID": "cmm23nv1v000004i76tdtwo1p",
          },
        },
      );

      try {
        const { data } = await callAppV2Api.post("/v1/google-ads/report", {
          provider: "openai",
          use_dummy_data: false,
          language: "ja",
        });

        return NextResponse.json({ ...data }, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to generate report" },
          { status: 500 },
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to generate report" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to check" }, { status: 500 });
  }
}
