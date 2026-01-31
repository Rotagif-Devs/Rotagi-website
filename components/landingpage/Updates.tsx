"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const updates = [
  {
    category: "SUCCESS STORY",
    title: "How AI Changed My Career Path",
    desc: "Meet Amina, a She Ascend graduate who transitioned from teaching to AI product management.",
    image: "/img-5.png",
    linkText: "Read Story",
  },
  {
    category: "COMMUNITY IMPACT",
    title: "Beginner's Guide To AI Literacy",
    desc: "A comprehensive guide for educators introducing AI concepts to parents and young learners.",
    image: "/img-5.png",
    linkText: "Download Guide",
  },
  {
    category: "EVENT RECAP",
    title: "SHE Empower 2026 Highlights",
    desc: "Recap of our annual conference featuring workshops, mentorship sessions, and inspiring talks.",
    image: "/img-5.png",
    linkText: "Watch Recap",
  },
];

export default function Updates() {
  return (
    <section className="bg-[var(--color-primary)] py-16 md:py-20 flex justify-center" id="updates">
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + description + button area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="font-[var(--font-cal-sans)] text-[var(--color-dark)] text-4xl font-semibold leading-tight tracking-tight md:max-w-[486px] md:text-[46px]">
            Updates from the Work That Matters
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="font-[var(--font-dm-sans)] text-[var(--color-darkgray)] text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
              Program highlights, impact milestones, and how we’re advancing opportunity and digital empowerment.
            </p>

            {/* Button visible only on desktop in top right */}
            <div className="hidden md:block">
              <button className="rounded-full bg-[var(--color-secondary)] px-8 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-white transition hover:bg-[var(--color-tertiary)]">
                View All Updates
              </button>
            </div>
          </div>
        </div>

        {/* Cards / Slider section */}
        <div className="relative">
          {/* Desktop layout – 3 cards side by side */}
          <div className="hidden md:flex md:gap-6 md:justify-between">
            {updates.map((update) => (
              <div
                key={update.title}
                className="group flex w-full max-w-[414px] flex-col overflow-hidden rounded-[15px] border border-gray-200 bg-white"
              >
                <div className="h-[220px] w-full overflow-hidden rounded-t-[10px]">
                  <img
                    src={update.image}
                    alt={update.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 px-4 py-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] font-[var(--font-dm-sans)]">
                    {update.category}
                  </span>

                  <h3 className="font-[var(--font-cal-sans)] text-xl font-normal leading-tight text-[var(--color-dark)] transition-colors group-hover:text-[var(--color-secondary)] md:text-2xl">
                    {update.title}
                  </h3>

                  <p className="line-clamp-3 font-[var(--font-dm-sans)] text-sm leading-relaxed text-[var(--color-darkgray)] md:text-base md:leading-[160%]">
                    {update.desc}
                  </p>

                  <div className="mt-auto">
                    <span className="flex items-center gap-2 text-base font-bold text-[var(--color-secondary)] transition-all group-hover:gap-3">
                      {update.linkText} <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swiper with partial peek */}
          <div className="md:hidden">
            <Swiper
              slidesPerView={1.18}
              spaceBetween={50}
              grabCursor={true}
              className="pb-8"
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
            >
              {updates.map((update) => (
                <SwiperSlide key={update.title}>
                  <div className="mx-auto h-[440px] w-[82vw] max-w-[340px] overflow-hidden rounded-[15px] border border-gray-200 bg-white">
                    <div className="h-[200px] w-full overflow-hidden rounded-t-[10px]">
                      <img
                        src={update.image}
                        alt={update.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] font-[var(--font-dm-sans)]">
                        {update.category}
                      </span>

                      <h3 className="font-[var(--font-cal-sans)] text-xl font-normal leading-tight text-[var(--color-dark)] transition-colors group-hover:text-[var(--color-secondary)]">
                        {update.title}
                      </h3>

                      <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-darkgray)] font-[var(--font-dm-sans)]">
                        {update.desc}
                      </p>

                      <div className="mt-auto">
                        <span className="flex items-center gap-2 text-base font-bold text-[var(--color-secondary)] transition-all group-hover:gap-3">
                          {update.linkText} <span>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

           <div className="mt-6 flex justify-end gap-6 lg:hidden">
              <button className="swiper-prev rounded-full p-4 text-white transition hover:text-pink-200 bg-accent0 backdrop-blur-sm border-2 border-white">
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button className="swiper-next rounded-full p-4  bg-[var(--color-accent0)] text-white transition hover:text-pink-200 backdrop-blur-sm  border-2 border-white">
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>

          {/* Button below on mobile */}
          <div className="mt-10 flex justify-center md:hidden">
            <button className="rounded-full bg-[var(--color-secondary)] px-10 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-white transition hover:bg-[var(--color-tertiary)]">
              View All
            </button>
          </div>
        </div>
       
      </div>
    </section>
  );
}