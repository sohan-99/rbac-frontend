"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/leads", label: "Leads" },
  { href: "/tasks", label: "Tasks" },
  { href: "/reports", label: "Reports" },
  { href: "/audit-log", label: "Audit Log" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuth } = useAuth();

  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
      // Ignore API failure and continue local logout.
    } finally {
      clearAuth();
      router.push("/");
      router.refresh();
    }
  }

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white p-4">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        RBAC System
      </p>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              className={`block rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-6">
        <button
          type="button"
          className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-100"
        >
          Help center
        </button>
        <button
          type="button"
          className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-100"
        >
          Settings
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#FD6D3F] transition hover:bg-[#fff1eb]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}