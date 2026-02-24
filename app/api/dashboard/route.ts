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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { limit = 5 } = body;

    const supabase = await createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = authUser.id;

    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        _count: {
          select: {
            project: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch latest projects for the user with all data
    const latestProjects = await prisma.project.findMany({
      where: {
        system_userid: user.userId,
      },
      orderBy: {
        system_createdAt: "desc",
      },
      take: parseInt(limit), // Use the limit from request body
    });

    console.log(`🔍 Dashboard API - Limit: ${limit}`);
    console.log(`🔍 Raw projects from database:`, latestProjects.length);
    latestProjects.forEach((project, index) => {
      console.log(`📋 Project ${index + 1} (ID: ${project.id}):`);
      console.log(`   - Created: ${project.system_createdAt}`);
      console.log(
        `   - UserInput: ${project.userinput ? "Has data" : "No data"}`,
      );
      console.log(`   - Comment: ${project.comment ? "Has data" : "No data"}`);
      console.log(`   - Hook: ${project.hook ? "Has data" : "No data"}`);
      console.log(`   - Content: ${project.content ? "Has data" : "No data"}`);
    });

    // Transform projects to match the table structure
    const transformedProjects = latestProjects.map((project, index) => {
      let productName = `Project ${project.id}`; // Default fallback

      // Try to extract product_name from userinput JSON
      if (project.userinput) {
        try {
          const userInputData =
            typeof project.userinput === "string"
              ? JSON.parse(project.userinput)
              : project.userinput;

          if (userInputData && userInputData.product_name) {
            productName = userInputData.product_name;
          }
        } catch (parseError) {
          console.log(
            `Failed to parse userinput for project ${project.id}:`,
            parseError,
          );
        }
      }

      const transformed = {
        id: Number(project.id),
        productName: productName,
        dateCreated: project.system_createdAt.toISOString(),
        creditsLeft: Math.floor(Math.random() * 200) + 50, // Placeholder - you can calculate this based on your logic
        // Include full project data for modal
        userinput: project.userinput,
        comment: project.comment,
        hook: project.hook,
        content: project.content,
      };

      console.log(`🔄 Transformed Project ${index + 1}:`, {
        id: transformed.id,
        productName: transformed.productName,
        hasUserInput: !!transformed.userinput,
        hasComment: !!transformed.comment,
        hasHook: !!transformed.hook,
        hasContent: !!transformed.content,
      });

      return transformed;
    });

    // Prepare dashboard data
    const dashboardData = {
      user: {
        id: user.id,
        userId: user.userId,
        email: user.email,
        name: user.name,
        credit: user.credit,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      stats: {
        credits: user.credit,
        createdProjects: user._count.project,
        currentPlan: "Free Plan", // Placeholder as requested
      },
      projects: transformedProjects,
    };

    console.log("📊 Dashboard API - User found:", user.email);
    console.log("📊 Dashboard API - Projects count:", user._count.project);
    console.log(
      "📊 Dashboard API - Latest projects:",
      transformedProjects.length,
    );
    console.log(
      "📊 Dashboard API - Project names:",
      transformedProjects.map((p) => p.productName),
    );

    return NextResponse.json({
      success: true,
      data: serializeBigInt(dashboardData),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
