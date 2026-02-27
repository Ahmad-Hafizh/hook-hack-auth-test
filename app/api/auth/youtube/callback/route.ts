import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/youtube/success?status=error&message=${encodeURIComponent("YouTube authentication failed")}`,
      );
    }

    const { userDbId } = await getUser();

    if (!userDbId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/youtube/success?status=error&message=${encodeURIComponent("User not found. Please sign in again.")}`,
      );
    }

    // Verify connection with backend
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
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/youtube/success?status=success`,
    );
  } catch (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/youtube/success?status=error&message=${encodeURIComponent("Failed to connect YouTube account")}`,
    );
  }
}
