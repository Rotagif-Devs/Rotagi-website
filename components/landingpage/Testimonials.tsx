"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    text: "“I love ROTAGI! My UI/UX training was an impactful and interactive experience. I gained real world design skills and learned how to design with purpose and clarity.”",
    author: "Abubakar Asiata Gbemisola (UI/UX)",
    image: "/BG.png",
  },
  {
    text: "“The training was insightful and incredibly well delivered. I gained clarity, confidence, and a clear path to apply what I’ve learned.”",
    author: "Nafisat Muazu Ejile (UI/UX)",
    image: "/BG_1.png",
  },
  {
    text: '"My digital design training was smooth, engaging, and impactful. I learned practical Canva skills and improved my creativity and confidence."',
    author: "Halima Sadiya Abubakar (CANVA Design)",
    image: "/BG (1).png",
  },
  {
    text: '"The training was an amazing and impactful learning journey. I gained valuable digital skills, improved my creativity, and built confidence to explore new opportunities."',
    author: "Olanikewu Saidat Opeyemi (CANVA Design)",
    image: "/BG (2).png",
  },
  {
    text: '"The training was highly informative and practical. I learned how to use my digital devices more productively and effectively."',
    author: "Comfort Musa (VIBE CODING)",
    image: "/BG (3).png",
  },
  {
    text: "“I joined the coding class with zero knowledge. In just a few weeks, I gained real experience and confidence in building projects.”",
    author: "Aisha Mohammed Nasir (VIBE CODING)",
    image: "/BG (4).png",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-full">
        <h2 className="mb-16 text-center text-gray-950 font-cal-sans font-normal text-3xl md:text-[46px] leading-[100%] tracking-normal uppercase max-w-4xl mx-auto">
          Testimonials{" "}
        </h2>

        <div className="relative">
          {/* Desktop & Tablet: Grid or Slider */}
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".test-prev",
              nextEl: ".test-next",
            }}
            loop={false}
            spaceBetween={36}
            slidesPerView={1.2}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.2 },
            }}
            grabCursor={true}
            className="pb-10"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-9 bg-white p-2 rounded-2xl h-full">
                  <div className="shrink-0">
                    <Image
                      src={item.image}
                      alt={item.author}
                      width={240}
                      height={240}
                      className="w-40 h-40 md:w-60 md:h-60 rounded-2xl object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="text-gray-950 text-base md:text-lg font-medium font-dm-sans leading-7">
                      {item.text}
                    </p>
                    <div className="text-gray-950 text-sm md:text-base font-semibold uppercase font-dm-sans leading-7">
                      {item.author}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Navigation Arrows */}
          <div className="mt-8 lg:mt-12 flex justify-end gap-3 lg:gap-6 lg:px-8 px-6">
            <button
              className="test-prev flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 transition hover:bg-secondary/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            <button
              className="test-next flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 transition hover:bg-secondary/30"
              aria-label="Next slide"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
