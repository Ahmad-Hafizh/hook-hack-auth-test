import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const pDCASession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: {
          select: {
            selected_desire_tobe_organization: true,
          },
        },
        desireOrganizationsNew: true,
      },
    });

    if (!pDCASession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Success",
        desireOrganization: (pDCASession.desireOrganizationsNew as any)?.[0]?.desire_organizations || [],
        selectedDesireOrganization:
          pDCASession.planning_what?.selected_desire_tobe_organization,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
