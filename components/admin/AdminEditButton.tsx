"use client";

import React from "react";
import { Edit2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

interface AdminEditButtonProps {
  editUrl: string;
  className?: string;
}

export default function AdminEditButton({ editUrl, className = "" }: AdminEditButtonProps) {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) return null;

  return (
    <div className={`fixed bottom-8 right-8 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500 ${className}`}>
      <Link
        href={editUrl}
        className="flex items-center gap-3 bg-[#0a0a0a] text-white px-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 hover:bg-secondary hover:text-black transition-all group scale-100 hover:scale-105 active:scale-95"
      >
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
          <Edit2 size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-black/60">Admin Nexus</span>
          <span className="text-sm font-bold tracking-tight">Edit This Content</span>
        </div>
        <ExternalLink size={16} className="ml-2 opacity-20 group-hover:opacity-100 transition-opacity" />
      </Link>
    </div>
  );
}
