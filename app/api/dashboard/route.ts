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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { limit = 5 } = body; // Default to 5 for overview page

    // Get Clerk user ID from request
    const authData = getAuth(req);
    const userId = authData?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Find user by Clerk userId
    let user = await prisma.user.findUnique({
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

    // If user not found, create a new user with Clerk data
    if (!user) {
      // Fetch Clerk user data from Clerk REST API
      const clerkApiKey = process.env.CLERK_SECRET_KEY;
      const clerkUserRes = await fetch(
        `https://api.clerk.dev/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${clerkApiKey}`,
          },
        }
      );
      const clerkUser = await clerkUserRes.json();
      user = await prisma.user.create({
        data: {
          userId: userId,
          email: clerkUser?.email_addresses?.[0]?.email_address || "",
          firstName: clerkUser?.first_name || "",
          lastName: clerkUser?.last_name || "",
          credit: 0,
        },
        include: {
          _count: {
            select: {
              project: true,
            },
          },
        },
      });
    }

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
        `   - UserInput: ${project.userinput ? "Has data" : "No data"}`
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
            parseError
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
        firstName: user.firstName,
        lastName: user.lastName,
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
      transformedProjects.length
    );
    console.log(
      "📊 Dashboard API - Project names:",
      transformedProjects.map((p) => p.productName)
    );

    return NextResponse.json({
      success: true,
      data: serializeBigInt(dashboardData),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
