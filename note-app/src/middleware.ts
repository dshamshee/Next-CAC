import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Define paths that don't require authentication
// const publicPaths = [
//   "/auth/signin",
//   "/auth/error",
//   "/login",
//   // "/testing",
//   // '/',
//   '/signup',
//   '/verifyemail',
//   /^\/report\/[^/]+$/, // Matches /report/<id> where <id> can be any string
// ];

export async function middleware(request: NextRequest) {
  const token = await getToken({req: request})
  const url = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/api/auth'];
  const isPublicPath = publicPaths.some(path => url.pathname.startsWith(path));

  // If user is authenticated and tries to access login/signup, redirect to home
  if(token && 
      (
          url.pathname.startsWith('/login') ||
          url.pathname.startsWith('/signup')
      )
  ){
      return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is not authenticated and tries to access protected paths, redirect to login
  if(!token && !isPublicPath){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Allow the request to continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/testing',
    '/addnote',
    // Add other protected routes here as needed
  ],
};