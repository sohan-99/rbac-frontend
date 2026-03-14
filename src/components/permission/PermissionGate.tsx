"use client";

import type { ReactNode } from "react";
import { usePermission } from "@/hooks/usePermission";

type PermissionGateProps = {
  permission: string;
  fallback?: ReactNode;
  children: ReactNode;
};

export function PermissionGate({
  permission,
  fallback = null,
  children,
}: PermissionGateProps) {
  const allowed = usePermission(permission);

  if (allowed === null) {
    return null;
  }

  return allowed ? children : fallback;
}