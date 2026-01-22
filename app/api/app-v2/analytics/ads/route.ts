import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(user);

    const userData = await prisma.user.findUnique({
      where: { userId: user.id },
    });
    if (!userData) {
      return NextResponse.json(
        { message: "User data not found" },
        { status: 404 }
      );
    }
    console.log(userData);

    const response = await callAppV2Api.get("/v1/google-ads/ads?limit=5", {
      params: {
        "X-User-id": userData?.id!,
      },
    });
    console.log(response);

    return NextResponse.json({ ads: response.data.ads }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
