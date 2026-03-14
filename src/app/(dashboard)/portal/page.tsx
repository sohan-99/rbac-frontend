"use client";

import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

export default function PortalPage() {
  return (
    <PermissionGate
      permission={PERMISSIONS.PORTAL_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Portal.</p>}
    >
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">My Portal</h1>
        <p className="text-sm text-slate-600">
          Self-service access for customer users.
        </p>
      </section>
    </PermissionGate>
  );
}
