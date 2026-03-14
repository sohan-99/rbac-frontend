"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e7e8ec] p-2 sm:p-3">
      <div className="mx-auto flex min-h-[calc(100vh-1rem)] max-w-7xl overflow-hidden rounded-[14px] border border-[#d7dae1] bg-[#f6f7f9] sm:min-h-[calc(100vh-1.5rem)] sm:rounded-[18px]">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {mobileSidebarOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        ) : null}

        <div className="flex min-h-full min-w-0 flex-1 flex-col">
          <Navbar onMenuToggle={() => setMobileSidebarOpen((current) => !current)} />
          <main className="flex-1 px-3 py-3 sm:px-4 sm:py-3.5">{children}</main>
        </div>
      </div>
    </div>
  );
}