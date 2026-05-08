import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/contentmanage/login")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret:       process.env.AUTH_SECRET,
    secureCookie: req.nextUrl.protocol === "https:",
  });

  // Tidak ada token atau token expired (tidak ada id)
  if (!token || !token.id) {
    const loginUrl = new URL("/contentmanage/login", req.url);
    loginUrl.searchParams.set("reason", "expired");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contentmanage/:path*", "/contentmanage"],
};