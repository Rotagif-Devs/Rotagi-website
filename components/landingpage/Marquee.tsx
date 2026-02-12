"use client";

interface MarqueeProps {
  text: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export default function Marquee({ text, style, textStyle }: MarqueeProps) {
  return (
    <div
      className="w-full overflow-hidden bg-primary py-6 md:py-10 border-y border-black/5"
      style={style}
    >
      <div className="marquee-container">
        <div className="marquee-content flex animate-marquee items-center">
          <span
            className="
              marquee-text font-cal-sans text-black lowercase 
              whitespace-nowrap flex items-center gap-10 md:gap-16
              text-5xl sm:text-7xl md:text-[128px]
             leading-none tracking-tighter uppercase
            "
            style={textStyle}
          >
            {text} • {text} • {text} • {text}
          </span>

          <span
            className="
              marquee-text font-cal-sans text-black lowercase 
              whitespace-nowrap flex items-center gap-10 md:gap-16
              text-5xl sm:text-7xl md:text-[128px]
              leading-none tracking-tighter uppercase
            "
            style={textStyle}
          >
            {text} • {text} • {text} • {text}
          </span>
        </div>
      </div>
    </div>
  );
}
