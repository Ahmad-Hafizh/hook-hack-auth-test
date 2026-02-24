import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const planningHow = await prisma.planningHow.findUnique({
      where: { pdca_session_id: sessionId },
      select: {
        job_id_render: true,
      },
    });

    return NextResponse.json(
      {
        jobId: planningHow?.job_id_render,
        message: "Job ID fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Job ID", error },
      { status: 500 },
    );
  }
}
