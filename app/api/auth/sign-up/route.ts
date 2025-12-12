import { prisma } from '@/config/prisma/prisma';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    const supabase = await createClient();

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const userInDb = await prisma.user.upsert({
      where: { userId: data.user?.id! },
      update: {},
      create: {
        email: data.user?.email!,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        userId: data.user?.id!,
      },
    });

    // Convert BigInt values to strings for JSON serialization
    const serializedUser = JSON.parse(JSON.stringify(userInDb, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));

    return NextResponse.json(
      {
        message: 'Sign up successful! Please check your email to verify your account.',
        user: serializedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json({ error: 'An error occurred during sign up' }, { status: 500 });
  }
}
