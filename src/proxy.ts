import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("[proxy]", { pathname });

  // Biarkan login page selalu lolos
  if (pathname.startsWith("/contentmanage/login")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  console.log("[proxy] token:", !!token);

  // Belum login → ke login page
  if (!token) {
    return NextResponse.redirect(new URL("/contentmanage/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contentmanage/:path*", "/contentmanage"],
};
