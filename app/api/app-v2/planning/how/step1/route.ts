import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import callAppV2Api from "@/config/axios/axiosAppV2";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, duration } = body;

    const session = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_how: {
          upsert: {
            update: {
              video_duration: duration,
            },
            create: {
              video_duration: duration,
            },
          },
        },
      },
      select: {
        planning_what: {
          select: {
            selected_competitor_matrix: true,
            selected_desire_tobe_organization: true,
            selected_value_organization: true,
            selected_positioning_patterns: true,
          },
        },
        desireOrganizationsNew: true,
        valueOrganizationsNew: true,
        competitiveMatrixesNew: true,
        positioningPatternsNew: true,
      },
    });

    const positioningPatternsData = ((session.positioningPatternsNew as any)?.[0]?.positioning_patterns as any[]) || [];
    const positioning_pattern = positioningPatternsData.filter(
      (item: any) =>
        session.planning_what?.selected_positioning_patterns ===
        item.pattern_number,
    )[0];

    const competitiveMatrix = (session.competitiveMatrixesNew as any)?.[0];
    const competitive_matrix = (
      session.planning_what?.selected_competitor_matrix === "user"
        ? competitiveMatrix?.user
        : competitiveMatrix?.suggestion
    ) as
      | {
          key_message?: string;
          strong_points?: string[];
          key_message_tags?: string[];
          strong_points_tagged?: string[];
        }
      | undefined;

    const valueOrganizationsData = ((session.valueOrganizationsNew as any)?.[0]?.value_organizations as any[]) || [];
    const selected_values = valueOrganizationsData
      .filter((item: any) =>
        session.planning_what?.selected_value_organization.includes(
          item.value_id || "",
        ),
      )
      .map((item: any) => {
        return {
          id: item.value_id || "",
          category: item.category || "",
          label: item.label || "",
          rationale: item.rationale || "",
        };
      });

    const desireOrganizationsData = ((session.desireOrganizationsNew as any)?.[0]?.desire_organizations as any[]) || [];
    const selected_tobes = desireOrganizationsData
      .map((item: any) => {
        const firstdesireId = `${item.value_id}_${item.desire_1?.desire as string}`;
        const seconddesireId = `${item.value_id}_${item.desire_2?.desire as string}`;

        if (
          session.planning_what?.selected_desire_tobe_organization.includes(
            firstdesireId,
          )
        ) {
          return {
            id: firstdesireId,
            value_id: item.value_id,
            value_label: item.value_label,
            desire: item.desire_1.desire,
            old_assumption: item.desire_1.tobe.old_assumption,
            new_assumption: item.desire_1.tobe.new_assumption,
            judgment: item.desire_1.tobe.judgment,
            action: item.desire_1.tobe.action,
          };
        } else if (
          session.planning_what?.selected_desire_tobe_organization.includes(
            seconddesireId,
          )
        ) {
          return {
            id: seconddesireId,
            value_id: item.value_id,
            value_label: item.value_label,
            desire: item.desire_2.desire,
            old_assumption: item.desire_2.tobe.old_assumption,
            new_assumption: item.desire_2.tobe.new_assumption,
            judgment: item.desire_2.tobe.judgment,
            action: item.desire_2.tobe.action,
          };
        }
        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
      key_message: competitive_matrix?.key_message || "",
      strong_points: competitive_matrix?.strong_points || [],
      key_message_tags: competitive_matrix?.key_message_tags || [],
      strong_points_tagged: competitive_matrix?.strong_points_tagged || [],
      video_length: `${duration}s`,
      layout: "vertical",
      provider: "openai",
      thinking_level: "low",
      language: "ja",
      selected_values: selected_values || [],
      selected_tobes: selected_tobes || [],
      positioning_pattern: positioning_pattern || {},
    });

    return NextResponse.json(
      {
        message: "Success",
        job_id: data.job_id,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error || "Error" }, { status: 500 });
  }
}
