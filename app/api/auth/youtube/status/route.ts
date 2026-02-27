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

    // Check local flag first
    const user = await prisma.user.findUnique({
      where: { id: userDbId },
      select: { isLinkedWithYoutube: true },
    });

    if (user?.isLinkedWithYoutube) {
      return NextResponse.json({
        connected: true,
        message: "YouTube connected",
      });
    }

    // Verify with backend
    try {
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
        return NextResponse.json({
          connected: true,
          message: "YouTube connected",
        });
      }
    } catch {
      // Backend check failed, rely on local flag
    }

    return NextResponse.json({
      connected: false,
      message: "YouTube not connected",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check YouTube status" },
      { status: 500 },
    );
  }
}
