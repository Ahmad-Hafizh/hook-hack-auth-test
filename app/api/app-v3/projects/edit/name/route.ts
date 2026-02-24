import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { projectId, name } = await req.json();

    await prisma.pDCA.update({
      where: { id: projectId },
      data: {
        name: name,
      },
    });

    return NextResponse.json(
      { message: "Name updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Failed to edit name" },
      { status: 500 },
    );
  }
}
