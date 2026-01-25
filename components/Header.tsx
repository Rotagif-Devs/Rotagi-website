// components/Header.tsx
"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header
      className="mt-6 absolute top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-transparent py-5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="text-2xl font-bole tracking-tighter transition-colors duration-300 cursor-pointer text-white">
          ROTAGIF
        </div>

        <nav className="hidden md:flex items-center space-x-8 font-sans">
          {["About", "Programs", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors duration-300 hover:opacity-100 text-white/80 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-4">
          <Button
            variant="white"
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
