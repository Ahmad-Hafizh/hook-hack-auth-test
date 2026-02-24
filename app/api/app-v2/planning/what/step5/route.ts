import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../utils/checkUserSession";
import { checkPageStep } from "../../utils/checkPageStep";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, valueOrganization, selectedValueOrganization } =
      await req.json();

    const pdcaSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        step: 6,
        planning_what: {
          update: {
            selected_value_organization: selectedValueOrganization,
          },
        },
      },
      select: {
        valueOrganizationsNew: true,
        competitiveMatrixesNew: true,
        planning_what: {
          select: {
            selected_competitor_matrix: true,
          },
        },
      },
    });

    const formattedData = valueOrganization.map((item: any) => ({
      value_id: item.id,
      label: item.label,
      category: item.category,
      rationale: item.rationale,
    }));

    // Upsert value organizations as JSON into single record
    await prisma.valueOrganizationsNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { value_organizations: formattedData },
      create: { pdca_session_id: sessionId, value_organizations: formattedData },
    });

    const matrixKey =
      pdcaSession.planning_what?.selected_competitor_matrix || "user";

    const competitorMatrix = (pdcaSession.competitiveMatrixesNew as any)?.[0] as any;
    const selectedMatrixData: any =
      matrixKey === "user"
        ? competitorMatrix?.user
        : competitorMatrix?.suggestion;

    const own_lp_summary = `${selectedMatrixData.key_message}, ${selectedMatrixData.strong_points.join(", ")}`;

    const competitors_summary = competitorMatrix?.competitor?.map(
      (c: any) => `${c.key_message}, ${c.strong_points.join(", ")}`,
    );

    return NextResponse.json(
      {
        message: "Success",
        own_lp_summary,
        competitors_summary,
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
