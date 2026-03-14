"use client";

import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

export default function AuditLogPage() {
  return (
    <PermissionGate
      permission={PERMISSIONS.AUDIT_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Audit Log.</p>}
    >
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Audit Log</h1>
        <p className="text-sm text-slate-600">
          Review all security-sensitive actions across the platform.
        </p>
      </section>
    </PermissionGate>
  );
}