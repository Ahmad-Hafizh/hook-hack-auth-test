import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const authData = getAuth(req);
  const userId = authData?.userId;

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id.toString() },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: transactions });
}
