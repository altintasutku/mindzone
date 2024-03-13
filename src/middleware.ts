import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && req.nextUrl.pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/register", req.nextUrl));
  } else if (
    token &&
    ((req.nextUrl.pathname === "/" &&
      req.nextUrl.searchParams.get("nav") !== "true") ||
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export { default } from 'next-auth/middleware'

export const config = {
  api: {
    bodyParser: false,
  },
} as const;