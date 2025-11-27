import { prisma } from '@/config/prisma/prisma';
import { NextResponse } from 'next/server';

export async function checkPageStep(sessionId: string, expectedPage: string, expectedStep: number): Promise<{ valid: boolean; response?: NextResponse }> {
  const isExist = await prisma.planningSession.findUnique({
    where: { id: sessionId },
    select: {
      lastPage: true,
      lastStep: true,
    },
  });

  if (!isExist) {
    return { valid: false, response: NextResponse.json({ error: 'Invalid session state' }, { status: 400 }) };
  }

  if (isExist.lastPage !== expectedPage || isExist.lastStep !== expectedStep) {
    return {
      valid: false,
      response: NextResponse.json(
        {
          error: 'Invalid session state',
          redirect: `${process.env.NEXT_PUBLIC_APP_V2_URL}/planning/${isExist.lastPage?.startsWith('what') ? 'what' : isExist.lastPage}`,
          step: isExist.lastStep,
          page: isExist.lastPage?.split('_')[1] || '',
        },
        { status: 400 }
      ),
    };
  }

  return { valid: true };
}
