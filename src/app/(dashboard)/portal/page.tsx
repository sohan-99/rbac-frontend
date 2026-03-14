"use client";

import { useMemo } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";
import { useAuth } from "@/hooks/useAuth";

export default function PortalPage() {
  const { user } = useAuth();

  const joinedDate = useMemo(() => {
    if (!user?.id) {
      return "Unknown";
    }

    return new Date().toLocaleDateString();
  }, [user?.id]);

  return (
    <PermissionGate
      permission={PERMISSIONS.PORTAL_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Portal.</p>}
    >
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2f394b]">My Portal</h1>
          <p className="text-sm text-[#6d7588]">
            Self-service workspace for customer activity and account visibility.
          </p>
        </div>

        <article className="grid gap-3 rounded-xl border border-[#e1e4ea] bg-white p-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b93a5]">Account</p>
            <p className="mt-1 text-lg font-semibold text-[#2f394b]">{user?.name ?? "Customer"}</p>
            <p className="text-sm text-[#6f7788]">{user?.email ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b93a5]">Role</p>
            <p className="mt-1 inline-block rounded-full bg-[#eef1f6] px-2 py-0.5 text-sm text-[#616c82]">
              {user?.role ?? "customer"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b93a5]">Member Since</p>
            <p className="mt-1 text-sm font-medium text-[#2f394b]">{joinedDate}</p>
          </div>
        </article>

        <article className="rounded-xl border border-[#e1e4ea] bg-white p-4">
          <h2 className="text-sm font-semibold text-[#2f394b]">Quick Actions</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "View account details",
              "Track open requests",
              "Download recent report",
              "Contact support",
              "Review notifications",
              "Update preferences",
            ].map((action) => (
              <button
                key={action}
                type="button"
                className="rounded-lg border border-[#d8dbe2] bg-white px-3 py-2 text-left text-sm text-[#445066] hover:bg-[#f8f9fb]"
              >
                {action}
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-[#e1e4ea] bg-white p-4">
          <h2 className="text-sm font-semibold text-[#2f394b]">Granted Permissions</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(user?.permissions ?? []).map((permission) => (
              <span
                key={permission}
                className="rounded-full bg-[#f4f6fa] px-2.5 py-1 text-xs text-[#5e6880]"
              >
                {permission}
              </span>
            ))}
            {(user?.permissions ?? []).length === 0 ? (
              <span className="text-sm text-[#7b8395]">No permissions found.</span>
            ) : null}
          </div>
        </article>
      </section>
    </PermissionGate>
  );
}
