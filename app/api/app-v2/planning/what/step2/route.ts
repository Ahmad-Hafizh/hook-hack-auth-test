import callAppV2Api from '@/config/axios/axiosAppV2';
import { prisma } from '@/config/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkPageStep } from '../../utils/checkPageStep';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, keywords } = body;

    const checkResult: { valid: boolean; response?: NextResponse } = await checkPageStep(sessionId, 'what_scratch', 2);
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const { data } = await callAppV2Api.post('/v1/websites', {
      keywords,
      limit: 5,
    });

    const { data: visuals } = await callAppV2Api.post('/v1/websites/screenshot', {
      urls: data.websites.map((website: any) => website.url),
    });

    await prisma.planningSession.update({
      where: { id: sessionId },
      data: {
        lastStep: 3,
      },
    });

    return NextResponse.json({ message: 'Success', visuals }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
