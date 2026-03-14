"use client";

import { useEffect, useMemo, useState } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";
import { userService } from "@/services/user.service";
import type { User } from "@/types/user";

export default function ReportsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      try {
        const response = await userService.list();
        setUsers(response.data as User[]);
      } finally {
        setLoading(false);
      }
    }

    void loadUsers();
  }, []);

  const roleBreakdown = useMemo(() => {
    return users.reduce<Record<string, number>>((acc, user) => {
      acc[user.role] = (acc[user.role] ?? 0) + 1;
      return acc;
    }, {});
  }, [users]);

  const statusBreakdown = useMemo(() => {
    return users.reduce<Record<string, number>>((acc, user) => {
      const key = user.status ?? "active";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
  }, [users]);

  const totalUsers = users.length;

  return (
    <PermissionGate
      permission={PERMISSIONS.REPORTS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Reports.</p>}
    >
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2f394b]">Reports</h1>
          <p className="text-sm text-[#6d7588]">
            Analytics view for role distribution and account health.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-[#e1e4ea] bg-white p-4">
            <h2 className="text-sm font-semibold text-[#2f394b]">Role distribution</h2>
            {loading ? (
              <p className="mt-3 text-sm text-[#7f8798]">Loading report...</p>
            ) : (
              <div className="mt-3 space-y-3">
                {Object.entries(roleBreakdown).map(([role, count]) => {
                  const percent = totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0;
                  return (
                    <div key={role}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="capitalize text-[#4b5569]">{role}</span>
                        <span className="text-[#7d8598]">{count} ({percent}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#edf0f4]">
                        <div
                          className="h-2 rounded-full bg-[#6564ec]"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </article>

          <article className="rounded-xl border border-[#e1e4ea] bg-white p-4">
            <h2 className="text-sm font-semibold text-[#2f394b]">Account status</h2>
            {loading ? (
              <p className="mt-3 text-sm text-[#7f8798]">Loading report...</p>
            ) : (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { key: "active", tone: "text-[#2f8b57] bg-[#eaf7ee]" },
                  { key: "suspended", tone: "text-[#d57a1f] bg-[#fff4e7]" },
                  { key: "banned", tone: "text-[#d8443a] bg-[#fdeceb]" },
                ].map((item) => (
                  <div key={item.key} className="rounded-lg border border-[#e6e9ee] p-3">
                    <p className="text-xs uppercase tracking-wide text-[#8d95a6]">{item.key}</p>
                    <p className={`mt-1 inline-block rounded-full px-2 py-0.5 text-sm ${item.tone}`}>
                      {statusBreakdown[item.key] ?? 0}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>

        <article className="overflow-hidden rounded-xl border border-[#e1e4ea] bg-white">
          <div className="border-b border-[#eceef2] px-4 py-3">
            <h2 className="text-sm font-semibold text-[#2f394b]">Recent accounts</h2>
          </div>

          {loading ? (
            <p className="px-4 py-4 text-sm text-[#7f8798]">Loading accounts...</p>
          ) : users.length === 0 ? (
            <p className="px-4 py-4 text-sm text-[#7f8798]">No account data available.</p>
          ) : (
            <div className="divide-y divide-[#f1f2f5]">
              {users.slice(0, 8).map((user) => (
                <div key={user.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-[#2f394b]">{user.name}</p>
                    <p className="text-[#7d8598]">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#eef1f6] px-2 py-0.5 text-xs text-[#646d82]">
                      {user.role}
                    </span>
                    <span className="rounded-full bg-[#f4f6f9] px-2 py-0.5 text-xs text-[#737d91]">
                      {user.status ?? "active"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </PermissionGate>
  );
}