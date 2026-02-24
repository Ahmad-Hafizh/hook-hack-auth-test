import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If an OAuth code arrives at the root (Supabase Site URL not set to /auth/callback),
  // redirect to the callback handler to exchange the code for a session.
  if (pathname === "/" && req.nextUrl.searchParams.has("code")) {
    const callbackUrl = new URL("/auth/callback", req.url);
    callbackUrl.search = req.nextUrl.search;
    return NextResponse.redirect(callbackUrl);
  }

  // Let the auth callback through WITHOUT running getUser() —
  // the callback route needs the PKCE code-verifier cookie intact
  // and must not have its request cookies mutated by the middleware.
  if (pathname === "/auth/callback") {
    return NextResponse.next();
  }

  // Define which routes are public and do not require authentication
  const isPublicRoute =
    ["/", "/lpcopy"].includes(pathname) || pathname.startsWith("/app-v2");

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
          // First, update all cookies on the request (for downstream server components)
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value),
          );
          // Create ONE new response with the updated request
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          // Then set ALL cookies on the response (for the browser)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do not run any code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make your application
  // vulnerable to CSRF attacks.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isAuthRoute) {
    return response;
  } else if (!user && !isPublicRoute && !isAuthRoute) {
    const redirectUrl = new URL("/auth/sign-in", req.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    // Carry over any refreshed cookies to the redirect response
    response.headers.getSetCookie().forEach((cookie) => {
      redirectResponse.headers.append("Set-Cookie", cookie);
    });
    return redirectResponse;
  } else if (user && isAuthRoute) {
    const redirectUrl = new URL("/dashboard", req.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    // Carry over any refreshed cookies to the redirect response
    response.headers.getSetCookie().forEach((cookie) => {
      redirectResponse.headers.append("Set-Cookie", cookie);
    });
    return redirectResponse;
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpeg$|.*\\.jpg$|.*\\.gif$|.*\\.webp$|.*\\.mp4$|.*\\.mov$|.*\\.m4v$|.*\\.webm$|.*\\.svg$).*)",
  ],
};
