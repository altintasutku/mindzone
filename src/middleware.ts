import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["dashboard", "test", "week", "question", "settings"];

export default async function middleware(request: NextRequest) {
  const isAuthenticated = await getToken({
    req: request,
  });

  const res = NextResponse.next();

  if (
    !isAuthenticated &&
    protectedRoutes.includes(request.nextUrl.pathname.split("/")[1])
  ) {
    console.log("redirecting to login from middleware");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  res.headers.set("next-url", request.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
