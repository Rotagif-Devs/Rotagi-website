"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPrograms } from "@/lib/programs";

export default function Programs() {
  const programs = getAllPrograms();

  return (
    <section className="md:py-20 bg-secondary flex justify-center">
      <div className="relative mx-4 w-full max-w-7xl  px-4 ">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-white">Our Programs</h2>
          <p className="mx-auto mt-6 max-w-xl text-white">
            Age-appropriate learning pathways designed to build skills,
            confidence, and leadership at every stage.
          </p>
        </div>

        <div className="mx-auto rounded-[14px] bg-brown px-6 py-5 md:px-[27px] md:pt-[19px] md:pb-[31px]">
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
            {programs.map((prog, i) => (
              <div
                key={prog.name}
                className={`group flex flex-col ${i < programs.length - 1 ? "lg:border-r lg:border-white/20 lg:pr-8" : ""} ${i > 0 ? "lg:pl-8" : ""}`}
              >
                <div className="relative mb-6 h-64 overflow-hidden rounded-2xl">
                  <Image
                    width={500}
                    height={500}
                    src={prog.image}
                    alt={prog.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute right-4 top-4 inline-flex h-6 w-[95px] items-center justify-center rounded-br-[8px] rounded-tl-[8px] bg-accent0 text-xs font-bold text-brown">
                    {prog.ageRange}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center text-center">
                  <h3 className="mb-3  text-white capitalize">{prog.name}</h3>
                  <p className="mb-6  text-white/80 line-clamp-3">
                    {prog.tagline}
                  </p>
                  <Link href={`/programs/${prog.slug}`} className="mt-auto">
                    <Button
                      variant="ghost"
                      className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-pink-200"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile slider */}
          <div className="lg:hidden">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
              slidesPerView={1}
              spaceBetween={16}
              className="pb-12"
            >
              {programs.map((prog) => (
                <SwiperSlide key={prog.name}>
                  <div className="group flex flex-col">
                    <div className="relative mb-6 h-64 overflow-hidden rounded-2xl">
                      <Image
                        width={500}
                        height={500}
                        src={prog.image}
                        alt={prog.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute right-4 top-4 inline-flex h-6 w-[95px] items-center justify-center rounded-br-[8px] rounded-tl-[8px] bg-accent0 text-xs font-bold text-brown">
                        {prog.ageRange}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-center px-4 text-center">
                      <h3 className="mb-3  text-white capitalize">
                        {prog.name}
                      </h3>
                      <p className="mb-6  text-white/80">{prog.tagline}</p>
                      <Link href={`/programs/${prog.slug}`} className="mt-auto">
                        <Button
                          variant="ghost"
                          className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-pink-200"
                          style={{ fontSize: "18px" }}
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-6 lg:hidden">
          <button
            className="swiper-prev rounded-full bg-white/10 p-4 text-white transition hover:text-pink-200 backdrop-blur-sm border-2 border-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            className="swiper-next rounded-full bg-white/10 p-4 text-white transition hover:text-pink-200 backdrop-blur-sm  border-2 border-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
}
