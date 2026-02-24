import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, desireOrganization, selectedDesireOrganization } =
      await req.json();

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_what: {
          update: {
            selected_desire_tobe_organization: selectedDesireOrganization,
          },
        },
      },
    });

    await prisma.desireOrganizationsNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { desire_organizations: desireOrganization },
      create: {
        desire_organizations: desireOrganization,
        pdca_session_id: sessionId,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
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
