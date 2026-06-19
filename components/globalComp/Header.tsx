"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import WaitlistModal from "./WaitlistModal";

const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastProgramSlug, setLastProgramSlug] = useState<string | null>(null);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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
    : undefined;

  const handleGetStartedClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsWaitlistModalOpen(true);
      closeMenu();
    }
  };

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
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-700 uppercase transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-4 rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Action */}
          <div className="hidden md:block">
            <Button
              variant="secondary"
              size="md"
              href={getStartedHref}
              onClick={handleGetStartedClick}
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
          className={`fixed inset-x-0 top-[60px] z-50 overflow-hidden bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden ${
            isOpen
              ? "max-h-[400px] border-b border-gray-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 p-6">
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-gray-900 uppercase transition-colors hover:text-secondary"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              variant="secondary"
              size="sm"
              href={getStartedHref}
              onClick={(e) => {
                handleGetStartedClick(e);
                closeMenu();
              }}
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

      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        programName={programName}
      />
    </>
  );
}
