"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";

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
    <section className="bg-primary py-16 md:py-20 flex justify-center" id="updates">
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + description + button area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className=" text-dark  md:max-w-[486px] md:text-[46px]">
            Updates from the Work That Matters
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="text-darkgray text-left ">
              Program highlights, impact milestones, and how we’re advancing opportunity and digital empowerment.
            </p>

            {/* Button visible only on desktop in top right */}
            <div className="hidden md:block">
              <button className="rounded-full bg-secondary px-8 py-3.5 text-base font-semibold text-white transition hover:bg-tertiary">
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
                  <Image
                    width={414}
                    height={220}
                    src={update.image}
                    alt={update.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 px-4 py-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {update.category}
                  </span>

                  <h3 className="text-dark transition-colors group-hover:text-secondary">
                    {update.title}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-relaxed text-darkgray md:text-base md:leading-[160%]">
                    {update.desc}
                  </p>

                  <div className="mt-auto">
                    <span className="flex items-center gap-2 text-base font-bold text-secondary transition-all group-hover:gap-3">
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
                      <Image
                        width={340}
                        height={200}
                        src={update.image}
                        alt={update.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        {update.category}
                      </span>

                      <h3 className=" text-dark transition-colors group-hover:text-secondary">
                        {update.title}
                      </h3>

                      <p className="line-clamp-3 text-sm leading-relaxed text-darkgray">
                        {update.desc}
                      </p>

                      <div className="mt-auto">
                        <span className="flex items-center gap-2 text-base font-bold text-secondary transition-all group-hover:gap-3">
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
              <Button className="swiper-prev rounded-full p-4 text-white transition hover:text-pink-200 bg-accent0 backdrop-blur-sm border-2 border-white">
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button className="swiper-next rounded-full p-4  bg-accent0 text-white transition hover:text-pink-200 backdrop-blur-sm  border-2 border-white">
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

          {/* Button below on mobile */}
          <div className="mt-10 flex justify-center md:hidden">
            <Button href="/updates" variant="secondary" className="">
              View All
            </Button>
          </div>
        </div>
       
      </div>
    </section>
  );
}