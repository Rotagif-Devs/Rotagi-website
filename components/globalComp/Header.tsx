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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10">
        {/* Logo */}
        <div className="shrink-0">
          <Link
            href="/"
            className="text-2xl uppercase tracking-wider text-secondary transition-opacity hover:opacity-80 font-cal-sans"
          >
            ROTAGI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-secondary"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:block">
          <Button
            variant="secondary"
            size="md"
            href="/programs"
            className="mr-2 border border-gray-400"
          >
            Get Started
          </Button>
          <Button variant="primary" size="md" href="/donate">
            Donate Now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="rounded-full p-2 text-gray-900 transition-colors hover:bg-gray-100 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-x-0 top-[60px] z-50 overflow-hidden bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-[400px] border-b border-gray-100 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-lg font-medium text-gray-900 transition-colors hover:text-secondary"
                onClick={closeMenu}
              >
                {item}
              </Link>
            ))}
          </nav>

          <Button
            variant="secondary"
            size="md"
            href="/programs"
            onClick={closeMenu}
            className="mr-2 border border-gray-400"
          >
            Get Started
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={closeMenu}
            href="/donate"
            className="w-full justify-center text-base"
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
  );
}
