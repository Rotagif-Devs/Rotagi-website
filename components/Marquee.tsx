"use client";

interface MarqueeProps {
  text: string;
}

export default function Marquee({ text }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden bg-[var(--color-dark)] py-8">
      <div className="marquee-container">
        <div className="marquee-content">
          <span 
            className="marquee-text font-[var(--font-cal-sans)] text-white uppercase whitespace-nowrap"
            style={{
              fontWeight: 600,
              fontSize: '128px',
              lineHeight: '113%',
              letterSpacing: '-1.5%',
            }}
          >
            {text}
          </span>
          <span 
            className="marquee-text font-[var(--font-cal-sans)] text-white uppercase whitespace-nowrap"
            style={{
              fontWeight: 600,
              fontSize: '128px',
              lineHeight: '113%',
              letterSpacing: '-1.5%',
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
