import { NextRequest, NextResponse } from 'next/server';
import { checkPageStep } from '../../utils/checkPageStep';
import callAppV2Api from '@/config/axios/axiosAppV2';
import { prisma } from '@/config/prisma/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, budget } = body;

    const checkResult: { valid: boolean; response?: NextResponse } = await checkPageStep(sessionId, 'how', 1);
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const creativeBrief = await prisma.creativeBrief.findUnique({
      where: { planningSessionId: sessionId },
    });

    const { data } = await callAppV2Api.post('/v1/video-tests/plan', {
      monthly_budget: budget,
      currency: 'JPY',
      test_term_weeks: 4,
      strong_points: creativeBrief?.strongPoints || ['string'],
      provider: 'openai',
      language: 'en',
    });

    const templatesCreatomate = [
      {
        template_id: '6f8e118a-703d-4b94-8534-96a2b7be7d62',
        video_url: 'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/97e84c70-0848-4ec8-b87b-085d29bd23de.mp4',
        snapshot_url: 'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/97e84c70-0848-4ec8-b87b-085d29bd23de-snapshot.jpg',
      },
      {
        template_id: 'ca63102c-c78f-43c9-98d6-1c718dfe6ed1',
        video_url: 'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/0e64eec6-c992-4a1a-b3d5-607a8bf0baf2.mp4',
        snapshot_url: 'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/0e64eec6-c992-4a1a-b3d5-607a8bf0baf2-snapshot.jpg',
      },
      {
        template_id: 'f9a7fdef-4311-4b0c-942a-6f3f00a353dd',
        video_url: 'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/adaf202c-c0ac-4886-832c-148f9cf70f9d.mp4',
        snapshot_url: 'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/adaf202c-c0ac-4886-832c-148f9cf70f9d-snapshot.jpg',
      },
    ];

    return NextResponse.json({ message: 'Success', data: { plan: data.plan, templates: templatesCreatomate } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
