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

// Helper function to determine which step to resume from
function determineResumeStep(project: any): number {
  if (project.content) return 5;
  if (project.hook) return 4;
  if (project.comment) return 3;
  if (project.userinput) return 2;
  return 1;
}

// Helper function to parse JSON data safely
function safeJsonParse(jsonValue: any): any {
  if (!jsonValue) return null;
  try {
    return typeof jsonValue === "string" ? JSON.parse(jsonValue) : jsonValue;
  } catch (error) {
    console.warn("Failed to parse JSON:", error);
    return null;
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
    const projectIdStr = pathParts[pathParts.length - 2]; // Second to last part (before 'resume')

    // Validate project ID
    const projectId = BigInt(projectIdStr);
    if (!projectId || projectId <= 0) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Fetch the specific project and verify ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        system_userid: userId,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found or you don't have permission to access it",
        },
        { status: 404 }
      );
    }

    // Parse JSON fields safely
    const parsedUserinput = safeJsonParse(project.userinput);
    const parsedComment = safeJsonParse(project.comment);
    const parsedHook = safeJsonParse(project.hook);
    const parsedContent = safeJsonParse(project.content);

    // Determine which step to resume from
    const resumeStep = determineResumeStep(project);

    // Prepare response with parsed data
    const resumeData = {
      id: project.id,
      userinput: parsedUserinput,
      comment: parsedComment,
      hook: parsedHook,
      content: parsedContent,
      hook_count: project.hook_count,
      content_count: project.content_count,
      system_createdAt: project.system_createdAt,
      resumeStep: resumeStep,
      resumeMetadata: {
        hasUserinput: !!project.userinput,
        hasComment: !!project.comment,
        hasHook: !!project.hook,
        hasContent: !!project.content,
        lastModified: project.system_createdAt,
      },
    };

    return NextResponse.json({
      success: true,
      data: serializeBigInt(resumeData),
    });
  } catch (error) {
    console.error("Resume API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
