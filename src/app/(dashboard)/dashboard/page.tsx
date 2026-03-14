"use client";

import { useEffect, useMemo, useState } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";
import { auditService } from "@/services/audit.service";
import { userService } from "@/services/user.service";
import type { AuditLogItem } from "@/types/audit";
import type { User } from "@/types/user";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [usersResponse, auditResponse] = await Promise.all([
          userService.list(),
          auditService.list(20),
        ]);

        setUsers(usersResponse.data as User[]);
        setAuditLogs(auditResponse.data.data);
      } finally {
        setLoading(false);
      }
    }

    void loadDashboardData();
  }, []);

  const stats = useMemo(() => {
    const activeUsers = users.filter((user) => user.status === "active").length;
    const suspendedUsers = users.filter((user) => user.status === "suspended").length;
    const bannedUsers = users.filter((user) => user.status === "banned").length;

    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const loginsLastDay = auditLogs.filter(
      (log) =>
        log.action === "auth.login" && new Date(log.createdAt).getTime() >= oneDayAgo,
    ).length;

    return {
      totalUsers: users.length,
      activeUsers,
      suspendedUsers,
      bannedUsers,
      loginsLastDay,
    };
  }, [users, auditLogs]);

  return (
    <PermissionGate
      permission={PERMISSIONS.DASHBOARD_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Dashboard.</p>}
    >
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2f394b]">Dashboard</h1>
          <p className="text-sm text-[#6d7588]">
            Real-time overview of users, access state, and authentication activity.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Total users", value: stats.totalUsers, tone: "text-[#2f394b]" },
            { label: "Active", value: stats.activeUsers, tone: "text-[#2f8b57]" },
            { label: "Suspended", value: stats.suspendedUsers, tone: "text-[#d57a1f]" },
            { label: "Banned", value: stats.bannedUsers, tone: "text-[#d8443a]" },
            { label: "Logins (24h)", value: stats.loginsLastDay, tone: "text-[#5862db]" },
          ].map((card) => (
            <article
              key={card.label}
              className="rounded-xl border border-[#e1e4ea] bg-white px-4 py-3"
            >
              <p className="text-xs uppercase tracking-wide text-[#8b93a5]">{card.label}</p>
              <p className={`mt-1 text-2xl font-semibold ${card.tone}`}>{card.value}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-3 xl:grid-cols-2">
          <article className="rounded-xl border border-[#e1e4ea] bg-white">
            <div className="border-b border-[#eceef2] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#2f394b]">Recent users</h2>
            </div>
            {loading ? (
              <p className="px-4 py-4 text-sm text-[#7f8798]">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="px-4 py-4 text-sm text-[#7f8798]">No users available.</p>
            ) : (
              <div className="divide-y divide-[#f1f2f5]">
                {users.slice(0, 6).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-[#2f394b]">{user.name}</p>
                      <p className="text-[#7d8598]">{user.email}</p>
                    </div>
                    <span className="rounded-full bg-[#eef1f6] px-2 py-0.5 text-xs text-[#626c82]">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="rounded-xl border border-[#e1e4ea] bg-white">
            <div className="border-b border-[#eceef2] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#2f394b]">Recent auth events</h2>
            </div>
            {loading ? (
              <p className="px-4 py-4 text-sm text-[#7f8798]">Loading activity...</p>
            ) : auditLogs.length === 0 ? (
              <p className="px-4 py-4 text-sm text-[#7f8798]">No audit events yet.</p>
            ) : (
              <div className="divide-y divide-[#f1f2f5]">
                {auditLogs.slice(0, 6).map((log) => (
                  <div key={log.id} className="px-4 py-3 text-sm">
                    <p className="font-medium text-[#2f394b]">{log.action}</p>
                    <p className="text-[#7d8598]">
                      {log.user?.email ?? "System"} · {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>
    </PermissionGate>
  );
}