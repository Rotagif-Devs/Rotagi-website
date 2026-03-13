"use client";

import React from "react";
import { ProgramProvider } from "@/context/ProgramContext";
import LeftPanel from "@/components/LeftPanel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgramProvider>
      <div className="min-h-screen w-full lg:flex-row  flex flex-col overflow-hidden">
       
        <LeftPanel />

      
        <div className="flex-1 h-full overflow-y-auto   bg-primary flex items-center justify-center p-8">
          {children} 
        </div>
      </div>
    </ProgramProvider>
  );
}