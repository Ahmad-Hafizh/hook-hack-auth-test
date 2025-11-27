import callAppV2Api from '@/config/axios/axiosAppV2';
import { prisma } from '@/config/prisma/prisma';
import { NextResponse } from 'next/server';
import { checkPageStep } from '../../utils/checkPageStep';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, template_id } = body;

    const checkResult: { valid: boolean; response?: NextResponse } = await checkPageStep(sessionId, 'how', 2);
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const creativeBrief = await prisma.creativeBrief.findUnique({
      where: { planningSessionId: sessionId },
    });

    const { data } = await callAppV2Api.post('/v1/video/main-content', {
      key_message: creativeBrief?.keyMessages || 'string',
      strong_points: creativeBrief?.strongPoints || 'string',
      provider: 'openai',
      language: 'en',
    });

    const templatesCreatomateModification = [
      {
        template_id: '6f8e118a-703d-4b94-8534-96a2b7be7d62',
        images: {
          logo: 'https://creatomate.com/files/assets/00e591b1-a5fe-4bd1-9bd9-2cdb153f2815',
          strong_point_3: 'https://creatomate.com/files/assets/1bef6dab-2715-45af-a1ae-e90419d45602',
          strong_point_2: 'https://creatomate.com/files/assets/6917ecf0-b3a9-4b33-a1c7-15a9311e7b01',
          strong_point_1: 'https://creatomate.com/files/assets/362b4df1-ce41-4734-93af-ecf66c03ce83',
          background_music: 'https://creatomate.com/files/assets/117e3505-bef8-41a8-a899-2b4423d36b95',
        },
      },
      {
        template_id: 'ca63102c-c78f-43c9-98d6-1c718dfe6ed1',
        images: {
          logo: 'https://creatomate.com/files/assets/bdda27db-4b19-49e0-a225-3c9f2aef86dd',
          strong_point_3: 'https://creatomate.com/files/assets/07cc4791-65e0-4465-b35f-f269d9f09471',
          strong_point_2: 'https://creatomate.com/files/assets/7247814a-5b26-4e5e-a3d3-6432a807e865',
          strong_point_1: 'https://creatomate.com/files/assets/b72b689d-732b-4548-bbd4-4daa31ad0136',
          background_music: 'https://creatomate.com/files/assets/744d800a-221f-475e-a12a-3523a70756c4',
        },
      },
      {
        template_id: 'f9a7fdef-4311-4b0c-942a-6f3f00a353dd',
        images: {
          strong_point_3: 'https://creatomate.com/files/assets/e970eb78-4392-4a92-9d05-5bc15faef826',
          strong_point_2: 'https://creatomate.com/files/assets/ae60778b-6206-4482-8fec-f852950613b4',
          strong_point_1: 'https://creatomate.com/files/assets/82f444bc-b767-47f3-a14c-1a8065a2c0ca',
          logo: 'https://creatomate.com/files/assets/cb997f73-277c-47d8-8688-ea0e6462761d',
          background_music: 'https://creatomate.com/files/assets/7f091315-a1eb-4b81-b564-88362b984ce9',
        },
      },
    ];

    const selectedTemplateData = templatesCreatomateModification.find((t) => t.template_id === template_id);

    return NextResponse.json(
      {
        message: 'Success',
        data: {
          variants: data.variants,
          templateModification: selectedTemplateData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
