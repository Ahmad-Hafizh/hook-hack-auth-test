import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../../utils/checkUserSession";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        valueOrganizationsNew: true,
        planning_what: {
          select: {
            selected_value_organization: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        valueOrganization: (pdcaSession?.valueOrganizationsNew as any)?.[0]?.value_organizations || [],
        selectedValueOrganization:
          pdcaSession?.planning_what?.selected_value_organization,
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
