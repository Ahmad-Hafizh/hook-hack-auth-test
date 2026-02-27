import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const next = searchParams.get("next");
    const customer_id = searchParams.get("customer_id");

    // if (error) {
    //   return NextResponse.json(
    //     {
    //       error: "Google Ads authentication failed",
    //       url: `${process.env.NEXT_PUBLIC_APP_URL}/handler?status=error&message=${encodeURIComponent("Google Ads authentication failed")}`,
    //     },
    //     { status: 500 },
    //   );
    // }

    const { userDbId } = await getUser();

    if (!userDbId) {
      return NextResponse.json(
        {
          error: "User not found. Please sign in again.",
          url: `${process.env.NEXT_PUBLIC_APP_URL}/handler?status=error&message=${encodeURIComponent("User not found. Please sign in again.")}`,
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
    const adsCredential = await prisma.googleAdsCredential.findUnique({
      where: { userId: userDbId },
    });

    console.log(adsCredential);

    if (!adsCredential || adsCredential.customerIds.length === 0) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/handler?status=error&message=${encodeURIComponent("Google Ads credential not found.")}`,
      );
    }

    let mccStatus;
    // const customerId = adsCredential.customerIds[0];
    try {
      // Check MCC link status
      const { data } = await callAppV2Api.get("/v1/google-ads/link-status", {
        headers: {
          "X-User-ID": "cmlzyp3mo000004jrp6aqtc2a",
        },
        params: {
          customer_id: adsCredential.customerIds[0] || customer_id || "",
        },
      });

      mccStatus = data;
    } catch (error: any) {
      return NextResponse.json(
        {
          error: "Failed to link MCC account",
          url: `${process.env.NEXT_PUBLIC_APP_URL}/handler?status=error&message=${encodeURIComponent(
            error.response?.data?.detail?.message ||
              "Failed to link MCC account.",
          )}`,
        },
        { status: 500 },
      );
    }

    if (mccStatus?.status === "ACTIVE" || mccStatus?.status === "PENDING") {
      await prisma.user.update({
        where: { id: userDbId },
        data: { isLinkedWithMCC: true },
      });

      return NextResponse.json(
        {
          status: "ACTIVE",
          message: "MCC already linked",
          url: next || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
        },
        { status: 200 },
      );
    } else {
      // MCC not linked, call link API
      try {
        const { data: mccLinkData } = await callAppV2Api.post(
          "/v1/google-ads/link",
          {
            customer_id: adsCredential.customerIds[0] || customer_id || "",
          },
          {
            headers: {
              "X-User-ID": "cmlzyp3mo000004jrp6aqtc2a",
            },
          },
        );

        return NextResponse.json(
          {
            status: mccLinkData.status || "PENDING",
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
            url: `${process.env.NEXT_PUBLIC_APP_URL}/handler?status=error&message=${encodeURIComponent(
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
        url: `${process.env.NEXT_PUBLIC_APP_URL}/handler?status=error&message=${encodeURIComponent("Failed to connect Google Ads account.")}`,
      },
      { status: 500 },
    );
  }
}
