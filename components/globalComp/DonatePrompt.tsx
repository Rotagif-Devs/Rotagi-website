"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const SESSION_KEY = "donate-prompt-seen";
// Internal tools and the donate flow itself shouldn't get a "please donate" nudge.
const EXCLUDED_PREFIXES = ["/admin", "/cohort/portal", "/donate"];

const DonatePrompt = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isExcluded = EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (isExcluded) return;
    setMounted(true);

    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    }, 2500);

    return () => clearTimeout(timer);
    // Only run the auto-open check once, on whichever page first mounts this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isExcluded || !mounted) return null;

  return (
    <div className="fixed top-24 right-4 md:right-6 z-[9999] flex flex-col items-end gap-2">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Hide donation prompt" : "Show donation prompt"}
        className="w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-secondary hover:bg-gray-50 transition-colors shrink-0"
      >
        <Bell className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-cal-sans text-lg text-gray-900 pr-8 mb-3">
              Sponsor African Girls and Women in Tech
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              With $20 (₦30,000), you can provide a laptop, AI tool subscriptions, and a scholarship.
            </p>

            <Button href="/donate" variant="primary" size="sm" className="rounded-full">
              Donate Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonatePrompt;
