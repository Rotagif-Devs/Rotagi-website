"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";

// These are the partners' real logo files, used exactly as supplied — no
// cropping, cutout, or background swap. Each is a full-bleed square image
// with its own real background baked in, so the card just displays it,
// full-size, with no extra padding/background layer of our own.
const partnerLogos = [
  { name: "Selex Engineering & Construction", url: "/partner-selex-engineering.png" },
  { name: "FCT Universal Basic Education Board", url: "/partner-fct-ubeb.png" },
  { name: "Daptem Engineering", url: "/partner-daptem-engineering.png" },
  { name: "Infinityfield", url: "/partner-infinityfield.png" },
  { name: "Tushiyah", url: "/partner-tushiyah.png" },
  { name: "Three Lions Group", url: "/partner-three-lions-group.png" },
  { name: "Slack", url: "/partner-slack.png" },
  { name: "Canva", url: "/partner-canva.png" },
  { name: "monday.com", url: "/partner-monday.png" },
  { name: "Make", url: "/partner-make.png" },
  { name: "DataCamp Donates", url: "/partner-datacamp-donates.png" },
  { name: "SkillAddis", url: "/partner-skilladdis.png" },
  { name: "EV World Africa", url: "/partner-ev-world-africa.png" },
  { name: "Microsoft", url: "/partner-microsoft.png" },
  // Identity unconfirmed — swap this file/name once known.
  { name: "Partner", url: "/partner-unknown-y.png" },
];

export default function Partners() {
  return (
    <section id="partners" className="overflow-hidden">
      {/* Top half: heading + description + button, on the page's own pink
          background (unchanged from before this was split into two halves). */}
      <div className="py-8 lg:py-16 px-6 lg:px-8 flex justify-center">
        <div className="flex w-full max-w-11/12 flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-black max-w-4xl font-cal-sans font-normal text-4xl md:text-5xl leading-tight uppercase">
            Organizations & Platforms Supporting Our Mission
          </h2>

          <div className="flex flex-col items-start gap-8 max-w-[500px]">
            <p className="text-gray-600 font-dm-sans font-normal text-base leading-relaxed text-justify md:text-left">
              Through collaboration with organisations and trusted technology
              platforms, we are advancing AI education and digital inclusion for
              African girls expanding access, opportunity, and innovation.
            </p>

            <Button
              variant="primary"
              href="/partner"
              className="hidden md:flex px-9 py-3.5 rounded-full text-sm md:text-base"
            >
              Partner with Us
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom half: the logo marquee, on its own white band so it reads as
          a distinct section from the pink heading half above it. */}
      <div className="bg-white py-10 md:py-16">
        {/* Pure CSS animation (not Swiper autoplay) so it scrolls
            continuously with zero pause/snap between logos. The track is
            the logo list duplicated once and shifted by exactly -50%, which
            is what makes the loop seamless regardless of item width or
            screen size. */}
        <div className="overflow-hidden">
          <div className="partners-marquee-content">
            {[...partnerLogos, ...partnerLogos].map((partner, index) => (
              <div
                key={index}
                aria-hidden={index >= partnerLogos.length}
                className="relative h-11 sm:h-14 md:h-16 w-[64px] sm:w-[78px] md:w-[92px] shrink-0 mr-[10px] sm:mr-[15px] md:mr-[20px] overflow-hidden"
              >
                <Image
                  src={partner.url}
                  alt={partner.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Button */}
      <div className="flex justify-center md:hidden py-8 bg-white">
        <Button
          variant="primary"
          href="/partner"
          className="px-9 py-3.5 rounded-full text-sm w-fit mx-auto text-center flex justify-center"
        >
          Partner with Us
        </Button>
      </div>
    </section>
  );
}
