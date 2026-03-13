export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",
  USERS_VIEW: "users.view",
  USERS_CREATE: "users.create",
  LEADS_VIEW: "leads.view",
  TASKS_VIEW: "tasks.view",
  REPORTS_VIEW: "reports.view",
  AUDIT_VIEW: "audit.view",
  SETTINGS_VIEW: "settings.view",
} as const;

export type PermissionKey =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];