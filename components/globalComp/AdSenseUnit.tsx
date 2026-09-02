"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

// Publisher ID from the AdSense loader snippet — safe to embed client-side,
// it's public by design. Only pages that render <AdSenseUnit> pull in the
// AdSense script, so ads never show up on the rest of the site.
const ADSENSE_CLIENT = "ca-pub-6928015612670683";

type AdSenseUnitProps = {
  // Ad unit slot ID from AdSense > Ads > By ad unit. Placeholder until a
  // real slot is created for this placement — swap it in before shipping.
  slot: string;
  format?: string;
  className?: string;
};

export default function AdSenseUnit({ slot, format = "auto", className = "" }: AdSenseUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // @ts-expect-error adsbygoogle is injected by the Google script below
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense push failed", err);
    }
  }, []);

  return (
    <div className={`my-10 ${className}`}>
      <Script
        id="adsbygoogle-loader"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 mb-2">
        Advertisement
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
