import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../planning/utils/getUser";

export async function DELETE(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const { userDbId } = await getUser();
    if (!userDbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Soft delete: set deletedAt timestamp
    await prisma.pDCASession.update({
      where: { id: sessionId, pdca: { userId: userDbId } },
      data: {
        deletedAt: new Date(),
        status: "deleted",
        memo: "このサイクルは削除されました。",
      },
    });

    return NextResponse.json(
      { message: "Session deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
