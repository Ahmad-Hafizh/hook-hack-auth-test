import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../planning/utils/getUser";
import { prisma } from "@/config/prisma/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const sortData = searchParams.get("sort") || "desc";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const totalPerPage = 5;

    const { userDbId } = await getUser();
    if (!userDbId) {
      // Fallback: return empty list
      return NextResponse.json(
        { projects: [], totalProjects: 0, totalPage: 1 },
        { status: 200 },
      );
    }

    const totalProjects = await prisma.pDCA.count({
      where: {
        userId: userDbId,
      },
    });

    const projectList = await prisma.pDCA.findMany({
      where: {
        userId: userDbId,
        AND: search
          ? {
              name: {
                contains: search,
              },
            }
          : {},
      },
      orderBy: { updatedAt: sortData === "asc" ? "asc" : "desc" },
      select: {
        id: true,
        name: true,
        memo: true,
        updatedAt: true,
      },
      skip: (page - 1) * totalPerPage,
      take: totalPerPage,
    });

    return NextResponse.json(
      {
        projects: projectList,
        totalProjects,
        totalPage: Math.ceil(totalProjects / totalPerPage),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();

  try {
    const { userDbId } = await getUser();
    if (!userDbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newProject = await prisma.pDCA.create({
      data: {
        id: crypto.randomUUID(),
        name: name || "New Project",
        userId: userDbId,
        memo: "Created a new project",
      },
      select: {
        id: true,
        name: true,
        memo: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Failed to create project" },
      { status: 500 },
    );
  }
};
