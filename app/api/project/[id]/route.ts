import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";

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
    const supabase = await createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authUser.id;

    // Extract projectId from URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const projectId = BigInt(pathParts[pathParts.length - 1]);

    const body = await req.json();

    // Verify the project belongs to the user
    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        system_userid: userId,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = { ...body };

    if (body.hook !== undefined) {
      updateData.hook_count =
        existingProject.hook_count === null
          ? 1
          : {
              increment: 1,
            };
    }

    if (body.content !== undefined) {
      updateData.content_count =
        existingProject.content_count === null
          ? 1
          : {
              increment: 1,
            };
    }

    // Update the project with the provided fields
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      project: serializeBigInt(updatedProject),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authUser.id;

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
