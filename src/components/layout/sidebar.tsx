"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  Cog,
  FileText,
  HelpCircle,
  LayoutGrid,
  ListTodo,
  MessageSquare,
  Receipt,
  Settings,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { PERMISSIONS } from "@/constants/permissions";
import { authService } from "@/services/auth.service";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  { href: "/leads", label: "Leads", icon: Briefcase, permission: PERMISSIONS.LEADS_VIEW },
  {
    href: "/tasks",
    label: "Opportunities",
    icon: Briefcase,
    permission: PERMISSIONS.TASKS_VIEW,
  },
  { href: "/tasks", label: "Tasks", icon: ListTodo, permission: PERMISSIONS.TASKS_VIEW },
  {
    href: "/reports",
    label: "Reports",
    icon: BarChart3,
    permission: PERMISSIONS.REPORTS_VIEW,
  },
];

const userLinks = [
  { href: "/users", label: "Contacts", icon: Users, permission: PERMISSIONS.USERS_VIEW },
  {
    href: "/audit-log",
    label: "Messages",
    icon: MessageSquare,
    permission: PERMISSIONS.AUDIT_VIEW,
  },
  {
    href: "/portal",
    label: "My Portal",
    icon: Users,
    permission: PERMISSIONS.PORTAL_VIEW,
  },
];

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuth();
  const userPermissions = user?.permissions ?? [];

  const isAllowed = (permission: string) => userPermissions.includes(permission);

  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
      // Ignore API failure and continue local logout.
    } finally {
      clearAuth();
      onClose?.();
      router.push("/");
      router.refresh();
    }
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#ddd7d1] bg-[#ead8cf] p-3 transition-transform duration-200 md:static md:z-auto md:w-52 md:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-4 flex items-center gap-2 px-1">
        <div className="grid h-6 w-6 place-items-center rounded-md bg-[#6564ec] text-white">
          <div className="h-2.5 w-2.5 rounded-[3px] bg-white" />
        </div>
        <p className="text-[15px] font-semibold text-[#6166ef]">Overlay</p>
      </div>

      <div className="mb-4 rounded-xl border border-[#d5cbc3] bg-[#f7f2ee] p-2.5">
        <p className="text-[12px] font-semibold text-[#394257]">{user?.name ?? "Workspace"}&apos;s workspace</p>
        <p className="text-[11px] text-[#8b90a1]">#{user?.id ? user.id.replace(/-/g, "").slice(0, 10).toUpperCase() : "----------"}</p>
      </div>

      <nav className="space-y-0.5">
        {links
          .filter((link) => isAllowed(link.permission))
          .map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[14px] transition ${
                active
                  ? "bg-[#dcc8bb] text-[#384153]"
                  : "text-[#4b566b] hover:bg-[#e3d0c4]"
              }`}
              href={link.href}
              onClick={onClose}
            >
              <Icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          );
          })}
      </nav>

      <div className="mt-4 space-y-0.5">
        <p className="px-2.5 pb-1 text-[11px] font-medium text-[#9b8f88]">Users</p>
        {userLinks
          .filter((link) => isAllowed(link.permission))
          .map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[14px] transition ${
                active
                  ? "bg-[#dcc8bb] text-[#384153]"
                  : "text-[#4b566b] hover:bg-[#e3d0c4]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          );
          })}
      </div>

      <div className="mt-4 space-y-0.5">
        <p className="px-2.5 pb-1 text-[11px] font-medium text-[#9b8f88]">Other</p>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[14px] text-[#4b566b] transition hover:bg-[#e3d0c4]"
        >
          <Cog className="h-3.5 w-3.5" />
          Configuration
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[14px] text-[#4b566b] transition hover:bg-[#e3d0c4]"
        >
          <Receipt className="h-3.5 w-3.5" />
          Invoice
        </button>
      </div>

      <div className="mt-auto space-y-0.5 pt-5">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[14px] text-[#4b566b] transition hover:bg-[#e3d0c4]"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Help center
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[14px] text-[#4b566b] transition hover:bg-[#e3d0c4]"
        >
          <Settings className="h-3.5 w-3.5" />
          Settings
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[14px] font-medium text-[#FD6D3F] transition hover:bg-[#f5dfd3]"
        >
          <FileText className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}