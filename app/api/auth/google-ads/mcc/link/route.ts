import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId, userDbId } = await getUser();

    if (!userId || !userDbId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: userDbId },
      data: { isLinkedWithGoogleAds: true },
    });

    const adsCredential = await prisma.googleAdsCredential.findUnique({
      where: { userId: userId },
    });

    if (!adsCredential || adsCredential.customerIds.length === 0) {
      return NextResponse.json(
        { error: "Google Ads credential not found" },
        { status: 404 },
      );
    }

    const customerId = adsCredential.customerIds[0];

    const { data: mccStatus } = await callAppV2Api.get(
      "/v1/google-ads/link-status",
      {
        headers: {
          "X-User-ID": userId,
          customer_id: customerId,
        },
      },
    );

    if (
      mccStatus?.detail?.status === "completed" ||
      mccStatus?.detail?.status === "done" ||
      mccStatus?.detail?.status === "connected"
    ) {
      await prisma.user.update({
        where: { id: userDbId },
        data: { isLinkedWithMCC: true },
      });

      return NextResponse.json(
        { status: "connected", message: "MCC already linked" },
        { status: 200 },
      );
    } else {
      try {
        await callAppV2Api.post(
          "/v1/google-ads/link",
          {
            customer_id: customerId,
          },
          {
            headers: {
              "X-User-ID": userId,
            },
          },
        );

        return NextResponse.json(
          { status: "linking", message: "MCC linking initiated" },
          { status: 200 },
        );
      } catch (err) {
        return NextResponse.json(
          {
            error:
              err instanceof Error
                ? err.message
                : "Failed to link MCC account. Please try again.",
          },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to link MCC" }, { status: 500 });
  }
}
