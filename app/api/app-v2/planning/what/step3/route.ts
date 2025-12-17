import callAppV2Api from '@/config/axios/axiosAppV2';
import { prisma } from '@/config/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkPageStep } from '../../utils/checkPageStep';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, competitors } = body;

    const checkResult: { valid: boolean; response?: NextResponse } = await checkPageStep(sessionId, 'what_scratch', 3);
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const { data: key_message } = await callAppV2Api.post('/v1/key-message', {
      competitors,
      provider: 'openai',
      language: 'en',
      brand_hint: 'string',
      audience: 'string',
      tone: 'professional',
    });

    await prisma.planningSession.update({
      where: { id: sessionId },
      data: {
        lastStep: 4,
        competitors: competitors.map((c: any) => c.url),
      },
    });

    return NextResponse.json({ message: 'Success', key_message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
