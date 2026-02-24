import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // const { userId } = await getUser();
    // if (!userId) {
    //   return NextResponse.json({ error: "User not found" }, { status: 401 });
    // }

    const { data } = await callAppV2Api.get(
      "/v1/google-ads/connection-status",
      {
        headers: {
          "X-User-ID": "a",
        },
      },
    );

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check Google Ads status" },
      { status: 500 },
    );
  }
}
