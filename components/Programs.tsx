"use client";

import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const programs = [
  { age: "Ages 10-12", name: "She Ignite", desc: "Building foundational AI awareness and digital literacy for young girls through interactive learning and hands-on projects.", img: "/img-1.png" },
  { age: "Ages 13-15", name: "She Blossom", desc: "Developing deeper technical skills and critical thinking through AI applications, coding basics, and problem-solving.", img: "/img-2.png" },
  { age: "Ages 16-18", name: "She Blaze", desc: "Advanced AI learning, leadership development, and career preparation for young women ready to lead in technology.", img: "/img-3.png" },
  { age: "Ages 18-40", name: "She Ascend", desc: "Professional AI skills training, entrepreneurship support, and career advancement for African women in tech.", img: "/img-4.png" },
];

export default function Programs() {
  return (
    <section className="bg-[var(--color-primary)] md:py-20 flex justify-center">
      <div className="relative mx-4 w-full max-w-7xl md:rounded-[19px] bg-[var(--color-secondary)] px-4 pb-[55px] pt-[55px]">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-cal-sans text-5xl leading-none tracking-tight text-white">
            Our Programs
          </h2>
          <p className="mx-auto mt-6 max-w-[590px] font-dm-sans text-lg leading-[35px] tracking-[-0.01em] text-white">
            Age-appropriate learning pathways designed to build skills, confidence, and leadership at every stage.
          </p>
        </div>

        <div className="mx-auto rounded-[14px] bg-[var(--color-text-brown)] px-6 py-5 md:px-[27px] md:pt-[19px] md:pb-[31px]">
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
            {programs.map((prog, i) => (
              <div
                key={prog.name}
                className={`group flex flex-col ${i < programs.length - 1 ? "lg:border-r lg:border-white/20 lg:pr-8" : ""} ${i > 0 ? "lg:pl-8" : ""}`}
              >
                <div className="relative mb-6 h-64 overflow-hidden rounded-2xl">
                  <img
                    src={prog.img}
                    alt={prog.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute right-4 top-4 inline-flex h-6 w-[95px] items-center justify-center rounded-br-[8px] rounded-tl-[8px] bg-[var(--color-accent0)] text-xs font-bold text-[var(--color-text-brown)]">
                    {prog.age}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center text-center">
                  <h3 className="mb-3 font-cal-sans text-[22px] font-normal leading-[22px] tracking-[-0.2px] text-white capitalize">
                    {prog.name}
                  </h3>
                  <p className="mb-6 font-dm-sans text-[15px] leading-[25px] tracking-[-0.2px] text-white/80">
                    {prog.desc}
                  </p>
                  <a
                    href="#"
                    className="mt-auto inline-flex items-center gap-2 font-semibold text-white transition hover:text-pink-200"
                    style={{ fontSize: "18px" }}
                  >
                    Learn More <ArrowRightIcon className="h-5 w-5" />
                  </a>
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
                      <img
                        src={prog.img}
                        alt={prog.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute right-4 top-4 inline-flex h-6 w-[95px] items-center justify-center rounded-br-[8px] rounded-tl-[8px] bg-[var(--color-accent0)] text-xs font-bold text-[var(--color-text-brown)]">
                        {prog.age}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-center px-4 text-center">
                      <h3 className="mb-3 font-cal-sans text-[22px] font-normal leading-[22px] tracking-[-0.2px] text-white capitalize">
                        {prog.name}
                      </h3>
                      <p className="mb-6 font-dm-sans text-[15px] leading-[25px] tracking-[-0.2px] text-white/80">
                        {prog.desc}
                      </p>
                      <a
                        href="#"
                        className="mt-auto inline-flex items-center gap-2 font-semibold text-white transition hover:text-pink-200"
                        style={{ fontSize: "18px" }}
                      >
                        Learn More <ArrowRightIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

           
          </div>
          
        </div>

         <div className="mt-6 flex justify-end gap-6 lg:hidden">
              <button className="swiper-prev rounded-full bg-white/10 p-4 text-white transition hover:text-pink-200 backdrop-blur-sm border-2 border-white" aria-label="Previous slide">
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button className="swiper-next rounded-full bg-white/10 p-4 text-white transition hover:text-pink-200 backdrop-blur-sm  border-2 border-white" aria-label="Next slide">
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
      </div>
    </section>
  );
}