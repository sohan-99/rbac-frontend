"use client";

import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

export default function LeadsPage() {
  return (
    <PermissionGate
      permission={PERMISSIONS.LEADS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Leads.</p>}
    >
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
        <p className="text-sm text-slate-600">Track and update lead pipeline data.</p>
      </section>
    </PermissionGate>
  );
}