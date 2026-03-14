"use client";

import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

export default function ReportsPage() {
  return (
    <PermissionGate
      permission={PERMISSIONS.REPORTS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Reports.</p>}
    >
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-600">
          View performance and operational analytics.
        </p>
      </section>
    </PermissionGate>
  );
}