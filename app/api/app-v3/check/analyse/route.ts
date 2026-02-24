import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ad_ids } = await request.json();

    const { data } = await callAppV2Api.post(
      "/v1/google-ads/ads/sync-verified",
      {
        limit: 50,
        period: "monthly",
        prune_stale: false,
        selected_ad_ids: ad_ids,
      },
      {
        headers: {
          "X-User-ID": "a",
        },
      },
    );

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check" }, { status: 500 });
  }
}
