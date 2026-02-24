import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId parameter" },
        { status: 400 },
      );
    }

    const pdca = await prisma.pDCA.findUnique({
      where: {
        id: sessionId.split("_")[0],
      },
      select: {
        name: true,
      },
    });

    const projectName = pdca?.name + " " + sessionId.split("_")[1];

    return NextResponse.json(
      { message: "Success", projectName: projectName },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
