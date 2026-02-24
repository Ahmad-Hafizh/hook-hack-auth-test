import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";

const TYPE_LABELS: Record<string, string> = {
  subscription: "サブスクリプション",
  purchase: "追加クレジット",
  renewal: "更新",
};

export async function GET(req: NextRequest) {
  try {
    const { userId } = await getUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10))
    );
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;
    const sortOrder =
      searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: {
      userId: string;
      status?: string;
      stripeSessionId?: { contains: string; mode: "insensitive" };
    } = { userId };

    if (status && status !== "all") {
      where.status = status;
    }

    if (search) {
      where.stripeSessionId = { contains: search, mode: "insensitive" };
    }

    const [totalCount, transactions] = await Promise.all([
      prisma.transaction.count({ where }),
      prisma.transaction.findMany({
        where,
        orderBy: { createdAt: sortOrder },
        skip,
        take: limit,
        select: {
          id: true,
          stripeSessionId: true,
          status: true,
          type: true,
          amount: true,
          quantity: true,
          createdAt: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const data = transactions.map((t) => ({
      id: t.id,
      invoiceId: t.stripeSessionId,
      status: t.status,
      type: TYPE_LABELS[t.type] || t.type,
      amount: t.amount,
      quantity: t.quantity,
      dateCreated: t.createdAt.toISOString(),
    }));

    return NextResponse.json({
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
