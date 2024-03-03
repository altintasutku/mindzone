import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  return NextResponse.next();

  //TODO

  const token = await getToken({ req });

  // this is comming from lazygit

  if (!token) {
    return NextResponse.redirect(new URL("/register", req.nextUrl));
  }
}
