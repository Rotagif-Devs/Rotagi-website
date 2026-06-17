"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section
      id="programs"
      className="py-14 lg:rounded-2xl lg:mx-6 lg:mb-12 bg-secondary flex justify-center pl-6 lg:px-8"
    >
      <div className="relative w-full max-w-8xl">
        <div className="hidden md:block mx-auto my-6 lg:mb-20 max-w-3xl text-center">
          <h2 className="text-white font-cal-sans uppercase">Our Programs</h2>
          <p className="mx-auto mt-6 max-w-2xl text-white/80 text-lg md:text-xl font-dm-sans leading-loose lg:leading-relaxed">
            Age appropriate learning pathways designed to build skills,
            confidence, and leadership at every stage.
          </p>
        </div>

        {/* mobile header */}
        <div className="md:hidden flex flex-col text-center justify-center items-center mb-6 mr-6">
          <h2 className="text-white font-cal-sans uppercase text-4xl">
            Our Programs
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-white/90 text-lg md:text-xl font-dm-sans leading-loose text-center">
            Age appropriate learning pathways designed to build skills,
            confidence, and leadership at every stage.
          </p>
        </div>

        <div className="mx-auto rounded-tl-2xl rounded-bl-2xl lg:rounded-2xl bg-white p-8 md:p-8 lg:p-8 xl:p-8">
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
            {programs.map((prog, i) => (
              <div
                key={prog.name}
                className="group relative flex flex-col pl-4"
              >
                {i > 0 && (
                  <div className="absolute left-0 top-[18%] h-[60%] w-px bg-black/20" />
                )}

                <div className="relative mb-8 h-[22rem] overflow-hidden lg:rounded-[24px]">
                  <Image
                    width={500}
                    height={500}
                    src={prog.image}
                    alt={prog.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 lg:mt-6"
                  />
                  <span className="absolute right-3 top-5 inline-flex items-center justify-center rounded-tl-xl rounded-br-xl rounded-tr-none rounded-bl-none bg-secondary/30 font-['Inter'] font-bold text-[12px] leading-[20px] tracking-normal text-black px-4 py-1">
                    {prog.ageRange}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center text-center">
                  <h3 className="mb-3.5 text-black font-cal-sans font-normal text-xl uppercase leading-4">
                    {prog.name}
                  </h3>
                  <p className="mb-5 text-gray-600 font-dm-sans font-normal text-[15px] leading-6">
                    {prog.tagline}
                  </p>
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="mt-auto inline-flex items-center gap-4 text-secondary font-semibold font-inter hover:gap-6 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
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
                prevEl: ".prog-prev",
                nextEl: ".prog-next",
              }}
              slidesPerView={1.3}
              spaceBetween={26}
              className="pb-12"
            >
              {programs.map((prog, i) => (
                <SwiperSlide key={prog.name}>
                  {i > 0 && (
                    <div className="absolute -left-[4%] top-[18%] h-[60%] w-px bg-black/20" />
                  )}
                  <div className="group flex flex-col pl-2">
                    <div className="relative mb-8 h-64 overflow-hidden rounded-[24px]">
                      <Image
                        width={500}
                        height={500}
                        src={prog.image}
                        alt={prog.name}
                        className="h-full w-full object-cover object-top"
                      />
                      <span className="absolute right-3 top-4 inline-flex h-8 items-center justify-center rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm bg-secondary/30 font-['Inter'] font-bold text-[12px] leading-[20px] tracking-normal text-black px-5 py-1">
                        {prog.ageRange}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-center text-center">
                      <h3 className="mb-4 text-black font-cal-sans font-normal text-[22px] leading-[18px] tracking-[-0.2px] uppercase">
                        {prog.name}
                      </h3>
                      <p className="mb-4 text-gray-600 font-dm-sans font-normal text-[15px] leading-6">
                        {prog.description.split(".")[0]}.
                      </p>
                      <Link
                        href={`/programs/${prog.slug}`}
                        className="mt-auto inline-flex items-center gap-4 text-pink-400 font-semibold font-inter"
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="mt-8 flex md:hidden justify-end gap-3 lg:gap-6 lg:px-8 px-6">
          <button
            className="prog-prev flex h-14 w-14 items-center justify-center border-2 border-white rounded-full bg-primary/50 transition hover:bg-secondary/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          <button
            className="prog-next flex h-14 w-14 items-center justify-center border-2 border-white  rounded-full bg-primary/50 transition hover:bg-secondary/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
