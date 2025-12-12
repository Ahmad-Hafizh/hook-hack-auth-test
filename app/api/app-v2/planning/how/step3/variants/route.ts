import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, job_id } = body;

    const { data } = await callAppV2Api.get(
      `/v1/video/main-content/async/${job_id}`
    );

    if (data.status == "done") {
      const templatesCreatomateModification = [
        {
          template_id: "6f8e118a-703d-4b94-8534-96a2b7be7d62",
          images: {
            logo: "https://creatomate.com/files/assets/00e591b1-a5fe-4bd1-9bd9-2cdb153f2815",
            strong_point_3:
              "https://creatomate.com/files/assets/1bef6dab-2715-45af-a1ae-e90419d45602",
            strong_point_2:
              "https://creatomate.com/files/assets/6917ecf0-b3a9-4b33-a1c7-15a9311e7b01",
            strong_point_1:
              "https://creatomate.com/files/assets/362b4df1-ce41-4734-93af-ecf66c03ce83",
            background_music:
              "https://creatomate.com/files/assets/117e3505-bef8-41a8-a899-2b4423d36b95",
          },
        },
        {
          template_id: "ca63102c-c78f-43c9-98d6-1c718dfe6ed1",
          images: {
            logo: "https://creatomate.com/files/assets/bdda27db-4b19-49e0-a225-3c9f2aef86dd",
            strong_point_3:
              "https://creatomate.com/files/assets/07cc4791-65e0-4465-b35f-f269d9f09471",
            strong_point_2:
              "https://creatomate.com/files/assets/7247814a-5b26-4e5e-a3d3-6432a807e865",
            strong_point_1:
              "https://creatomate.com/files/assets/b72b689d-732b-4548-bbd4-4daa31ad0136",
            background_music:
              "https://creatomate.com/files/assets/744d800a-221f-475e-a12a-3523a70756c4",
          },
        },
        {
          template_id: "f9a7fdef-4311-4b0c-942a-6f3f00a353dd",
          images: {
            strong_point_3:
              "https://creatomate.com/files/assets/e970eb78-4392-4a92-9d05-5bc15faef826",
            strong_point_2:
              "https://creatomate.com/files/assets/ae60778b-6206-4482-8fec-f852950613b4",
            strong_point_1:
              "https://creatomate.com/files/assets/82f444bc-b767-47f3-a14c-1a8065a2c0ca",
            logo: "https://creatomate.com/files/assets/cb997f73-277c-47d8-8688-ea0e6462761d",
            background_music:
              "https://creatomate.com/files/assets/7f091315-a1eb-4b81-b564-88362b984ce9",
          },
        },
      ];

      const session = await prisma.planningSession.findUnique({
        where: { id: sessionId },
        select: {
          planningPlans: {
            select: {
              template_id: true,
            },
          },
        },
      });

      const selectedTemplateData = templatesCreatomateModification.find(
        (t) => t.template_id === session?.planningPlans?.template_id
      );
      const { variants } = data.result;
      const {
        hooks,
        strong_point_1_messages,
        strong_point_2_messages,
        strong_point_3_messages,
        ctas,
      } = variants;

      await prisma.planningVariants.upsert({
        where: { planningSessionId: sessionId },
        update: {
          hooks,
          bodyA_messages: strong_point_1_messages,
          bodyB_messages: strong_point_2_messages,
          bodyC_messages: strong_point_3_messages,
          ctas,
        },
        create: {
          planningSessionId: sessionId,
          hooks,
          bodyA_messages: strong_point_1_messages,
          bodyB_messages: strong_point_2_messages,
          bodyC_messages: strong_point_3_messages,
          ctas,
        },
      });

      return NextResponse.json(
        {
          message: "Success",
          status: "done",
          variants: {
            hooks: hooks,
            strong_point_1_messages: strong_point_1_messages,
            strong_point_2_messages: strong_point_2_messages,
            strong_point_3_messages: strong_point_3_messages,
            ctas: ctas,
            strong_point_1_images: selectedTemplateData?.images.strong_point_1
              ? [selectedTemplateData.images.strong_point_1]
              : [],
            strong_point_2_images: selectedTemplateData?.images.strong_point_2
              ? [selectedTemplateData.images.strong_point_2]
              : [],
            strong_point_3_images: selectedTemplateData?.images.strong_point_3
              ? [selectedTemplateData.images.strong_point_3]
              : [],
            background_music: selectedTemplateData?.images.background_music
              ? [selectedTemplateData.images.background_music]
              : [],
            brand_logo: selectedTemplateData?.images.logo || "",
          },
        },
        { status: 200 }
      );
    } else if (data.status == "running") {
      return NextResponse.json(
        { message: "data is fetching...", status: "running" },
        { status: 202 }
      );
    } else {
      return NextResponse.json(
        { message: "Error in job processing", status: "error" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error", status: "error" },
      { status: 500 }
    );
  }
}
