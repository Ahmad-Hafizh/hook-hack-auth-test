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

    const { data: connectionStatus } = await callAppV2Api.get(
      "/v1/youtube/connection-status",
      {
        headers: {
          "X-User-ID": userDbId,
        },
      },
    );

    if (connectionStatus.connected) {
      await prisma.user.update({
        where: { id: userDbId },
        data: { isLinkedWithYoutube: true },
      });

      return NextResponse.json({ connected: true }, { status: 200 });
    }

    try {
      const { data: oauthResponse } = await callAppV2Api.get(
        "/v1/youtube/oauth-url",
        {
          headers: {
            "X-User-ID": userDbId,
          },
        },
      );

      console.log(
        "[youtube/sign-in] OAuth response:",
        JSON.stringify(oauthResponse),
      );

      // The backend may return the URL under different keys
      const oauthUrl =
        oauthResponse.oauth_url ||
        oauthResponse.url ||
        oauthResponse.authorization_url;

      if (!oauthUrl) {
        console.error(
          "[youtube/sign-in] No OAuth URL found in response:",
          oauthResponse,
        );
        return NextResponse.json(
          { error: "No OAuth URL returned from backend", raw: oauthResponse },
          { status: 502 },
        );
      }

      return NextResponse.json({ oauth_url: oauthUrl }, { status: 200 });
    } catch (err) {
      console.error("[youtube/sign-in] OAuth URL error:", err);
      return NextResponse.json(
        { error: "Failed to get YouTube OAuth URL" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initiate YouTube sign-in" },
      { status: 500 },
    );
  }
}
