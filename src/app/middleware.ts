import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn   = !!req.auth;
  const isAuthPage   = req.nextUrl.pathname === "/contentmanage/login";
  const isManagePage = req.nextUrl.pathname.startsWith("/contentmanage");

  if (isManagePage && !isAuthPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/contentmanage/login", req.url));
  }
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/contentmanage", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/contentmanage/:path*"],
};