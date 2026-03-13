"use client";

import { useAuthStore } from "@/store/authStore";
import { hasPermission } from "@/lib/permissions";

export function usePermission(permission: string) {
  const permissions = useAuthStore((state) => state.user?.permissions ?? []);
  return hasPermission(permissions, permission);
}