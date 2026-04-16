"use client";

import { Menu } from "lucide-react";
import { motion } from "framer-motion";

interface MobileHeaderProps {
  onMenuClick: () => void;
}
export default function MobileHeader({
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#F1F1F1] bg-white px-5 py-5 lg:hidden">
      <motion.button
        whileTap={{ scale: 0.92 }}
        type="button"
        onClick={onMenuClick}
        className="text-[#5A5A5A]"
      >
        <Menu size={28} />
      </motion.button>

      <h1 className="text-[1.8rem] font-bold tracking-tight text-[#E13B94]">
        ROTAGI
      </h1>

      <div className="w-7" />
    </div>
  );
}