"use client";

import { useEffect, useState } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";
import { auditService } from "@/services/audit.service";
import type { AuditLogItem } from "@/types/audit";

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuditLogs() {
      setLoading(true);
      try {
        const response = await auditService.list(100);
        setLogs(response.data.data);
      } finally {
        setLoading(false);
      }
    }

    void loadAuditLogs();
  }, []);

  return (
    <PermissionGate
      permission={PERMISSIONS.AUDIT_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Audit Log.</p>}
    >
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2f394b]">Audit Log</h1>
          <p className="text-sm text-[#6d7588]">
            Security-sensitive actions and authentication events.
          </p>
        </div>

        <article className="overflow-hidden rounded-xl border border-[#e1e4ea] bg-white">
          <div className="grid grid-cols-[1.1fr_1.2fr_1fr_0.9fr_1fr] border-b border-[#eceef2] bg-[#f8f9fb] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#7f8798]">
            <span>Action</span>
            <span>Actor</span>
            <span>Entity</span>
            <span>IP</span>
            <span>Timestamp</span>
          </div>

          {loading ? (
            <p className="px-4 py-5 text-sm text-[#7f8798]">Loading audit logs...</p>
          ) : logs.length === 0 ? (
            <p className="px-4 py-5 text-sm text-[#7f8798]">No audit logs recorded yet.</p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-[1.1fr_1.2fr_1fr_0.9fr_1fr] border-b border-[#f1f2f5] px-4 py-3 text-sm text-[#445066] last:border-b-0"
              >
                <span className="font-medium text-[#2f394b]">{log.action}</span>
                <span>{log.user?.email ?? "System"}</span>
                <span>
                  {log.entityType}
                  {log.entityId ? `:${log.entityId.slice(0, 8)}` : ""}
                </span>
                <span>{log.ipAddress ?? "-"}</span>
                <span>{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </article>
      </section>
    </PermissionGate>
  );
}