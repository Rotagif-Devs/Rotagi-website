"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const navItems = ["About", "Programs", "Contact"];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed cursor-default left-0 bg-white top-0 z-50 mx-auto w-full max-w-8xl px-4 md:px-10 py-2">
      <div className="flex bg-white items-center justify-between">
        {/* Logo */}
        <div className="">
          <Link
            href="/"
            className="inline-block font-cal-sans font-bold uppercase text-secondary text-2xl "
          >
            ROTAGIF
          </Link>
        </div>

        {/* Desktop Navigation + Donate Button */}

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="  text-gray-700 transition font-medium hover:text-gray-900 text-base"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="primary" size="md">
            Donate Now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-black focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1"
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
            <Link href="/" className="text-3xl font-bold text-secondary ">
              ROTAGI
            </Link>
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
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-medium text-gray-900 transition"
                onClick={closeMenu}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Donate Button in mobile menu */}
          <Link href="/donate-now">
            <Button
              variant="primary" // or whatever variant matches your "white" style
              size="lg"
              className="mt-8 w-full justify-center font-dm-sans font-semibold text-base"
              onClick={closeMenu}
            >
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
