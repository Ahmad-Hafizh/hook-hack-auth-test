import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, desireOrganization, selectedDesireOrganization } =
      await req.json();

    const pdcaSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        step: 7,
        planning_what: {
          update: {
            selected_desire_tobe_organization: selectedDesireOrganization,
          },
        },
      },

      select: {
        competitiveMatrixesNew: true,
        desireOrganizationsNew: true,
        valueOrganizationsNew: true,
        planning_what: {
          select: {
            selected_value_organization: true,
            selected_competitor_matrix: true,
          },
        },
      },
    });

    const formattedData = desireOrganization.map((item: any) => ({
      ...item,
    }));

    // Upsert desire organizations as JSON into single record
    await prisma.desireOrganizationsNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { desire_organizations: formattedData },
      create: { pdca_session_id: sessionId, desire_organizations: formattedData },
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
