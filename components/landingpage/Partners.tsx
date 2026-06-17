"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const partnerLogos = [
  { name: "Selex Engineering", url: "/partner1.png" },
  { name: "Ed Tech", url: "/partner2.png" },
  { name: "CICN", url: "/partner1.png" },
  { name: "Daptem Engineering", url: "/Daptem.png" },
  { name: "Canva", url: "/canva.png" },
  { name: "Tushiyah", url: "/Tushiyah.png" },
  { name: "Microsoft", url: "/microsoft.png" },
  { name: "Three Lions Group", url: "/royal.png" },
  { name: "Slack", url: "/slack.png" },
  { name: "Infinityfield", url: "/Infinityfield.png" },
  { name: "monday.com", url: "/monday.png" },
  { name: "little", url: "/little.jpg" },

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
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
            className="pb-4"
          >
            {partnerLogos.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center gap-4 justify-center">
                  <Image
                    src={partner.url}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="object-cover w-full transition-all md:h-32 lg:h-28 rounded-3xl duration-300"
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
