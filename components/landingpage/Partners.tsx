"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Each logo image is a fully opaque file (only DC Donates is a real
// transparent PNG) with its own baked-in background color — `bg` is that
// color sampled from the image itself, so every tile gets a consistent
// rounded card treatment using its own proper background instead of one
// flat color for everyone.
const partnerLogos = [
  { name: "Selex Engineering", url: "/partner1.png", bg: "#E1DCED" },
  { name: "Ed Tech", url: "/partner2.png", bg: "#DCDCCE" },
  { name: "CICN", url: "/partner3.jpg", bg: "#F4F6F8" },
  { name: "Daptem Engineering", url: "/partner4.jpg", bg: "#F4EFEC" },
  { name: "Canva", url: "/partner5.jpg", bg: "#0A0440" },
  { name: "Tushiyah", url: "/partner6.jpg", bg: "#152F47" },
  { name: "Three Lions Group", url: "/partner7.jpg", bg: "#331436" },
  { name: "Slack", url: "/partner8.jpg", bg: "#BE0C0D" },
  { name: "Infinityfield", url: "/partner9.jpg", bg: "#4086DC" },
  { name: "monday.com", url: "/partner10.jpg", bg: "#E8EDF2" },
  { name: "little", url: "/partner11.jpg", bg: "#562556" },
  { name: "Make", url: "/partner12.jpg", bg: "#F1EDF2" },
  { name: "DC Donates", url: "/partner13.png", bg: "#000000" },
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
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
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
                <div className="flex items-center justify-center h-32 sm:h-36 md:h-40 lg:h-40">
                  <div
                    className="flex items-center justify-center w-full h-full max-w-[90%] md:max-w-[220px] rounded-2xl p-4"
                    style={{ backgroundColor: partner.bg }}
                  >
                    <Image
                      src={partner.url}
                      alt={partner.name}
                      width={250}
                      height={150}
                      className="object-contain w-auto h-auto max-h-full max-w-full transition-all duration-300"
                    />
                  </div>
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
