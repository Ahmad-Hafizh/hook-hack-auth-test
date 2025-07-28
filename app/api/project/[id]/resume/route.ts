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

// Helper function to determine which step to resume from
function determineResumeStep(project: any): number {
  console.log("🔍 Determining resume step for project:", {
    id: project.id,
    hasUserinput: !!project.userinput,
    hasComment: !!project.comment,
    hasHook: !!project.hook,
    hasContent: !!project.content,
  });

  // Check in reverse order (latest to earliest)
  if (project.content) {
    console.log(
      "✅ Project has content - resuming at Step 5 (StructureGenerator)"
    );
    return 5; // Show StructureGenerator with existing content
  }

  if (project.hook) {
    console.log("✅ Project has hook - resuming at Step 4 (ProductionSwitch)");
    return 4; // Show ProductionSwitch (Step 4) to generate content
  }

  if (project.comment) {
    console.log("✅ Project has comment - resuming at Step 3 (SelectHook)");
    return 3; // Show SelectHook
  }

  if (project.userinput) {
    console.log(
      "✅ Project has userinput - resuming at Step 2 (SelectComment)"
    );
    return 2; // Show SelectComment
  }

  console.log("⚠️ Project has no data - resuming at Step 1 (UserInput)");
  return 1; // Start from beginning
}

// Helper function to parse JSON data safely
function safeJsonParse(jsonValue: any): any {
  if (!jsonValue) return null;

  try {
    return typeof jsonValue === "string" ? JSON.parse(jsonValue) : jsonValue;
  } catch (error) {
    console.warn("🚨 Failed to parse JSON:", error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  console.log("🚀 Resume API - Request received");

  try {
    // Get Clerk user ID from request
    const authData = getAuth(req);
    const userId = authData?.userId;

    console.log("🔐 Resume API - Auth data:", {
      userId: userId ? "present" : "missing",
    });

    if (!userId) {
      console.log("❌ Resume API - No authenticated user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract projectId from URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const projectIdStr = pathParts[pathParts.length - 2]; // Second to last part (before 'resume')

    console.log("🔍 Resume API - URL parts:", {
      pathname: url.pathname,
      pathParts,
      projectIdStr,
    });

    // Validate project ID
    const projectId = BigInt(projectIdStr);
    if (!projectId || projectId <= 0) {
      console.log("❌ Resume API - Invalid project ID:", projectIdStr);
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    console.log("🔍 Resume API - Looking for project:", {
      projectId: projectId.toString(),
      userId,
    });

    // Fetch the specific project and verify ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        system_userid: userId,
      },
    });

    console.log("📋 Resume API - Project found:", project ? "Yes" : "No");

    if (!project) {
      console.log("❌ Resume API - Project not found or access denied");
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
        lastModified: project.system_createdAt, // Use createdAt since updatedAt doesn't exist
      },
    };

    console.log("✅ Resume API - Success:", {
      projectId: project.id.toString(),
      resumeStep,
      hasData: {
        userinput: !!parsedUserinput,
        comment: !!parsedComment,
        hook: !!parsedHook,
        content: !!parsedContent,
      },
    });

    return NextResponse.json({
      success: true,
      data: serializeBigInt(resumeData),
    });
  } catch (error) {
    console.error("❌ Resume API - Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
