import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../utils/getUser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      sessionId,
      logo,
      orientation,
      background_color,
      background_image,
      font,
      background_music,
      voice_over,
    } = body;

    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated", redirect: "/login" },
        { status: 401 },
      );
    }

    const pDCASession = await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        planning_how: {
          update: {
            logo: logo,
            orientation: orientation,
            background_color: background_color,
            background_image: background_image,
            font: font,
            background_music: background_music,
            voice_over: voice_over,
          },
        },
      },
      select: {
        planning_how: {
          select: {
            video_duration: true,
          },
        },
        renderedVideos: true,
      },
    });

    const dataRowFinalized = await prisma.dataRowFinalizedNew.findUnique({
      where: { pdca_session_id: sessionId },
    });

    const TEMPLATE_IDS = {
      "30s_horizontal": "92826a71-48e8-41fb-8064-4c2c5639900c",
      "30s_vertical": "ef56a422-52b2-4e89-93e8-e32517c8981b",
      "15s_horizontal": "c894b6c5-7dad-4cf0-a247-a11ecf3cd033",
      "15s_vertical": "2a42ff4d-3271-454a-8d08-203c8db719fd",
    };

    const getTemplateId = (): string => {
      const key =
        `${pDCASession.planning_how?.video_duration}s_${orientation}` as keyof typeof TEMPLATE_IDS;
      return TEMPLATE_IDS[key] || TEMPLATE_IDS["30s_horizontal"];
    };

    const generateModifications = (row: any) => {
      const is30s = pDCASession.planning_how?.video_duration === 30;
      const fontFamily = font || "Kiwi Maru";
      const bgColorHex = background_color ? `#${background_color}` : "#FFFFFF";
      const bgColorRgba = background_color
        ? `rgba(${parseInt(background_color.slice(0, 2), 16)},${parseInt(background_color.slice(2, 4), 16)},${parseInt(background_color.slice(4, 6), 16)},1)`
        : "rgba(255,255,255,1)";

      // Base modifications (15s + 30s common)
      const baseModifications: Record<string, string | null> = {
        // Background / Common
        "Back-ground-color(CTA).fill_color": bgColorHex,
        "Background-image.source": background_image || null,
        "Back-ground-color(Hook).fill_color": bgColorRgba,
        "Logo.source": logo || "",
        "BGM.source": background_music || "",

        // Hook
        "Hook(image).source": row?.hookImage || "",
        "Hook(text)-1.text": row?.hookPart1 || "",
        "Hook(text)-1.font_family": fontFamily,
        "Hook(text)-1_audio.source": "",

        // BodyA
        "BodyA(image)-1.source": row?.body1Image || "",
        "BodyA(text)-1.text": row?.body1Part1 || "",
        "BodyA(text)-1.font_family": fontFamily,
        "BodyA(text)-1.background_color": null,
        "BodyA(text)-1_audio.source": "",

        // BodyB
        "BodyB(image)-1.source": row?.body2Image || "",
        "BodyB(text)-1.text": row?.body2Part1 || "",
        "BodyB(text)-1.font_family": fontFamily,
        "BodyB(text)-1.background_color": null,
        "BodyB(text)-1_audio.source": "",

        // CTA
        "CTA(text)-1.text": row?.ctaPart1 || "",
        "CTA(text)-1.font_family": fontFamily,
        "CTA(text)-1_audio.source": "",

        // Same-image references
        "Same-image-as-BodyA(image)-1.source":
          row?.body1ImageB || row?.body1Image || "",
        "Same-image-as-BodyA(image)-2.source":
          row?.body2ImageB || row?.body2Image || "",
        "Same-image-as-Hook(image).source": row?.hookImage || "",
      };

      // Additional modifications for 30s videos (includes -2 elements)
      if (is30s) {
        Object.assign(baseModifications, {
          // Hook -2
          "Hook(text)-2.text": row?.hookPart2 || "",
          "Hook(text)-2.font_family": fontFamily,
          "Hook(text)-2_audio.source": "",

          // BodyA -2
          "BodyA(image)-2.source": row?.body1ImageB || "",
          "BodyA(text)-2.text": row?.body1Part2 || "",
          "BodyA(text)-2.font_family": fontFamily,
          "BodyA(text)-2.font_size": "5 vmin",
          "BodyA(text)-2.background_color": null,
          "BodyA(text)-2_audio.source": "",

          // BodyB -2
          "BodyB(image)-2.source": row?.body2ImageB || "",
          "BodyB(text)-2.text": row?.body2Part2 || "",
          "BodyB(text)-2.font_family": fontFamily,
          "BodyB(text)-2.background_color": null,
          "BodyB(text)-2_audio.source": "",

          // CTA -2
          "CTA(text)-2.text": row?.ctaPart2 || "",
          "CTA(text)-2.font_family": fontFamily,
          "CTA(text)-2_audio.source": "",
        });
      }

      return baseModifications;
    };

    // Get finalized rows from new schema
    const finalizedRows = (dataRowFinalized as any)?.data_rows_finalized || [];

    if (!finalizedRows.length) {
      throw new Error("No finalized data rows found");
    }

    if (pDCASession.renderedVideos.length > 0) {
      await prisma.renderedVideo.deleteMany({
        where: {
          pdca_session_id: sessionId,
        },
      });
    }

    // Map each finalized row to a render
    const renders = (finalizedRows as any[]).map((row: any) => ({
      template_id: getTemplateId(),
      modifications: generateModifications(row),
      voice_id: voice_over || "JBFqnCBsd6RMkjVDRZzb",
      video_format: orientation || "vertical",
      video_length: `${pDCASession?.planning_how?.video_duration}s` || "30s",
      enable_audio: true,
      audio_max_duration:
        pDCASession?.planning_how?.video_duration === 15 ? 18.0 : 34.0,
    }));

    const { data, status } = await callAppV2Api.post(
      "/v1/creatomate/raw-renders",
      {
        renders,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": user.userDbId,
          "X-PDCA-Session-ID": sessionId,
        },
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

    await prisma.pDCASession.update({
      where: { id: sessionId },
      data: {
        status: "completed",
      },
    });

    return NextResponse.json(
      { message: "Success", job_id: data?.job_id, renders },
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
