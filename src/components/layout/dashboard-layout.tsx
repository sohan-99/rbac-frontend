import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#e7e8ec] p-3">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[18px] border border-[#d7dae1] bg-[#f6f7f9]">
        <Sidebar />
        <div className="flex min-h-full flex-1 flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-3.5">{children}</main>
        </div>
      </div>
    </div>
  );
}