import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { PERMISSIONS } from "@/constants/permissions";
import { resolveLandingPath } from "@/lib/route-permissions";

const PUBLIC_PATHS = ["/", "/login", "/signup", "/password-reset"];

const ROUTE_PERMISSIONS: Array<{ prefix: string; permission: string }> = [
  { prefix: "/dashboard", permission: PERMISSIONS.DASHBOARD_VIEW },
  { prefix: "/users", permission: PERMISSIONS.USERS_VIEW },
  { prefix: "/leads", permission: PERMISSIONS.LEADS_VIEW },
  { prefix: "/tasks", permission: PERMISSIONS.TASKS_VIEW },
  { prefix: "/reports", permission: PERMISSIONS.REPORTS_VIEW },
  { prefix: "/audit-log", permission: PERMISSIONS.AUDIT_VIEW },
  { prefix: "/settings", permission: PERMISSIONS.SETTINGS_VIEW },
  { prefix: "/portal", permission: PERMISSIONS.PORTAL_VIEW },
];

type TokenPayload = {
  permissions?: string[];
  exp?: number;
};

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.includes(pathname);
}

function getRequiredPermission(pathname: string): string | null {
  const match = ROUTE_PERMISSIONS.find((route) => pathname.startsWith(route.prefix));
  return match?.permission ?? null;
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

function resolvePermissions(token: string): string[] | null {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return decoded.permissions ?? [];
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refreshToken")?.value;
  const publicPath = isPublicPath(pathname);

  if (!token && !publicPath) {
    return redirectTo(request, "/");
  }

  if (!token) {
    return NextResponse.next();
  }

  const permissions = resolvePermissions(token);
  if (!permissions) {
    if (publicPath) {
      const response = NextResponse.next();
      response.cookies.delete("refreshToken");
      return response;
    }

    const response = redirectTo(request, "/");
    response.cookies.delete("refreshToken");
    return response;
  }

  if (publicPath) {
    return NextResponse.next();
  }

  const requiredPermission = getRequiredPermission(pathname);
  if (requiredPermission && !permissions.includes(requiredPermission)) {
    const fallbackPath = resolveLandingPath(permissions);
    if (fallbackPath === pathname) {
      return NextResponse.next();
    }

    return redirectTo(request, fallbackPath);
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
    "/portal/:path*",
  ],
};