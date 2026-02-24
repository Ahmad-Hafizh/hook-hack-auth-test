import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../utils/checkUserSession";

export async function POST(req: NextRequest) {
  try {
    const { job_id, sessionId } = await req.json();

    if (!job_id) {
      return NextResponse.json(
        { error: "job_id is required" },
        { status: 422 },
      );
    }

    // Call external API to check job status
    const { data } = await callAppV2Api.get(
      `/v1/video/main-content/async/${job_id}`,
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
