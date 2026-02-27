import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";

export async function GET(request: NextRequest) {
  try {
    // const { userDbId } = await getUser();
    // if (!userDbId) {
    //   return NextResponse.json({ error: "User not found" }, { status: 401 });
    // }

    // const googleAdsCredential = await prisma.googleAdsCredential.findUnique({
    //   where: { userId: userDbId },
    // });
    // if (!googleAdsCredential) {
    //   return NextResponse.json(
    //     { error: "Google Ads not connected yet" },
    //     { status: 401 },
    //   );
    // }

    const { data: mccStatus } = await callAppV2Api.get(
      "/v1/google-ads/link-status",
      {
        headers: {
          "X-User-ID": "cmlzyp3mo000004jrp6aqtc2a",
        },
        params: {
          customer_id: "9033642954",
        },
      },
    );

    console.log("mcc link status", mccStatus);

    if (mccStatus?.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "MCC not linked yet" },
        { status: 401 },
      );
    }

    const { data } = await callAppV2Api.get("/v1/google-ads/ads", {
      headers: {
        "X-User-ID": "cmm23nv1v000004i76tdtwo1p",
      },
      params: {
        limit: "20",
        period: "monthly",
      },
    });

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check" }, { status: 500 });
  }
}
