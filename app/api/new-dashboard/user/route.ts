import { NextResponse } from "next/server";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import { prisma } from "@/config/prisma/prisma";

export async function GET() {
  try {
    const { userId } = await getUser();

    if (!userId) {
      return NextResponse.json(
        { name: null, email: null },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { userId },
      select: { name: true, email: true },
    });

    return NextResponse.json({
      name: user?.name || null,
      email: user?.email || null,
    });
  } catch {
    return NextResponse.json(
      { name: null, email: null },
      { status: 500 }
    );
  }
}
