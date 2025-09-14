import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Define paths that don't require authentication
const publicPaths = [
  "/auth/signin",
  "/auth/error",
  "/login",
  // '/',
  '/signup',
  '/verifyemail',
  /^\/report\/[^/]+$/, // Matches /report/<id> where <id> can be any string
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) =>
    typeof path === "string" ? path === pathname : path.test(pathname)
  );

  // If the path is public, then return next and allow the request to continue
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = await getToken({ req: request });


  // If the path is not public, then check for authentication token and if not found, then redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the path is not public and the authentication token is found, then allow the request to continue
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\..*|api/auth).*)",
    '/auth/signin',
    '/auth/error',
    '/login',
    '/',
    '/signup',
    '/verifyemail',
  ],
};