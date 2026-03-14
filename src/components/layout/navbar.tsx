"use client";

import { Bell, ChevronLeft, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";
  return (
    <header className="flex h-14.5 items-center justify-between border-b border-[#e2e4e8] bg-[#f7f7f9] px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-[#d7d9df] bg-white text-[#6d7485]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="text-[24px] font-medium text-[#2d3546]">Tasks</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9197a5]" />
          <input
            type="text"
            placeholder="Search"
            className="h-8.5 w-57.5 rounded-full border border-[#d9dce2] bg-white pl-9 pr-3 text-[13px] text-[#444c5c] outline-none"
          />
        </div>
        <div className="hidden items-center gap-1 rounded-md border border-[#dde0e6] bg-white px-2 py-1 lg:flex">
          <span className="text-[10px] text-[#9ca2b0]">Category</span>
          <span className="text-[11px] text-[#6f7788]">Client unit</span>
        </div>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full border border-[#d9dce2] bg-white text-[#7d8596]"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#6564ec] text-[13px] font-semibold text-white">
          {initial}
        </div>
      </div>
    </header>
  );
}