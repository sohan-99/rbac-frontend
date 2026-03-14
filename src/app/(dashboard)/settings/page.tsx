"use client";

import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

export default function SettingsPage() {
  return (
    <PermissionGate
      permission={PERMISSIONS.SETTINGS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Settings.</p>}
    >
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-600">
          Configure environment and account-level preferences.
        </p>
      </section>
    </PermissionGate>
  );
}