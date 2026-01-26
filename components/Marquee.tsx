"use client";

interface MarqueeProps {
  text: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export default function Marquee({ text, style, textStyle }: MarqueeProps) {
  return (
    <div 
      className="w-full overflow-hidden bg-[var(--color-dark)] py-8"
      style={style}
    >
      <div className="marquee-container">
        <div className="marquee-content">
          <span 
            className="marquee-text font-[var(--font-cal-sans)] text-white uppercase whitespace-nowrap flex items-center gap-8"
            style={{
              fontWeight: 600,
              fontSize: '128px',
              lineHeight: '113%',
              letterSpacing: '-1.5%',
              ...textStyle
            }}
          >
            {text}
          </span>
          <span 
            className="marquee-text font-[var(--font-cal-sans)] text-white uppercase whitespace-nowrap flex items-center gap-8"
            style={{
              fontWeight: 600,
              fontSize: '128px',
              lineHeight: '113%',
              letterSpacing: '-1.5%',
              ...textStyle
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
