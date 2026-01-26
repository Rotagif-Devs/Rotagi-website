// components/Header.tsx
"use client";

import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header
      className="absolute z-50 flex items-center justify-between"
      style={{
        width: '100%',
        maxWidth: '1274px',
        height: '50px',
        top: '60px', // Moved up from 104px
        left: '0',
        right: '0',
        margin: '0 auto', // Centered horizontally
      }}
    >
      {/* Logo */}
      <div 
        className="text-white cursor-pointer flex items-center justify-center"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '-0.67px',
          textAlign: 'center',
          textTransform: 'uppercase',
          width: '72px',
          height: '24px',
          textShadow: '0px 2.13px 2.13px rgba(246, 246, 246, 0.3)'
        }}
      >
        ROTAGI
      </div>

      {/* Navigation */}
      <nav 
        className="hidden md:flex items-center"
        style={{
          gap: '32px',
          height: '44px',
        }}
      >
        {["About", "Programs", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white/80 hover:text-white transition-colors duration-300 flex items-center"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 500,
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '-0.2px',
              height: '24px',
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Donate Button */}
      <div>
        <Button
          variant="white"
          size="md"
          className="flex items-center justify-center whitespace-nowrap"
          style={{
            width: '174px',
            height: '50px',
            borderRadius: '34px',
            padding: '15px 44px',
            gap: '8px',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '100%',
            letterSpacing: '-0.2px',
          }}
        >
          Donate Now
        </Button>
      </div>
    </header>
  );
}
