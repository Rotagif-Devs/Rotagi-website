"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const weAreDropdown = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Partner", href: "/partner" },
];

const navItems = [
  { label: "We Are", dropdown: weAreDropdown },
  { label: "Programs", href: "/programs" },
  { label: "Cohort", href: "/cohort" },
  { label: "SHE EMPOWER", href: "/sheempower" },
  // { label: "Blog", href: "/blog" }, hidden from the nav for now, per org request
  { label: "Contact", href: "/contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastProgramSlug, setLastProgramSlug] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWeAreOpen, setIsWeAreOpen] = useState(false);
  const [isMobileWeAreOpen, setIsMobileWeAreOpen] = useState(false);
  const weAreRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setIsMobileWeAreOpen(false);
  };

  // Close the "We Are" dropdown on outside click or Escape.
  useEffect(() => {
    if (!isWeAreOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (weAreRef.current && !weAreRef.current.contains(e.target as Node)) {
        setIsWeAreOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsWeAreOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isWeAreOpen]);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      setIsLoggedIn(Boolean(token));

      const adminUser =
        typeof window !== "undefined"
          ? localStorage.getItem("adminUser")
          : null;
      setIsAdmin(Boolean(adminUser));

      const slug =
        typeof window !== "undefined"
          ? localStorage.getItem("lastProgramSlug")
          : null;
      setLastProgramSlug(slug);
    };

    checkAuth();

    // Listen for storage changes (e.g., logout in another tab or manual clear)
    window.addEventListener("storage", checkAuth);

    // Also check on focus to be sure
    window.addEventListener("focus", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  const isWeAreActive = weAreDropdown.some((item) => pathname.startsWith(item.href));

  const isProgramsPage = pathname === "/programs";
  const isProgramDetailPage =
    pathname.startsWith("/programs/") && pathname !== "/programs";
  const programSlug = isProgramDetailPage
    ? pathname.split("/").pop() || null
    : null;

  const getProgramName = (slug: string | null) => {
    switch (slug) {
      case "she-ignite":
        return "She Ignite";
      case "she-blossom":
        return "She Blossom";
      case "she-blaze":
        return "She Blaze";
      case "she-ascend":
        return "She Ascend";
      default:
        return "";
    }
  };

  const programName = getProgramName(programSlug);

  const getStartedText = isLoggedIn ? "Dashboard" : "Join Waitlist";

  const getStartedHref = isLoggedIn
    ? isAdmin
      ? "/admin/dashboard"
      : lastProgramSlug
        ? `/program/${lastProgramSlug}/dashboard`
        : "/dashboard"
    : "https://forms.office.com/r/EEBttdeyFE?origin=lprLink";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white backdrop-blur-md">
        <div className="mx-auto flex max-w-11/12 items-center justify-between px-4 py-3 md:px-10">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              aria-label="ROTAGI Home"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="ROTAGI Logo"
                width={120}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Desktop navigation"
          >
            {navItems.map((item) =>
              "dropdown" in item ? (
                <div key={item.label} className="relative" ref={weAreRef}>
                  <button
                    type="button"
                    onClick={() => setIsWeAreOpen((prev) => !prev)}
                    aria-expanded={isWeAreOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 text-sm font-medium uppercase transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-4 rounded-sm ${
                      isWeAreActive ? "text-secondary" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isWeAreOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isWeAreOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                      >
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsWeAreOpen(false)}
                            className={`block px-5 py-3 text-sm font-medium uppercase transition-colors hover:bg-primary hover:text-secondary ${
                              pathname.startsWith(sub.href) ? "text-secondary" : "text-gray-700"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 uppercase transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-4 rounded-sm"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop Action */}
          <div className="hidden md:block">
            <Button
              variant="secondary"
              size="md"
              href={getStartedHref}
              className="mr-2 border-2 text-sm uppercase border-gray-300 rounded-full font-medium cursor-pointer"
            >
              {getStartedText}
            </Button>
            <Button
              variant="primary"
              size="md"
              href="/donate"
              className="uppercase text-sm cursor-pointer"
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="rounded-full p-2 text-gray-900 transition-colors hover:bg-gray-100 md:hidden focus-visible:ring-2 focus-visible:ring-secondary outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          id="mobile-menu"
          className={`fixed inset-x-0 top-[60px] z-50 overflow-y-auto bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden ${
            isOpen
              ? "max-h-[calc(100vh-60px)] border-b border-gray-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 p-6">
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navItems.map((item) =>
                "dropdown" in item ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setIsMobileWeAreOpen((prev) => !prev)}
                      aria-expanded={isMobileWeAreOpen}
                      className={`flex w-full items-center justify-between text-lg font-medium uppercase transition-colors hover:text-secondary ${
                        isWeAreActive ? "text-secondary" : "text-gray-900"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${isMobileWeAreOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isMobileWeAreOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-3 py-3 pl-4">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={`text-base font-medium uppercase transition-colors hover:text-secondary ${
                                  pathname.startsWith(sub.href) ? "text-secondary" : "text-gray-600"
                                }`}
                                onClick={closeMenu}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium text-gray-900 uppercase transition-colors hover:text-secondary"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <Button
              variant="secondary"
              size="sm"
              href={getStartedHref}
              onClick={() => closeMenu()}
              className="mr-2 border border-gray-300 uppercase text-sm"
            >
              {getStartedText}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={closeMenu}
              href="/donate"
              className="w-full justify-center text-sm uppercase"
            >
              Donate Now
            </Button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 top-[60px] z-40 bg-black/10 backdrop-blur-[2px] md:hidden"
            onClick={closeMenu}
          />
        )}
      </header>

    </>
  );
}
