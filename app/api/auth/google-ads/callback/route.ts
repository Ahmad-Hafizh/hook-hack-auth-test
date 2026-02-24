import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const next = searchParams.get("next");

    if (error) {
      return NextResponse.json(
        {
          error: "Google Ads authentication failed",
          url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/handler?status=error&message=${encodeURIComponent("Google Ads authentication failed")}`,
        },
        { status: 500 },
      );
    }

    const { userId, userDbId } = await getUser();

    if (!userId || !userDbId) {
      return NextResponse.json(
        {
          error: "User not found. Please sign in again.",
          url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/handler?status=error&message=${encodeURIComponent("User not found. Please sign in again.")}`,
        },
        { status: 404 },
      );
    }

    // Mark user as linked with Google Ads
    await prisma.user.update({
      where: { id: userDbId },
      data: { isLinkedWithGoogleAds: true },
    });

    // // Get ads credential for customer ID
    // const adsCredential = await prisma.googleAdsCredential.findUnique({
    //   where: { userId: userId },
    // });

    // if (!adsCredential || adsCredential.customerIds.length === 0) {
    //   return NextResponse.redirect(
    //     `${process.env.NEXT_PUBLIC_APP_URL}/auth/handler?status=error&message=${encodeURIComponent("Google Ads credential not found.")}`,
    //   );
    // }

    // const customerId = adsCredential.customerIds[0];

    // Check MCC link status
    const { data: mccStatus } = await callAppV2Api.get(
      "/v1/google-ads/link-status",
      {
        headers: {
          "X-User-ID": "a",
          customer_id: "9033642954",
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
        {
          status: "connected",
          message: "MCC already linked",
          url: next || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
        },
        { status: 200 },
      );
    } else {
      // MCC not linked, call link API
      try {
        await callAppV2Api.post(
          "/v1/google-ads/link",
          {
            customer_id: "9033642954",
          },
          {
            headers: {
              "X-User-ID": "a",
            },
          },
        );

        return NextResponse.json(
          {
            status: "linking",
            message: "MCC linking in progress",
            url:
              next || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
          },
          { status: 200 },
        );
      } catch (err) {
        return NextResponse.json(
          {
            error: "Failed to link MCC account",
            url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/handler?status=error&message=${encodeURIComponent(
              err instanceof Error
                ? err.message
                : "Failed to link MCC account.",
            )}`,
          },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to connect Google Ads account",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/handler?status=error&message=${encodeURIComponent("Failed to connect Google Ads account.")}`,
      },
      { status: 500 },
    );
  }
}
