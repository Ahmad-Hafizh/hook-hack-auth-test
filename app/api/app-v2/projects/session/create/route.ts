import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../planning/utils/getUser";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  const { projectId } = await req.json();

  try {
    const { userDbId } = await getUser();
    if (!userDbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pdca = await prisma.pDCA.findUnique({
      where: { id: projectId, userId: userDbId },
    });

    if (!pdca) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404, statusText: "Project not found" },
      );
    }

    const pdcaSessionsCount = await prisma.pDCASession.count({
      where: { pdca_id: projectId },
    });

    const pdcaSession = await prisma.pDCASession.create({
      data: {
        pdca_id: projectId,
        id: `${projectId}_pdca-${pdcaSessionsCount + 1}`,
        lastPage: "selection",
        status: "in_progress",
        name: `PDCA Cycle-${pdcaSessionsCount + 1}`,
      },
    });

    return NextResponse.json({ sessionId: pdcaSession.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
