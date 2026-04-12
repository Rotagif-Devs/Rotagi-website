"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Search from "@/components/dashboard/Searchbar";
import MobileHeader from "@/components/dashboard/MobileHeader";

interface DashboardProviderProps {
  children: ReactNode;
}

export default function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#F7E6EF]">
      <div className="flex h-full">
        <Sidebar
          isMobileOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <MobileHeader onMenuClick={() => setIsMobileOpen(true)} />

          {/* desktop + tablet search */}
          <div className="hidden bg-white px-4 py-4 sm:px-5 md:block md:px-6 md:py-4 lg:px-7">
            <Search />
          </div>

          <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6 md:px-6 md:py-7 lg:px-7 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}