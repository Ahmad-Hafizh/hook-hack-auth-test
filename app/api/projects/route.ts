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
    const { page = 1, limit = 10 } = body;

    const supabase = await createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const userId = authUser.id;

    const user = await prisma.user.findFirst({
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

    console.log("👤 Projects API - User found:", user ? "Yes" : "No");
    if (user) {
      console.log("👤 Projects API - User details:", {
        id: user.id,
        userId: user.userId,
        email: user.email,
        name: user.name,
        projectCount: user._count.project,
      });
    }

    if (!user) {
      console.log("❌ Projects API - User not found in database");
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 },
      );
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    console.log("📊 Projects API - Pagination params:", {
      skip,
      take,
      page,
      limit,
    });

    // Fetch projects with pagination using the user's userId
    console.log("🔍 Projects API - Fetching projects for userId:", user.userId);
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: {
          system_userid: user.userId, // Use user.userId from the found user
        },
        orderBy: {
          system_createdAt: "desc",
        },
        skip,
        take,
      }),
      prisma.project.count({
        where: {
          system_userid: user.userId, // Use user.userId from the found user
        },
      }),
    ]);

    console.log(`🔍 Projects API - Page ${page}, Limit ${limit}`);
    console.log(`🔍 Projects API - Total projects: ${totalCount}`);
    console.log(`🔍 Projects API - Fetched projects: ${projects.length}`);
    console.log(
      `🔍 Projects API - Raw projects:`,
      projects.map((p) => ({
        id: p.id,
        system_userid: p.system_userid,
        created: p.system_createdAt,
      })),
    );

    // Transform projects to match the table structure
    const transformedProjects = projects.map((project, index) => {
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
        creditsLeft: Math.floor(Math.random() * 200) + 50, // Placeholder
        // Include full project data for modal
        userinput: project.userinput,
        comment: project.comment,
        hook: project.hook,
        content: project.content,
      };

      console.log(`🔄 Transformed Project ${skip + index + 1}:`, {
        id: transformed.id,
        productName: transformed.productName,
        hasUserInput: !!transformed.userinput,
        hasComment: !!transformed.comment,
        hasHook: !!transformed.hook,
        hasContent: !!transformed.content,
      });

      return transformed;
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / take);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = {
      success: true,
      data: {
        projects: transformedProjects,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit: take,
        },
      },
    };

    console.log("📊 Projects API Response:", {
      currentPage: page,
      totalPages,
      totalCount,
      projectsCount: transformedProjects.length,
    });

    return NextResponse.json(serializeBigInt(response));
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
