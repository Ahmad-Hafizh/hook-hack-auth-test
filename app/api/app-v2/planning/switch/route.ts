import { prisma } from '@/config/prisma/prisma';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { page, access_token } = body;

    const { data } = await supabase.auth.getUser(access_token);

    const user = await prisma.user.findUnique({
      where: { userId: data.user?.id! },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const session = await prisma.planningSession.create({
      data: {
        lastPage: page || 'what_scratch',
        lastStep: 1,
        userId: user?.id!,
      },
    });

    return NextResponse.json({ message: 'Session created', sessionId: session.id }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
