"use client";

import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

export default function DashboardPage() {
  return (
    <PermissionGate
      permission={PERMISSIONS.DASHBOARD_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Dashboard.</p>}
    >
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Overview of key system activity and quick actions.
        </p>
      </section>
    </PermissionGate>
  );
}