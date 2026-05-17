"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface UpdateItem {
  category: string;
  title: string;
  desc: string;
  image: string;
  linkText: string;
  href: string;
}

export default function UpdatesClient({ updates }: { updates: UpdateItem[] }) {
  return (
    <>
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {updates.map((update) => (
          <div
            key={update.title}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white"
          >
            <div className="relative overflow-hidden">
              <Image
                width={400}
                height={220}
                src={update.image}
                alt={update.title}
                className="m-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col p-6 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-red-500 text-xs font-semibold font-dm-sans tracking-wider uppercase">
                  {update.category}
                </span>
                <h3 className="text-black font-cal-sans text-xl capitalize leading-8">
                  {update.title}
                </h3>
                <p className="text-gray-600 font-dm-sans text-base leading-relaxed line-clamp-2">
                  {update.desc}
                </p>
              </div>

              <Link
                href={update.href}
                className="flex items-center gap-4 text-secondary font-semibold font-dm-sans group-hover:gap-6 transition-all"
              >
                {update.linkText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden relative -mx-6 px-6">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".updates-prev",
            nextEl: ".updates-next",
          }}
          slidesPerView={1.2}
          spaceBetween={16}
          className="pb-4"
        >
          {updates.map((update) => (
            <SwiperSlide key={update.title}>
              <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white h-full">
                <div className="relative overflow-hidden">
                  <Image
                    width={400}
                    height={220}
                    src={update.image}
                    alt={update.title}
                    className="m-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col p-6 gap-4 flex-1">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-red-500 text-xs font-semibold font-dm-sans tracking-wider uppercase">
                      {update.category}
                    </span>
                    <h3 className="text-black font-cal-sans text-xl capitalize leading-8">
                      {update.title}
                    </h3>
                    <p className="text-gray-600 font-dm-sans text-base leading-relaxed line-clamp-2">
                      {update.desc}
                    </p>
                  </div>

                  <Link
                    href={update.href}
                    className="mt-auto flex items-center gap-4 text-secondary font-semibold font-dm-sans"
                  >
                    {update.linkText}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons for Mobile */}
        <div className="mt-6 lg:mt-12 flex justify-end gap-3 lg:gap-6 lg:px-8 px-6">
          <button
            className="updates-prev flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-secondary/20 transition hover:bg-secondary/20"
            aria-label="Previous update"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          <button
            className="updates-next flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-secondary/20 transition hover:bg-secondary/20"
            aria-label="Next update"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
