import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // const { userId, userDbId } = await getUser();

    // if (!userId) {
    //   return NextResponse.json({ error: "User not found" }, { status: 401 });
    // }

    // const adsCredential = await prisma.googleAdsCredential.findUnique({
    //   where: { userId: userId },
    //   select: {
    //     customerIds: true,
    //   },
    // });

    // if (!adsCredential || adsCredential.customerIds.length === 0) {
    //   return NextResponse.json(
    //     { error: "Google Ads credential not found" },
    //     { status: 404 },
    //   );
    // }

    const { data } = await callAppV2Api.get("/v1/google-ads/mcc/status", {
      headers: {
        "X-User-ID": "a",
        customer_id: "9033642954",
      },
    });

    // if (
    //   data?.detail?.status === "completed" ||
    //   data?.detail?.status === "done"
    // ) {
    //   await prisma.user.update({
    //     where: { id: userDbId! },
    //     data: {
    //       first_time_login: false,
    //     },
    //   });
    // }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("MCC status check error:", error);
    return NextResponse.json(
      { error: "Failed to check MCC status" },
      { status: 500 },
    );
  }
}
