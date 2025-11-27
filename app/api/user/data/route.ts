import { prisma } from '@/prisma/seed';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({
      where: { userId: userId },
    });

    // if (!user) {
    //   await prisma.user.create({
    //     data: { userId: userId },
    //   });
    // }

    return new Response(JSON.stringify({ message: 'User data route is working!' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), {
      status: 500,
    });
  }
}
