import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/signup", "/password-reset"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refreshToken")?.value;
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!token && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (
    token &&
    (pathname === "/" ||
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/password-reset")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/password-reset",
    "/dashboard/:path*",
    "/users/:path*",
    "/leads/:path*",
    "/tasks/:path*",
    "/reports/:path*",
    "/audit-log/:path*",
    "/settings/:path*",
  ],
};