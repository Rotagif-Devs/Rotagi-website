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
    <section className="bg-primary py-16 md:py-20 flex justify-center">
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + text + button area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="text-black md:max-w-[486px] ">
            Access That Creates Impact
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className=" text-black">
              Since 2020, ROTAGIF has equipped hundreds of girls and women with skills that translate into confidence, careers, and community transformation across Africa.
            </p>

            {/* Button only on mobile in top section (hidden on md+) */}
            <div className="md:hidden w-full sm:w-auto">
              <Button variant="secondary" href="/programs" className="">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Stats content */}
        <div className="relative">
          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-[270px] flex-col items-center justify-center gap-4 rounded-[40px] bg-white px-12 py-14 md:px-[59px] md:py-14"
              >
                <div className="font-cal-sans text-[5rem] font-light leading-none text-gray-500 lg:text-[96px]">
                  {stat.num}
                </div>
                <div className="font-dm-sans text-lg text-center text-gray-500 md:text-[18px] md:leading-[140%]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Swiper with partial next-card peek */}
          <div className="md:hidden ">
            <Swiper
              slidesPerView={1.25}   
              spaceBetween={50}
              centeredSlides={false}
              initialSlide={0}
              grabCursor={true}
              className="pb-4"
            >
              {stats.map((stat) => (
                <SwiperSlide key={stat.label}>
                  <div className="mx-auto h-[240px] w-[85vw] max-w-[320px] rounded-[32px] bg-white px-8 py-10 flex flex-col items-center justify-center gap-3">
                    <div className="font-cal-sans text-6xl font-light leading-none text-gray-500 xs:text-7xl">
                      {stat.num}
                    </div>
                    <div className="font-dm-sans text-base leading-[140%] text-center text-gray-500">
                      {stat.label}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Learn More button below slider on mobile */}
          <div className="mt-10 flex justify-center md:hidden">
            <Button href="/programs" variant="secondary" className="">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}