import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { checkValidity } from "../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, desireOrganization, selectedDesireOrganization } =
      await req.json();

    const { valid, userId } = await checkValidity({
      sessionId,
      expectedStep: 6,
    });
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
        valueOrganizationsNew: true,
        planning_what: {
          select: {
            selected_value_organization: true,
            selected_competitor_matrix: true,
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

    let selected_values_6;
    if (
      pdcaSession.valueOrganizationsNew &&
      pdcaSession.planning_what?.selected_value_organization
    ) {
      console.log(pdcaSession.valueOrganizationsNew);

      const filteredSelectedValue = (
        pdcaSession.valueOrganizationsNew.value_organizations as any[]
      )?.filter((vo) =>
        pdcaSession.planning_what?.selected_value_organization.includes(
          vo.id || "",
        ),
      );

      selected_values_6 = filteredSelectedValue.map((item) => ({
        id: item.id || "",
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
        user_id: userId,
        pdca_session_id: sessionId,
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
