"use client";

interface MarqueeProps {
  text: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export default function Marquee({ text, style, textStyle }: MarqueeProps) {
  return (
    <div 
      className="w-full overflow-hidden bg-dark py-6 md:py-8"
      style={style}
    >
      <div className="marquee-container">
        <div className="marquee-content flex animate-marquee">
          <span 
            className="
              marquee-text font-cal-sans text-white uppercase 
              whitespace-nowrap flex items-center gap-6 md:gap-8
              text-5xl sm:text-6xl md:text-5xl
              font-semibold leading-none tracking-[-0.015em]
            "
            style={textStyle} // still allows override if needed
          >
            {text} • {text} {/* optional separator for better loop feel */}
          </span>

          {/* Duplicate for seamless loop */}
          <span 
            className="
              marquee-text font-cal-sans text-white uppercase 
              whitespace-nowrap flex items-center gap-6 md:gap-8
              text-5xl sm:text-6xl md:text-5xl 
              font-semibold leading-none tracking-[-0.015em]
            "
            style={textStyle}
          >
            {text} • {text}
          </span>
        </div>
      </div>
    </div>
  );
}