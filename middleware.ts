// src/middleware.ts or ./middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define which routes are public and do not require authentication
  const isPublicRoute = ["/"].includes(pathname);

  const isAuthRoute = pathname.startsWith("/auth");

  // If the path is public, proceed without auth checks
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Create response to pass to supabase client
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isAuthRoute) {
    return response;
  } else if (!user && !isPublicRoute && !isAuthRoute) {
    const redirectUrl = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(redirectUrl);
  } else if (user && isAuthRoute) {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - anything else you want to exclude (e.g. /public folder assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$).*)",
  ],
};
