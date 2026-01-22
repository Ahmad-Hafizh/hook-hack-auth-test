import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      },
    );

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      const user = await prisma.user.upsert({
        where: { userId: data.session.user.id },
        update: {},
        create: {
          email: data.session.user.email!,
          firstName: data.session.user.user_metadata.full_name.split(" ")[0],
          lastName: data.session.user.user_metadata.full_name
            .split(" ")
            .slice(1)
            .join(" "),
          userId: data.session.user.id,
        },
      });

      const adsCredential = await prisma.googleAdsCredential.findUnique({
        where: { userId: user.id },
      });

      if (!adsCredential) {
        const { data } = await callAppV2Api.get("/v1/google-ads/oauth-url", {
          headers: {
            "X-User-id": user.id,
          },
        });

        return NextResponse.redirect(data.url);
      }

      // Redirect the user to the next page
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
