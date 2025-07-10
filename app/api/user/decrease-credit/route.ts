import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getAuth } from "@clerk/nextjs/server";

function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = serializeBigInt(obj[key]);
    }
    return newObj;
  }
  return obj;
}

export async function POST(req: NextRequest) {
  try {
    // Get Clerk user ID from request
    const authData = getAuth(req);
    const userId = authData?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user data
    const currentUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has enough credit
    if (currentUser.credit <= 0) {
      return NextResponse.json(
        { error: "Insufficient credit" },
        { status: 400 }
      );
    }

    // Decrease credit by 1
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { credit: currentUser.credit - 1 },
    });

    return NextResponse.json({
      success: true,
      user: serializeBigInt({
        id: updatedUser.id,
        credit: updatedUser.credit,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        tiktokUsername: updatedUser.tiktokUsername,
        createdAt: updatedUser.createdAt,
      }),
    });
  } catch (error) {
    console.error("Error decreasing credit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
