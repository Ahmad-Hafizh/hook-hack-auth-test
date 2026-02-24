import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { projectId, memo } = await req.json();

    await prisma.pDCA.update({
      where: { id: projectId },
      data: {
        memo: memo,
      },
    });

    return NextResponse.json(
      { message: "Memo updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Failed to edit memo" },
      { status: 500 },
    );
  }
}
