import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const next = searchParams.get("next") || `/dashboard/settings`;

    const { userId, userDbId } = await getUser();
    if (!userId || !userDbId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const { data: googleAdsConnectionStatus } = await callAppV2Api.get(
      "/v1/google-ads/connection-status",
      {
        headers: {
          "X-User-ID": userDbId,
        },
      },
    );

    const adsCredential = await prisma.googleAdsCredential.findUnique({
      where: { userId: userDbId },
    });

    if (googleAdsConnectionStatus.connected && adsCredential) {
      await prisma.user.update({
        where: { id: userDbId },
        data: { isLinkedWithGoogleAds: true },
      });

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google-ads/callback`,
      );
    } else if (googleAdsConnectionStatus.connected && !adsCredential) {
      await prisma.googleAdsCredential.upsert({
        where: { userId: userDbId },
        update: {},
        create: {
          userId: userDbId,
          customerIds: [googleAdsConnectionStatus.customer_id],
          refreshToken: "",
        },
      });

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google-ads/callback`,
      );
    } else if (!googleAdsConnectionStatus.connected && !adsCredential) {
      try {
        const { data: adsCredentialResponse } = await callAppV2Api.get(
          "/v1/google-ads/oauth-url",
          {
            headers: {
              "X-User-ID": userDbId,
            },
            params: {
              next,
            },
          },
        );

        return NextResponse.json({ ...adsCredentialResponse }, { status: 200 });
      } catch (err) {
        return NextResponse.json(
          {
            error: "Failed to initiate Google Ads sign-in",
            url: `${process.env.NEXT_PUBLIC_APP_URL}/handler?error=${encodeURI("Failed to initiate Google Ads sign-in")}`,
          },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to sign in with Google Ads",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/handler?error=${encodeURI("Failed to sign in with Google Ads")}`,
      },
      { status: 500 },
    );
  }
}
