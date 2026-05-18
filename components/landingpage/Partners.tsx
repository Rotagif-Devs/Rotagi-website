"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const partnerLogos = [
  { name: "Selex Engineering", url: "/partner-1.png" },
  { name: "Ed Tech", url: "/partner-2.png" },
  { name: "CICN", url: "/partner-3.png" },
  { name: "Daptem Engineering", url: "/partner-4.png" },
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

        {/* Desktop Grid */}
        <div className="hidden md:flex w-full flex-wrap justify-center items-center gap-8 lg:gap-4">
          {partnerLogos.map((partner, index) => (
            <div
              key={index}
              className="flex items-center transition-all duration-300"
            >
              <Image
                src={partner.url}
                alt={partner.name}
                width={200}
                height={300}
                className="object-contain h-20 md:h-24 lg:h-26 w-full"
              />
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden -mx-6 px-6">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={2}
            className="pb-4"
          >
            {partnerLogos.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center h-24">
                  <Image
                    src={partner.url}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="object-contain h-16 w-full"
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
