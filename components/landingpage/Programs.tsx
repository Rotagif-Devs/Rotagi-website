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
      className="py-14 lg:rounded-3xl lg:mx-6 lg:mb-20 bg-secondary flex justify-center pl-6 lg:px-16"
    >
      <div className="relative w-full max-w-8xl">
        <div className="hidden md:block mx-auto my-10 lg:mb-20 max-w-3xl text-center">
          <h2 className="text-white font-cal-sans lowercase">Our Programs</h2>
          <p className="mx-auto mt-6 max-w-2xl text-white/70 text-lg md:text-xl font-dm-sans leading-relaxed">
            Age-appropriate learning pathways designed to build skills,
            confidence, and leadership at every stage.
          </p>
        </div>

        {/* mobile header */}
        <div className="md:hidden flex flex-col text-center justify-center items-center mb-6 mr-6">
          <h2 className="text-white font-cal-sans lowercase">Our Programs</h2>
          <p className="mx-auto mt-6 max-w-2xl text-white/90 text-lg md:text-xl font-dm-sans leading-loose text-center">
            Age-appropriate learning pathways designed to build skills,
            confidence, and leadership at every stage.
          </p>
        </div>

        <div className="mx-auto rounded-tl-3xl rounded-bl-3xl lg:rounded-3xl bg-white pl-4 py-8 md:px-6 md:py-16">
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
            {programs.map((prog, i) => (
              <div
                key={prog.name}
                className="group relative flex flex-col pl-4"
              >
                {i > 0 && (
                  <div className="absolute left-0 top-[18%] h-[60%] w-[1px] bg-black/20" />
                )}

                <div className="relative mb-8 h-80 overflow-hidden lg:rounded-[24px]">
                  <Image
                    width={500}
                    height={500}
                    src={prog.image}
                    alt={prog.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 lg:mt-8"
                  />
                  <span className="absolute right-2 top-4 inline-flex h-8 items-center justify-center rounded-tl-2xl rounded-br-2xl bg-[#F8BBD0] text-[14px] font-bold uppercase tracking-wider text-[#3B0D25] px-4">
                    {prog.ageRange}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center text-center">
                  <h3 className="mb-4 text-black font-cal-sans text-2xl lowercase leading-tight">
                    {prog.name}
                  </h3>
                  <p className="mb-8 text-black/70 font-dm-sans font-light leading-relaxed line-clamp-3">
                    {prog.tagline}
                  </p>
                  <Link href={`/programs/${prog.slug}`} className="mt-auto">
                    <Button
                      variant="ghost"
                      withArrow
                      className="inline-flex items-center gap-2 font-bold  text-2xl text-secondary transition-all hover:gap-4 hover:bg-secondary/10 px-6 py-2 rounded-full border-none hover:bg-secondary/10"
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
                    <div className="absolute -left-[4%] top-[18%] h-[60%] w-[1px] bg-black/20" />
                  )}
                  <div className="group flex flex-col pl-2">
                    <div className="relative mb-8 h-64 overflow-hidden rounded-[24px]">
                      <Image
                        width={500}
                        height={500}
                        src={prog.image}
                        alt={prog.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute right-4 top-0 inline-flex h-8 w-[100px] items-center justify-center rounded-tl-2xl font-dm-sans rounded-br-2xl bg-[#F8BBD0] text-[12px] font-bold tracking-wider text-[#3B0D25]">
                        {prog.ageRange}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-center text-center">
                      <h3 className="mb-4 text-black font-cal-sans text-2xl lowercase leading-tight">
                        {prog.name}
                      </h3>
                      <p className="mb-2 text-black/80 font-dm-sans font-light leading-relaxed">
                        {prog.tagline}
                      </p>
                      <Link href={`/programs/${prog.slug}`} className="mt-auto">
                        <Button
                          variant="ghost"
                          withArrow
                          className="inline-flex items-center gap-2 text-xl font-bold text-secondary transition-all px-8 py-3 rounded-full border-none hover:bg-secondary/10"
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
        <div className="mt-8 flex md:hidden justify-end gap-3 px-6">
          <button
            className="prog-prev flex h-14 w-14 items-center justify-center rounded-full bg-white/20 border-2 border-white text-black transition hover:bg-black/10 border border-black/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          <button
            className="prog-next flex h-14 w-14 items-center justify-center rounded-full bg-white/20 border-2 border-white text-black transition hover:bg-black/10 border border-black/10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
