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

export async function PATCH(req: NextRequest) {
  try {
    // Get Clerk user ID from request
    const authData = getAuth(req);
    const userId = authData?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract projectId from URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const projectId = BigInt(pathParts[pathParts.length - 1]);

    const body = await req.json();
    console.log("📝 Request body:", body);
    console.log("📝 Project ID (BigInt):", projectId);

    // Verify the project belongs to the user
    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        system_userid: userId,
      },
    });

    console.log("📝 Existing project found:", existingProject ? "Yes" : "No");
    console.log("📝 Existing project data:", existingProject);

    if (!existingProject) {
      console.error("❌ Project not found or access denied");
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = { ...body };
    console.log("📝 Initial updateData:", updateData);

    // Auto-increment count fields when updating hook or content
    console.log("📝 body.hook:", body.hook);
    console.log("📝 body.content:", body.content);
    console.log("📝 body.content type:", typeof body.content);
    console.log(
      "📝 body.content length:",
      body.content ? body.content.length : "null/undefined"
    );

    if (body.hook !== undefined) {
      console.log("📝 Adding hook_count increment");
      // If hook_count is null, set to 1, otherwise increment
      updateData.hook_count =
        existingProject.hook_count === null
          ? 1
          : {
              increment: 1,
            };
    }

    if (body.content !== undefined) {
      console.log("📝 Adding content_count increment");
      console.log("📝 Existing content_count:", existingProject.content_count);
      // If content_count is null, set to 1, otherwise increment
      updateData.content_count =
        existingProject.content_count === null
          ? 1
          : {
              increment: 1,
            };
      console.log("📝 New content_count value:", updateData.content_count);
    } else {
      console.log(
        "❌ body.content is undefined - not incrementing content_count"
      );
    }

    console.log("📝 Final update data:", updateData);

    // Update the project with the provided fields
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    console.log("✅ Project updated successfully:", updatedProject);

    return NextResponse.json({
      success: true,
      project: serializeBigInt(updatedProject),
    });
  } catch (error) {
    console.error("❌ Error updating project:", error);
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

    // Extract projectId from URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const projectId = BigInt(pathParts[pathParts.length - 1]);

    // Fetch the specific project
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        system_userid: userId,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project: serializeBigInt(project),
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
