"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";

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
    <section
      id="partners"
      className="py-8 lg:py-16 px-6 lg:px-8 flex justify-center overflow-hidden"
    >
      <div className="flex w-full max-w-11/12 flex-col gap-12 md:gap-24">
        {/* Title + description + button area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
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

        {/* Partners Slider (Desktop + Mobile Responsive) */}
        <div className="-mx-6 px-6">
          <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={{ enabled: true, momentum: false }}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={7000}
            allowTouchMove={false}
            loop={true}
            spaceBetween={10}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="pb-4"
          >
            {partnerLogos.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-32 sm:h-36 md:h-40 lg:h-40 w-full max-w-[90%] md:max-w-[220px] mx-auto overflow-hidden">
                  <Image
                    src={partner.url}
                    alt={partner.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile Button */}
        <div className="flex justify-center md:hidden mt-2">
          <Button
            variant="primary"
            href="/partner"
            className="px-9 py-3.5 rounded-full text-sm w-fit mx-auto text-center flex justify-center"
          >
            Partner with Us
          </Button>
        </div>
      </div>
    </section>
  );
}
