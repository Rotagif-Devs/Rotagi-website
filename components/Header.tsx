"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navItems = ["About", "Programs", "Contact"];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="absolute left-1/2 md:top-[60px] z-50 mx-auto w-full max-w-[1274px] -translate-x-1/2 px-4 md:px-10 py-5 md:py-0">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-inter font-bold uppercase tracking-[-0.67px] text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          ROTAGI
        </div>

        {/* Desktop Navigation + Donate Button */}
        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-dm-sans font-medium text-white/90 transition hover:text-white text-base"
              >
                {item}
              </a>
            ))}
          </nav>

          <Button
            variant="white"
            size="md"
            className="font-dm-sans font-semibold text-sm md:text-base whitespace-nowrap"
          >
            Donate Now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Menu Overlay (closes on click outside) */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />

      {/* Mobile Menu Panel – slides in from right */}
      <div
        className={`fixed top-0 right-0 z-50 h-fit w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          {/* Header with logo and close button */}
          <div className="mb-10 flex items-center justify-between">
            <div className="text-3xl font-bold text-[var(--color-accent0)]">ROTAGI</div>
            <button
              onClick={closeMenu}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close menu"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mb-auto flex flex-col gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xl font-medium text-gray-900 transition hover:text-[var(--color-accent0)]"
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Donate Button in mobile menu */}
          <Button
            variant="primary" // or whatever variant matches your "white" style
            size="lg"
            className="mt-8 w-full justify-center font-dm-sans font-semibold text-base"
            onClick={closeMenu}
          >
            Donate Now
          </Button>
        </div>
      </div>
    </header>
  );
}