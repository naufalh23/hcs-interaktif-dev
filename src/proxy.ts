import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/contentmanage/login")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    // Auto detect secure cookie berdasarkan protokol request
    secureCookie: req.nextUrl.protocol === "https:",
  });

  if (!token) {
    return NextResponse.redirect(new URL("/contentmanage/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contentmanage/:path*", "/contentmanage"],
};