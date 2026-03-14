import { PERMISSIONS } from "@/constants/permissions";

const ROUTE_BY_PERMISSION: Array<{ permission: string; path: string }> = [
  { permission: PERMISSIONS.DASHBOARD_VIEW, path: "/dashboard" },
  { permission: PERMISSIONS.USERS_VIEW, path: "/users" },
  { permission: PERMISSIONS.LEADS_VIEW, path: "/leads" },
  { permission: PERMISSIONS.TASKS_VIEW, path: "/tasks" },
  { permission: PERMISSIONS.REPORTS_VIEW, path: "/reports" },
  { permission: PERMISSIONS.AUDIT_VIEW, path: "/audit-log" },
  { permission: PERMISSIONS.SETTINGS_VIEW, path: "/settings" },
  { permission: PERMISSIONS.PORTAL_VIEW, path: "/portal" },
];

export function resolveLandingPath(permissions: string[]): string {
  const match = ROUTE_BY_PERMISSION.find((item) => permissions.includes(item.permission));
  return match?.path ?? "/portal";
}
