import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const sessionId = params.get("sessionId");

    const session = await prisma.pDCASession.findUnique({
      where: {
        id: sessionId || "",
      },
      select: {
        lastPage: true,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Step is valid", page: session.lastPage },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
