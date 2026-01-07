import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pdca = await prisma.pDCA.create({
      data: {
        id: crypto.randomUUID(),
        userId: user?.id!,
      },
    });

    const pdcaSession = await prisma.pDCASession.create({
      data: {
        id: `${pdca.id}_pdca-1`,
        pdca_id: pdca.id,
        lastPage: page,
      },
    });

    return NextResponse.json(
      { message: "Session created", session_id: pdcaSession.id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
