import { NextRequest, NextResponse } from "next/server";
import { checkUserSession } from "../../utils/checkUserSession";
import { checkPageStep } from "../../utils/checkPageStep";
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

    let selected_values_6;
    const valueOrgArray = (pdcaSession.valueOrganizationsNew as any)?.[0]?.value_organizations || [];
    if (
      valueOrgArray.length > 0 &&
      pdcaSession.planning_what?.selected_value_organization
    ) {
      const filteredSelectedValue = valueOrgArray.filter(
        (vo: any) =>
          pdcaSession.planning_what?.selected_value_organization.includes(
            vo.value_id || "",
          ),
      );

      selected_values_6 = filteredSelectedValue.map((item: any) => ({
        id: item.value_id || "",
        label: item.label || "",
        category: item.category || "",
        rationale: item.rationale || "",
      }));
    }

    let selected_tobe_4;
    if (desireOrganization && selectedDesireOrganization) {
      selected_tobe_4 = selectedDesireOrganization.map((e: any) => {
        const [value_id, desire] = e.split("_");
        const desireObj = desireOrganization.find(
          (v: any) => v.value_id === value_id,
        );
        const desireTobe: any | null =
          desireObj?.desire_1.desire === desire
            ? desireObj.desire_1
            : desireObj?.desire_2.desire === desire
              ? desireObj.desire_2
              : null;
        return {
          id: desireObj?.value_id,
          value_id: desireObj?.value_id,
          value_label: desireObj?.value_label,
          desire: desireTobe?.desire,
          old_assumption: desireTobe?.tobe.old_assumption,
          new_assumption: desireTobe?.tobe.new_assumption,
          judgment: desireTobe?.tobe.judgment,
          action: desireTobe?.tobe.action,
        };
      });
    }

    return NextResponse.json(
      {
        message: "Success",
        selected_values_6,
        own_lp_summary,
        competitors_summary,
        selected_tobe_4,
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
