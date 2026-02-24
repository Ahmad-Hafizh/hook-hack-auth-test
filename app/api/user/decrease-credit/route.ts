import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";

export async function POST() {
  try {
    const { userId } = await getUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Atomic decrement: only succeeds if credit > 0
    const updatedUser = await prisma.user.update({
      where: { userId, credit: { gt: 0 } },
      data: { credit: { decrement: 1 } },
      select: { id: true, credit: true, name: true, email: true },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        credit: updatedUser.credit,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error: unknown) {
    // Prisma P2025: record not found (no row matched the where clause)
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Insufficient credit" },
        { status: 400 }
      );
    }

    console.error("Error decreasing credit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
