// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract pathname from the request URL
  const { pathname } = request.nextUrl;

  // List of paths that are allowed, feel free to customize this as needed
  const allowedPaths = [
    "/",
    "/admin",
    "/admin/agent-profile",
    "/admin/login",
    "/admin/signup",
    "/admin/signup/reset-password",
    "/contact",
    "/land-transfer",
    "/mortgage-amortization",
    "/mortgage-payment",
  ];
  const dynamicPathsPatterns = [
    /^\/NXYZ[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, // Matches paths starting with /NXYZ
    /^\/PXYZ[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, // Matches paths starting with /PXYZ
    /^\/admin\/signup\/reset-password-client\/[a-zA-Z0-9_-]+$/, // Matches /admin/signup/reset-password-client/abc-123
  ];

  const isAllowed =
    allowedPaths.includes(pathname) ||
    dynamicPathsPatterns.some((pattern) => pattern.test(pathname));

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with the request if it's an allowed path
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico).*)", // Match all paths except for API routes, static files, and Next.js internals
  ],
};
