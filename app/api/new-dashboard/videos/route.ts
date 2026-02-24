import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";

export async function GET(request: NextRequest) {
  try {
    const { userDbId } = await getUser();
    if (!userDbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const whereClause = {
      url: { not: null },
      PDCA_Session: {
        pdca: {
          userId: userDbId,
          ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {}),
        },
      },
    };

    const [videos, totalVideos] = await Promise.all([
      prisma.renderedVideo.findMany({
        where: whereClause,
        select: {
          id: true,
          url: true,
          status: true,
          PDCA_Session: {
            select: {
              name: true,
              createdAt: true,
              pdca: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          PDCA_Session: {
            createdAt: "desc",
          },
        },
        skip,
        take: limit,
      }),
      prisma.renderedVideo.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalVideos / limit);

    const formattedVideos = videos.map((video) => ({
      id: video.id,
      url: video.url,
      status: video.status,
      projectName: video.PDCA_Session.pdca.name,
      sessionName: video.PDCA_Session.name,
      createdAt: video.PDCA_Session.createdAt,
    }));

    return NextResponse.json({
      videos: formattedVideos,
      totalVideos,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
