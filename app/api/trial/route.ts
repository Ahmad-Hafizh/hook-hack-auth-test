import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { z } from "zod";

const TrialSchema = z.object({
  company_name: z.string().min(1, "会社名は必須です"),
  name: z.string().min(1, "お名前は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  tiktok_url: z.string().url("正しいURLを入力してください"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = TrialSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { company_name, name, email, tiktok_url } = parsed.data;
    await prisma.requestlist.create({
      data: {
        company_name,
        name,
        email,
        tiktok_url,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
