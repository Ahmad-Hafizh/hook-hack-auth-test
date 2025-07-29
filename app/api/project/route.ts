import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getAuth } from "@clerk/nextjs/server";

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
  console.log(
    "[API /api/project] - POST request received at:",
    new Date().toISOString()
  );
  try {
    // Get Clerk user ID from request
    console.log("[POST /api/project] Checking user authentication...");
    const authData = getAuth(req);
    const userId = authData?.userId;
    if (!userId) {
      console.error("[POST /api/project] Unauthorized: No userId found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(`[POST /api/project] Authenticated user: ${userId}`);

    const body = await req.json();
    console.log("[POST /api/project] Request body:", body);
    const { userinput, comment, hook, content } = body;

    // Use a transaction to ensure credit deduction and project creation are atomic
    console.log("[POST /api/project] Starting database transaction...");
    const project = await prisma.$transaction(async (tx) => {
      // 1. Find the user and check their credit
      console.log(`[POST /api/project] Finding user ${userId} in transaction.`);
      const user = await tx.user.findUnique({
        where: { userId },
      });

      if (!user) {
        console.error(
          `[POST /api/project] User ${userId} not found in database.`
        );
        throw new Error("User not found");
      }
      console.log(
        `[POST /api/project] Found user. Current credit: ${user.credit}`
      );

      if (user.credit < 1) {
        console.warn(
          `[POST /api/project] User ${userId} has insufficient credits (${user.credit}).`
        );
        throw new Error("Insufficient credits");
      }
      console.log(`[POST /api/project] User ${userId} has sufficient credits.`);

      // 2. Deduct one credit
      console.log(
        `[POST /api/project] Deducting 1 credit from user ${userId}.`
      );
      await tx.user.update({
        where: { userId },
        data: { credit: { decrement: 1 } },
      });
      console.log(`[POST /api/project] Credit deducted successfully.`);

      // 3. Create the new project
      console.log(`[POST /api/project] Creating project for user ${userId}.`);
      const projectData: any = {
        system_userid: userId,
        userinput: userinput || null,
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

      const newProject = await tx.project.create({
        data: projectData,
      });
      console.log(
        `[POST /api/project] Project created with ID: ${newProject.id}.`
      );

      return newProject;
    });
    console.log("[POST /api/project] Transaction completed successfully.");

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
  console.log(
    "[API /api/project] - GET request received at:",
    new Date().toISOString()
  );
  try {
    // Get Clerk user ID from request
    console.log("[GET /api/project] Checking user authentication...");
    const authData = getAuth(req);
    const userId = authData?.userId;
    if (!userId) {
      console.error("[GET /api/project] Unauthorized: No userId found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(`[GET /api/project] Authenticated user: ${userId}`);

    // Pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    console.log("[GET /api/project] Pagination params:", {
      page,
      pageSize,
      skip,
      take,
    });

    // Fetch total count
    console.log(
      `[GET /api/project] Fetching total project count for user ${userId}.`
    );
    const totalCount = await prisma.project.count({
      where: { system_userid: userId },
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    console.log(
      `[GET /api/project] Found ${totalCount} total projects, ${totalPages} total pages.`
    );

    // Fetch paginated projects
    console.log(`[GET /api/project] Fetching projects for page ${page}.`);
    const projects = await prisma.project.findMany({
      where: { system_userid: userId },
      orderBy: { system_createdAt: "desc" },
      skip,
      take,
    });

    console.log(
      `[GET /api/project] Found ${projects.length} projects on this page.`
    );

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
