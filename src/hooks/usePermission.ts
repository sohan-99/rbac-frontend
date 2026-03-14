"use client";

import { useAuthStore } from "@/store/authStore";
import { hasPermission } from "@/lib/permissions";

const EMPTY_PERMISSIONS: string[] = [];

export function usePermission(permission: string) {
  const permissions = useAuthStore((state) => state.user?.permissions);
  const resolvedPermissions = permissions ?? EMPTY_PERMISSIONS;
  return hasPermission(resolvedPermissions, permission);
}