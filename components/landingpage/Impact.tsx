"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "@/components/ui/Button";
// import "swiper/css/navigation"; // uncomment if you add arrows later

const stats = [
  { num: "300 +", label: "Girls Reached" },
  { num: "15 +", label: "Programs" },
  { num: "10 +", label: "Communities" },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="bg-primary py-16 lg:py-24 px-6 lg:px-8 flex justify-center"
    >
      <div className="flex w-full max-w-7xl flex-col gap-12 md:gap-20">
        {/* Title + text + button area */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between mt-8">
          <h2 className="text-black max-w-lg lg:w-[45%] w-10/12 font-cal-sans font-normal text-3xl md:text-[46px] leading-[100%] tracking-normal">
            Access That Creates Impact
          </h2>

          <div className="flex flex-col items-start gap-8 max-w-2xl">
            <p className="text-gray-700 font-dm-sans font-normal text-[16px] leading-[133%] tracking-normal text-justify md:text-left lg:text-justify lg:pr-8">
              Since 2020, ROTAGI has equipped hundreds of girls and women with
              skills that translate into confidence, careers, and community
              transformation across Africa.
            </p>

            <div className="hidden md:block">
              <Button variant="primary" href="/about" className="px-10 py-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Stats content */}
        <div className="relative">
          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-[300px] flex-col items-center justify-center gap-6 rounded-[48px] bg-white px-10 py-16 hover:shadow-md transition-shadow"
              >
                <span className="font-thin leading-none text-black/40 lg:text-[96px]">
                  {stat.num}
                </span>
                <span className="font-dm-sans text-lg text-center text-black/30 md:text-[18px] md:leading-[140%] font-thin">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: Swiper with partial next-card peek */}
          <div className="md:hidden">
            <Swiper
              slidesPerView={1.2}
              spaceBetween={24}
              grabCursor={true}
              className="pb-10"
            >
              {stats.map((stat) => (
                <SwiperSlide key={stat.label}>
                  <div className="h-[220px] rounded-[40px] bg-white px-8 py-12 flex flex-col items-center justify-center gap-6">
                    <span className="text-[55.3px] font-thin leading-none text-black/40">
                      {stat.num}
                    </span>
                    <span className="font-dm-sans text-xl text-black/40 text-center font-thin capitalize">
                      {stat.label}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Learn More button below slider on mobile */}
          <div className="mt-12 flex justify-center md:hidden">
            <Button href="/about" variant="primary" className="px-10 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
