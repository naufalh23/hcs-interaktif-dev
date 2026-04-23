import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const payload = token ? await verifyJWT(token) : null;

  // Protect /admin -> hanya ADMIN
  if (pathname.startsWith("/admin")) {
    if (!payload) return NextResponse.redirect(new URL("/login", req.url));
    if (payload.role !== "ADMIN")
      return NextResponse.redirect(new URL("/content-manage", req.url));
  }

  // Protect /content-manage -> USER & ADMIN
  if (pathname.startsWith("/content-manage")) {
    if (!payload) return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect jika sudah login saat akses /login
  if (pathname === "/login" && payload) {
    const target = payload.role === "ADMIN" ? "/admin" : "/content-manage";
    return NextResponse.redirect(new URL(target, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/content-manage/:path*", "/login"],
};