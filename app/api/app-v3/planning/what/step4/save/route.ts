import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, valueOrganization, selectedValueOrganization } =
      await req.json();

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_what: {
          update: {
            selected_value_organization: selectedValueOrganization,
          },
        },
      },
    });

    await prisma.valueOrganizationsNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { value_organizations: valueOrganization },
      create: {
        value_organizations: valueOrganization,
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
      { error: error || "internal server error" },
      { status: 500 },
    );
  }
}
