import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";

function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return obj.toString();
  if (obj instanceof Date) return obj.toISOString();
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
    const { userId } = await getUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userinput, comment, hook, content } = body;

    // Use a transaction with atomic credit check + decrement to prevent race conditions
    const project = await prisma.$transaction(async (tx) => {
      // Atomic decrement: only succeeds if credit > 0
      // This prevents the TOCTOU race condition where two concurrent requests
      // both read credit=1, both pass the check, and both decrement
      let updatedUser;
      try {
        updatedUser = await tx.user.update({
          where: { userId, credit: { gt: 0 } },
          data: { credit: { decrement: 1 } },
          select: { credit: true },
        });
      } catch (error: unknown) {
        // P2025: No record found matching the where clause (credit was 0)
        if (
          error instanceof Error &&
          "code" in error &&
          (error as { code: string }).code === "P2025"
        ) {
          throw new Error("Insufficient credits");
        }
        throw error;
      }

      console.log(
        `[POST /api/project] Credit decremented for user ${userId}. Remaining: ${updatedUser.credit}`
      );

      // Create the new project
      const projectData: any = {
        system_userid: userId,
        userinput: userinput || {},
        comment: comment || null,
        hook: hook || null,
        content: content || null,
      };

      if (hook) {
        projectData.hook_count = 1;
      }
      if (content) {
        projectData.content_count = 1;
      }

      return tx.project.create({ data: projectData });
    });

    return NextResponse.json({
      success: true,
      project: serializeBigInt(project),
    });
  } catch (error) {
    console.error("[POST /api/project] Error creating project:", error);

    if (error instanceof Error && error.message === "Insufficient credits") {
      return NextResponse.json(
        { error: "Not enough credits" },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await getUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [totalCount, projects] = await Promise.all([
      prisma.project.count({
        where: { system_userid: userId },
      }),
      prisma.project.findMany({
        where: { system_userid: userId },
        orderBy: { system_createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      success: true,
      projects: serializeBigInt(projects),
      totalPages,
      totalCount,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("[GET /api/project] Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
