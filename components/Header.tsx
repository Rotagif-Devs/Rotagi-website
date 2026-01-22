// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div
          className={cn(
            "text-2xl font-bole tracking-tighter transition-colors duration-300 cursor-pointer",
            isScrolled ? "text-purple-900" : "text-white",
          )}
        >
          ROTAGIF
        </div>

        <nav className="hidden md:flex items-center space-x-8 font-sans">
          {["About", "Programs", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors duration-300 hover:opacity-100",
                isScrolled
                  ? "text-gray-600 hover:text-pink-600"
                  : "text-white/80 hover:text-white",
              )}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-4">
          <Button
            variant={isScrolled ? "primary" : "white"}
            size="md"
            className=""
          >
            Donate Now
          </Button>
        </div>
      </div>
    </header>
  );
}
