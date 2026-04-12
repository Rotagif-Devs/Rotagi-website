"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, BookOpen, Settings, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
//   { label: "Courses", href: "/courses", icon: BookOpen },
//   { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-white w-[300px]">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 md:px-8 md:py-6">
        <div className="shrink-0">
          <Link
            href="/"
            className="text-2xl uppercase tracking-wider text-secondary transition-opacity hover:opacity-80 font-cal-sans"
          >
            ROTAGI
          </Link>
          </div>

        <button
          type="button"
          onClick={onClose}
          className="md:hidden text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                  isActive
                    ? "bg-[#F9E7F1] text-[#E02D8B]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}