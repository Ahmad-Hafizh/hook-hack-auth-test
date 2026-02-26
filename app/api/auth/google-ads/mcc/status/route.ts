import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userDbId } = await getUser();

    if (!userDbId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const adsCredential = await prisma.googleAdsCredential.findUnique({
      where: { userId: userDbId },
      select: {
        customerIds: true,
      },
    });

    if (!adsCredential) {
      return NextResponse.json(
        { error: "Google Ads credential not found" },
        { status: 404 },
      );
    }

    console.log(adsCredential);

    const { data } = await callAppV2Api.get("/v1/google-ads/link-status", {
      headers: {
        "X-User-ID": "cmlzyp3mo000004jrp6aqtc2a",
      },
      params: {
        customer_id: adsCredential.customerIds[0],
      },
    });

    if (data?.detail?.status === "ACTIVE") {
      await prisma.user.update({
        where: { id: userDbId! },
        data: {
          isLinkedWithMCC: true,
        },
      });
    }

    return NextResponse.json({ status: data?.status }, { status: 200 });
  } catch (error) {
    console.error("MCC status check error:", error);
    return NextResponse.json(
      { error: "Failed to check MCC status" },
      { status: 500 },
    );
  }
}
