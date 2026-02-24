import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      sessionId,
      logo,
      bgm,
      gender,
      backgroundColor,
      cta_color,
      voice_id,
      orientation,
      font,
    } = body;

    const pDCASession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_how: {
          update: {
            logo: logo,
            orientation: orientation,
            background_music: bgm,
            voice_over: gender,
            background_color: backgroundColor,
            font: font,
          },
        },
      },
      select: {
        dataRowFinalizedNew: true,
        planning_how: {
          select: {
            video_duration: true,
          },
        },
      },
    });

    const TEMPLATE_IDS = {
      "30s_horizontal": "92826a71-48e8-41fb-8064-4c2c5639900c",
      "30s_vertical": "ef56a422-52b2-4e89-93e8-e32517c8981b",
      "15s_horizontal": "c894b6c5-7dad-4cf0-a247-a11ecf3cd033",
      "15s_vertical": "c894b6c5-7dad-4cf0-a247-a11ecf3cd033",
    };

    const getTemplateId = (): string => {
      const key =
        `${pDCASession.planning_how?.video_duration}s_${orientation}` as keyof typeof TEMPLATE_IDS;
      return TEMPLATE_IDS[key] || TEMPLATE_IDS["30s_horizontal"];
    };

    const generateModifications = (row: any) => {
      const is30s = pDCASession.planning_how?.video_duration === 30;
      const fontFamily = font || "Kiwi Maru";

      // Base modifications (always included)
      const baseModifications: Record<string, string> = {
        // Hook
        "Back-ground-color(Hook).fill_color": backgroundColor || "#FFFFFF",
        "Hook(image).source": row?.hookImage || "",
        "Hook(text)-1.text": row?.hookPart1 || "",
        "Hook(text)-1_audio.source": "",
        "Hook(text)-1.font_family": fontFamily,

        // BodyA
        "BodyA(image)-1.source": row?.body1Image || "",
        "BodyA(text)-1.text": row?.body1Part1 || "",
        "BodyA(text)-1.background_color": "",
        "BodyA(text)-1_audio.source": "",
        "BodyA(text)-1.font_family": fontFamily,

        // BodyB
        "BodyB(image)-1.source": row?.body2Image || "",
        "BodyB(text)-1.text": row?.body2Part1 || "",
        "BodyB(text)-1.background_color": "",
        "BodyB(text)-1_audio.source": "   ",
        "BodyB(text)-1.font_family": fontFamily,

        // CTA
        "CTA(text)-1.text": row?.ctaPart1 || "",
        "CTA(text)-1_audio.source": "",
        "CTA(text)-1.color": "",
        "CTA(text)-1.font_family": fontFamily,

        // Common
        "Same-image-as-BodyA(image)-1.source": row?.body1Image || "",
        "Same-image-as-Hook(image).source": row?.hookImage || "",
        "Logo.source":
          logo ||
          "https://creatomate.com/files/assets/b87431af-d124-4305-b6c2-6320c8e2bf93",
        "BGM.source": bgm || "",
      };

      // Additional modifications for 30s videos (includes -2 elements)
      if (is30s) {
        Object.assign(baseModifications, {
          // Hook -2
          "Hook(text)-2.text": row?.hookPart2 || "",
          "Hook(text)-2_audio.source": "",
          "Hook(text)-2.font_family": fontFamily,

          // BodyA -2
          "BodyA(image)-2.source":
            row?.body1ImageB ||
            "https://creatomate.com/files/assets/a745c91d-2648-4708-8a4f-0ec24adcf8b8",
          "BodyA(text)-2.text": row?.body1Part2 || "",
          "BodyA(text)-2.font_size": "5 vmin",
          "BodyA(text)-2.background_color": "",
          "BodyA(text)-2_audio.source": "   ",
          "BodyA(text)-2.font_family": fontFamily,

          // BodyB -2
          "BodyB(image)-2.source":
            row?.body2ImageB ||
            "https://creatomate.com/files/assets/3f0d08c5-9aa9-47de-91e0-fe39416dbfe2",
          "BodyB(text)-2.text": row?.body2Part2 || "",
          "BodyB(text)-2.background_color": "",
          "BodyB(text)-2_audio.source": "   ",
          "BodyB(text)-2.font_family": fontFamily,

          // CTA -2
          "CTA(text)-2.text": row?.ctaPart2 || "",
          "CTA(text)-2.background_color": "",
          "CTA(text)-2.color": "",
          "CTA(text)-2_audio.source": "",
          "CTA(text)-2.font_family": fontFamily,

          // Additional for 30s
          "Same-image-as-BodyA(image)-2.source": row?.body1Image || "",
        });
      }

      return baseModifications;
    };

    // Map each row's modifications to its render
    const finalizedRows = (pDCASession.dataRowFinalizedNew as any)?.[0]?.data_rows_finalized || [];
    const renders = finalizedRows.map(
      (row: any, index: number) => ({
        template_id: getTemplateId(),
        modifications: generateModifications(row),
        voice_id: voice_id || "lhTvHflPVOqgSWyuWQry", // Fallback to default female voice
        audio_max_duration:
          pDCASession?.planning_how?.video_duration === 15 ? 18.0 : 34.0,
        enable_audio: true,
      }),
    );

    // Submit batch render job
    const { data, status } = await callAppV2Api.post(
      "/v1/creatomate/raw-renders",
      {
        renders,
      },
    );

    if (status !== 200 && status !== 202) {
      throw new Error(`API returned status ${status}`);
    }

    if (!data?.job_id) {
      throw new Error("No job_id returned from API");
    }

    await prisma.planningHow.update({
      where: { pdca_session_id: sessionId },
      data: {
        job_id_render: data.job_id,
      },
    });

    return NextResponse.json(
      { message: "Success", job_id: data?.job_id },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Step 4 Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return NextResponse.json(
      {
        error: error.message,
        details: error.response?.data,
        status: error.response?.status,
      },
      { status: 500 },
    );
  }
}
