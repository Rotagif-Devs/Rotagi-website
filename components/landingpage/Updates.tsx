"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Link } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";

const updates = [
  // ... (omitting for brevity in this chunk, but this is a replacement starting from line 3)
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
    <section
      className="bg-primary py-16 lg:py-24 px-4 lg:px-8 flex justify-center border-t border-black/5"
      id="updates"
    >
      <div className="flex w-full max-w-7xl flex-col gap-12 md:gap-20">
        {/* Title + description + button area */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <h2 className="text-black max-w-lg font-cal-sans lowercase leading-tight">
            Updates from the Work That Matters
          </h2>

          <div className="flex flex-col items-start gap-8 max-w-2xl">
            <p className="text-gray-700 text-lg md:text-xl font-dm-sans leading-relaxed">
              Program highlights, impact milestones, and how we’re advancing
              opportunity and digital empowerment.
            </p>

            <div className="hidden md:block">
              <Button href="/updates" variant="primary" className="px-10 py-4">
                View All
              </Button>
            </div>
          </div>
        </div>

        {/* Cards / Slider section */}
        <div className="relative">
          {/* Desktop layout – 3 cards side by side */}
          <div className="hidden md:flex md:gap-8 md:justify-between">
            {updates.map((update) => (
              <div
                key={update.title}
                className="group flex w-full max-w-[414px] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow px-6 pb-6"
              >
                <div className="h-[240px] w-full overflow-hidden mb-4">
                  <Image
                    width={414}
                    height={240}
                    src={update.image}
                    alt={update.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-orange">
                    {update.category}
                  </span>

                  <h3 className="text-black font-cal-sans text-2xl lowercase leading-snug group-hover:text-secondary transition-colors">
                    {update.title}
                  </h3>

                  <p className="line-clamp-3 text-gray-600 font-dm-sans leading-relaxed">
                    {update.desc}
                  </p>

                  <div className="mt-auto pt-4">
                    <span className="flex items-center gap-2 text-base font-bold text-secondary group-hover:gap-4 transition-all">
                      <Button
                        withArrow
                        size="none"
                        className="py-2"
                        variant="ghost"
                        href="/updates"
                      >
                        {update.linkText}
                      </Button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swiper with partial peek */}
          <div className="md:hidden">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1.1}
              spaceBetween={16}
              grabCursor={true}
              className="pb-10"
              navigation={{
                prevEl: ".upd-prev",
                nextEl: ".upd-next",
              }}
            >
              {updates.map((update) => (
                <SwiperSlide key={update.title}>
                  <div className="overflow-hidden rounded-2xl bg-white shadow-sm h-full flex flex-col  px-4 pb-2">
                    <div className="h-[200px] w-full overflow-hidden mb-4">
                      <Image
                        width={400}
                        height={220}
                        src={update.image}
                        alt={update.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        {update.category}
                      </span>

                      <h3 className="text-black font-cal-sans text-xl lowercase leading-snug">
                        {update.title}
                      </h3>

                      <p className="line-clamp-3 text-gray-600 font-dm-sans text-sm leading-relaxed">
                        {update.desc}
                      </p>

                      <div className="mt-auto">
                        <span className="flex items-center gap-2 text-base font-bold text-secondary mb-3">
                          <Button
                            withArrow
                            size="none"
                            className="py-2"
                            variant="ghost"
                            href="/updates"
                          >
                            {update.linkText}
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-8 flex justify-end gap-3">
              <button className="upd-prev flex h-16 w-16 items-center justify-center rounded-full bg-secondary/60 border border-white text-black transition hover:bg-black/10 border border-black/10">
                <ChevronLeft className="h-10 w-10 text-white" />
              </button>
              <button className="upd-next flex h-16 w-16 items-center justify-center rounded-full bg-secondary/60 border border-white text-black transition hover:bg-black/10 border border-black/10">
                <ChevronRight className="h-10 w-10 text-white" />
              </button>
            </div>
          </div>

          {/* Button below on mobile */}
          <div className="mt-10 flex justify-center md:hidden">
            <Button href="/updates" variant="primary" className="px-10 py-4">
              View All
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
