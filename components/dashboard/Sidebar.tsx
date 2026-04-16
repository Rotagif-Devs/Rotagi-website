import { motion, AnimatePresence } from "framer-motion";
import { SidebarContent } from "./SidebarContent";

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  isMobileOpen = false,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* desktop */}
      <aside className="hidden h-screen shrink-0 lg:flex">
        <SidebarContent />
      </aside>
      {/* mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            />

            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 z-50 h-screen w-[260px] lg:hidden"
            >
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}