import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  const supabaseCookies = allCookies.filter((c) =>
    c.name.startsWith("sb-")
  );

  const cookiesToSet: { name: string; value: string; options: CookieOptions }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            cookiesToSet.push(cookie);
          });
        },
      },
    },
  );

  const { data, error } = await supabase.auth.getUser();

  return NextResponse.json({
    supabaseCookieNames: supabaseCookies.map((c) => ({
      name: c.name,
      valueLength: c.value.length,
      valuePreview: c.value.substring(0, 30) + "...",
    })),
    totalCookies: allCookies.length,
    user: data.user
      ? { id: data.user.id, email: data.user.email }
      : null,
    error: error?.message || null,
    cookiesSetBySupabase: cookiesToSet.map((c) => c.name),
  });
}
