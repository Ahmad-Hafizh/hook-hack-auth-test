import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { checkValidity } from "../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, valueOrganization, selectedValueOrganization } =
      await req.json();

    const { valid, userId } = await checkValidity({
      sessionId,
      expectedStep: 4,
    });
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pdcaSession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_what: {
          update: {
            selected_value_organization: selectedValueOrganization,
          },
        },
      },
      select: {
        competitiveMatrixesNew: true,
        planning_what: {
          select: {
            selected_competitor_matrix: true,
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

    if (!pdcaSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const matrixKey =
      pdcaSession.planning_what?.selected_competitor_matrix || "user";

    const selectedMatrixData: any =
      matrixKey === "user"
        ? pdcaSession.competitiveMatrixesNew?.user
        : pdcaSession.competitiveMatrixesNew?.suggestion;

    const own_lp_summary = `${selectedMatrixData.key_message}, ${selectedMatrixData.strong_points.join(", ")}`;

    const competitors_summary =
      pdcaSession.competitiveMatrixesNew?.competitor?.map(
        (c: any) => `${c.key_message}, ${c.strong_points.join(", ")}`,
      );

    return NextResponse.json(
      {
        message: "Success",
        own_lp_summary,
        competitors_summary,
        user_id: userId,
        pdca_session_id: sessionId,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "internal server error" },
      { status: 500 },
    );
  }
}
