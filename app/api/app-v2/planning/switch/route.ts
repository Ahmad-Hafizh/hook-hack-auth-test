import { prisma } from '@/config/prisma/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    return new Response('Planning Switch API is running', { status: 200 });
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, page } = body;

    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const session = await prisma.planningSession.create({
      data: {
        userId,
        lastPage: page || 'what_scratch',
        lastStep: 1,
        product,
      },
    });

    return NextResponse.json({ message: 'Session created', sessionId: session.id }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
