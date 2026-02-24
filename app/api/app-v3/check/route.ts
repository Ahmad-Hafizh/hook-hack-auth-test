import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";

export async function GET(request: NextRequest) {
  try {
    // const { userId, userDbId } = await getUser();
    // if (!userId || !userDbId) {
    //   return NextResponse.json({ error: "User not found" }, { status: 401 });
    // }

    // const { data: mccStatus } = await callAppV2Api.get(
    //   "/v1/google-ads/link-status",
    //   {
    //     headers: {
    //       "X-User-ID": "a",
    //       customer_id: "9033642954",
    //     },
    //   },
    // );
    // if (mccStatus?.detail?.status !== "connected") {
    //   return NextResponse.json(
    //     { error: "MCC not linked yet" },
    //     { status: 500 },
    //   );
    // }

    const { data } = await callAppV2Api.get("/v1/google-ads/ads", {
      headers: {
        limit: "20",
        "X-User-ID": "a",
        period: "monthly",
      },
    });

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check" }, { status: 500 });
  }
}
