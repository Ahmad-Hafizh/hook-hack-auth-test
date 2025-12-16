// src/middleware.ts or ./middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define which routes are public and do not require authentication
  const isPublicRoute = ["/"].includes(pathname);

  const isAuthRoute = pathname.startsWith("/auth");

  // If the path is public, proceed without auth checks
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isAuthRoute) {
    return NextResponse.next();
  } else if (!user && !isPublicRoute && !isAuthRoute) {
    const redirectUrl = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(redirectUrl);
  } else if (user && isAuthRoute) {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
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
