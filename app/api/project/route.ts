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
  try {
    // Get Clerk user ID from request
    const authData = getAuth(req);
    const userId = authData?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("🚩 Received in API POST (userinput):", body.userinput);
    const { userinput, comment, hook, content } = body;

    // Create new project
    const projectData: any = {
      system_userid: userId,
      userinput: userinput || null,
      comment: comment || null,
      hook: hook || null,
      content: content || null,
    };

    // Set count fields based on whether data is provided
    if (hook) {
      projectData.hook_count = 1;
    }
    if (content) {
      projectData.content_count = 1;
    }

    const project = await prisma.project.create({
      data: projectData,
    });

    return NextResponse.json({
      success: true,
      project: serializeBigInt(project),
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get Clerk user ID from request
    const authData = getAuth(req);
    const userId = authData?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    console.log(
      "[GET /api/project] page:",
      page,
      "pageSize:",
      pageSize,
      "skip:",
      skip,
      "take:",
      take
    );

    // Fetch total count
    const totalCount = await prisma.project.count({
      where: { system_userid: userId },
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    console.log(
      "[GET /api/project] totalCount:",
      totalCount,
      "totalPages:",
      totalPages
    );

    // Fetch paginated projects
    const projects = await prisma.project.findMany({
      where: { system_userid: userId },
      orderBy: { system_createdAt: "desc" },
      skip,
      take,
    });

    console.log(
      "[GET /api/project] returned projects:",
      projects.map((p) => ({
        id: p.id,
        userinput: p.userinput,
        system_createdAt: p.system_createdAt,
      }))
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
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
