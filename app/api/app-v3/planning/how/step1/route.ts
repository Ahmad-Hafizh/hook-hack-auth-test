import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import callAppV2Api from "@/config/axios/axiosAppV2";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, duration, communicationStyle, pointOfView } = body;

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        isChoosingSpeed: true,
        planning_what: {
          select: {
            product: true,
          },
        },
      },
    });

    if (pdcaSession?.isChoosingSpeed) {
      await prisma.planningHow.upsert({
        where: { pdca_session_id: sessionId },
        update: {
          video_duration: duration,
          point_of_view: pointOfView,
          tone: communicationStyle,
        },
        create: {
          pdca_session_id: sessionId,
          video_duration: duration,
          point_of_view: pointOfView,
          tone: communicationStyle,
        },
      });

      const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
        mode: "instant",
        provider: "gemini",
        product_name: pdcaSession?.planning_what?.product
          ?.replace(/https?:\/\//, "")
          .split("/")[0],
        // product_name: "eslclub.jp",
        url: pdcaSession?.planning_what?.product?.startsWith("http")
          ? pdcaSession?.planning_what?.product
          : `https://${pdcaSession?.planning_what?.product}`,
        // url: "https://eslclub.jp",
        video_length: `${duration}s`,
        layout: "horizontal",
        language: "ja",
        thinking_level: "low",
        context: "英会話スクールのLPから要点を抽出",
      });

      await prisma.planningHow.update({
        where: { pdca_session_id: sessionId },
        data: {
          job_id_variant: data.job_id,
        },
      });

      return NextResponse.json(
        {
          message: "Success",
          job_id: data.job_id,
        },
        { status: 200 },
      );
    } else {
      const session = await prisma.pDCASession.findUnique({
        where: { id: sessionId },
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

      await prisma.planningHow.upsert({
        where: { pdca_session_id: sessionId },
        update: {
          video_duration: duration,
          tone: communicationStyle,
          point_of_view: pointOfView,
        },
        create: {
          pdca_session_id: sessionId,
          video_duration: duration,
          tone: communicationStyle,
          point_of_view: pointOfView,
        },
      });

      if (
        !session ||
        !session.planning_what ||
        !session.desireOrganizationsNew ||
        !session.valueOrganizationsNew ||
        !session.competitiveMatrixesNew ||
        !session.positioningPatternsNew
      ) {
        return NextResponse.json(
          { error: "Session or related data not found" },
          { status: 404 },
        );
      }

      const positioning_pattern = (
        session.positioningPatternsNew?.positioning_patterns as {
          one_liner: string;
          functional_value: { quadrant: string; quadrant_value: string }[];
          emotional_value: { quadrant: string; quadrant_value: string }[];
          pattern_number: number;
          pattern_label: string;
        }[]
      ).filter(
        (item: any) =>
          Number(session.planning_what?.selected_positioning_patterns) ===
          Number(item.pattern_number),
      )?.[0];

      const competitive_matrix = (
        session.planning_what?.selected_competitor_matrix === "user"
          ? session.competitiveMatrixesNew?.user
          : session.competitiveMatrixesNew?.suggestion
      ) as {
        key_message?: string;
        strong_points?: string[];
        key_message_tags?: string[];
        strong_points_tagged?: string[];
        cta?: string;
      };

      const own_lp_summary = `${competitive_matrix?.key_message || ""}, ${(competitive_matrix?.strong_points || []).join(", ")}`;

      const competitors_summary =
        (session.competitiveMatrixesNew?.competitor as any[])?.map(
          (c: any) => `${c.key_message}, ${(c.strong_points || []).join(", ")}`,
        ) || [];
      const selected_values = (
        session.valueOrganizationsNew?.value_organizations as any[]
      )
        .filter((item) =>
          session.planning_what?.selected_value_organization.includes(
            item.id || "",
          ),
        )
        .map((item) => {
          return {
            id: item.id || "",
            category: item.category || "",
            label: item.label || "",
            rationale: item.rationale || "",
          };
        });

      const selected_tobes = (
        session.desireOrganizationsNew?.desire_organizations as any[]
      ).flatMap((item: any) => {
        const results: any[] = [];
        const firstdesireId = `${item.value_id}_${item.desire_1?.desire as string}`;
        const seconddesireId = `${item.value_id}_${item.desire_2?.desire as string}`;

        if (
          session.planning_what?.selected_desire_tobe_organization.includes(
            firstdesireId,
          )
        ) {
          results.push({
            id: firstdesireId,
            value_id: item.value_id,
            value_label: item.value_label,
            desire: item.desire_1.desire,
            old_assumption: item.desire_1.tobe.old_assumption,
            new_assumption: item.desire_1.tobe.new_assumption,
            judgment: item.desire_1.tobe.judgment,
            action: item.desire_1.tobe.action,
          });
        }
        if (
          session.planning_what?.selected_desire_tobe_organization.includes(
            seconddesireId,
          )
        ) {
          results.push({
            id: seconddesireId,
            value_id: item.value_id,
            value_label: item.value_label,
            desire: item.desire_2.desire,
            old_assumption: item.desire_2.tobe.old_assumption,
            new_assumption: item.desire_2.tobe.new_assumption,
            judgment: item.desire_2.tobe.judgment,
            action: item.desire_2.tobe.action,
          });
        }
        return results;
      });

      const qualityPayload = {
        mode: "quality",

        video_length: `${duration}s`,
        layout: "horizontal",
        commucation_style: communicationStyle,
        point_of_view: pointOfView,
        thinking_level: "low",
        provider: "gemini",
        language: "ja",

        own_lp_summary,
        competitors_summary,

        key_message: competitive_matrix?.key_message || "",
        strong_points: competitive_matrix?.strong_points || [],

        key_message_tags: competitive_matrix?.key_message_tags || {},
        strong_points_tagged: competitive_matrix?.strong_points_tagged || [],

        cta: competitive_matrix?.cta || "",
        selected_values: selected_values || [],
        selected_tobes: selected_tobes || [],
        selected_tobe_4: selected_tobes || [],
        positioning_pattern: positioning_pattern || {},
        positioning_final: positioning_pattern || {},
        one_line_promises: { one_liner: positioning_pattern?.one_liner || "" },
      };

      const { data } = await callAppV2Api.post(
        "/v1/video/main-content/async",
        qualityPayload,
      );

      await prisma.planningHow.update({
        where: { pdca_session_id: sessionId },
        data: {
          job_id_variant: data.job_id,
        },
      });

      return NextResponse.json(
        {
          message: "Success",
          job_id: data.job_id,
        },
        { status: 200 },
      );
    }
  } catch (error: any) {
    console.error(
      "Step1 error:",
      error?.response?.data || error?.message || error,
    );
    const status = error?.response?.status || 500;
    const detail = error?.response?.data || error?.message || "Error";
    return NextResponse.json({ error: detail }, { status });
  }
}
