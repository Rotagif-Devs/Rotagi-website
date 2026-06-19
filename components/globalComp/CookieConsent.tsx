"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-[9999] md:bottom-6 md:left-6 md:right-auto md:w-full md:max-w-[400px]"
        >
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-xl p-6 relative overflow-hidden group">
            {/* Background Decorative Gradient */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors duration-500" />
            
            <div className="flex gap-4 items-start relative z-10">
              <div className="bg-secondary/10 p-3 rounded-xl transition-transform group-hover:scale-110 duration-300">
                <Cookie className="w-6 h-6 text-secondary" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg text-zinc-900 dark:text-white font-cal-sans">
                    Cookie Policy
                  </h3>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  We use cookies to improve your experience and analyze site traffic.
                  Read our <Link href="/privacy" className="text-secondary hover:underline font-medium">Privacy Policy</Link> for more details.
                </p>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleAccept}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="secondary"
                    size="sm"
                    className="flex-1 dark:!text-zinc-400 !text-zinc-600 hover:!bg-zinc-100 dark:hover:!bg-zinc-800 border-none"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
