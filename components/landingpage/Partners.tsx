"use client";

import Button from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const partnerLogos = [
  { name: "Skrill", url: "/Skrill.svg", color: "bg-green-600" },
  { name: "PayPass", url: "/PayPass.svg", color: "bg-amber-500" },
  { name: "Apple Pay", url: "/ApplePay.svg", color: "bg-blue-600" },
  { name: "Skrill", url: "/Skrill.svg", color: "bg-teal-500" },
  { name: "PayPass", url: "/PayPass.svg", color: "bg-pink-500" },
  { name: "Apple Pay", url: "/ApplePay.svg", color: "bg-red-600" },
  { name: "Skrill", url: "/Skrill.svg", color: "bg-purple-600" },
  { name: "PayPass", url: "/PayPass.svg", color: "bg-orange-500" },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-16 lg:py-24 px-6 lg:px-8 flex justify-center"
    >
      <div className="flex w-full max-w-7xl flex-col gap-24">
        {/* Title + description + button area */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <h2 className="text-black max-w-[486px] font-cal-sans font-normal text-4xl md:text-5xl leading-tight">
            Trusted by Purpose Driven Organizations
          </h2>

          <div className="flex flex-col items-start gap-8 max-w-[580px]">
            <p className="text-gray-600 font-dm-sans font-normal text-base leading-relaxed text-justify md:text-left">
              We collaborate with partners who believe in measurable impact,
              inclusive growth, and empowering the next generation of African
              women.
            </p>

            <Button
              variant="primary"
              href="/partner"
              className="px-9 py-3.5 rounded-full"
            >
              Partner with Us
            </Button>
          </div>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="w-full"
          >
            {partnerLogos.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-16 flex items-center justify-center transition-all duration-300">
                  <div
                    className={`w-40 h-16 sm:w-48 sm:h-20 ${partner.color}`}
                    style={{
                      WebkitMaskImage: `url('${partner.url}')`,
                      WebkitMaskSize: "contain",
                      WebkitMaskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      maskImage: `url('${partner.url}')`,
                      maskSize: "contain",
                      maskPosition: "center",
                      maskRepeat: "no-repeat",
                    }}
                    title={partner.name}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
