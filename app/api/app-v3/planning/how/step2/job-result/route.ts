import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../utils/checkUserSession";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_how: {
          select: {
            job_id_variant: true,
          },
        },
      },
    });
    // Call external API to check job status
    const { data } = await callAppV2Api.get(
      `/v1/video/main-content/async/${pdcaSession?.planning_how?.job_id_variant}`,
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error,
      },
      { status: 500 },
    );
  }
}
