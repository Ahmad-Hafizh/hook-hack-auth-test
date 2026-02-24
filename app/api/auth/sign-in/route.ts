import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const userInDb = await prisma.user.findUnique({
      where: { email: data.user.email! },
    });

    const serializedUser = userInDb
      ? JSON.parse(
          JSON.stringify(userInDb, (key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          ),
        )
      : null;

    return NextResponse.json(
      {
        message: "Sign in successful!",
        user: serializedUser,
        session: data.session,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "An error occurred during sign in" },
      { status: 500 },
    );
  }
}
