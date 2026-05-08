"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// IMPORTANT: These imports are required for Swiper to function
import "swiper/css";
import "swiper/css/navigation";

const coreValues = [
  {
    iconSrc: "/Measurable.png",
    title: "Measurable Social Impact",
    description: "Delivering programmes with measurable outcomes across education, employment, entrepreneurship, and leadership for our graduates.",
  },
  {
    iconSrc: "/Equitable.png",
    title: "Equitable Access & Inclusion",
    description: "Removing barriers to ensure inclusive digital, AI, and life-skills education reaches every African girl.",
  },
  {
    iconSrc: "/Responsible.png",
    title: "Responsible Innovation",
    description: "Equipping girls with practical AI skills while promoting safe, responsible technology use.",
  },
  {
    iconSrc: "/Gender.png",
    title: "Gender Equality & Confident Leadership",
    description: "Strengthening leadership and empowerment to enable African girls and young women to lead in digital spaces.",
  },
];

const CoreValues = () => {
  return (
    <section className="bg-[#fce4ec] py-16 px-6 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Core Values: The <br className="hidden md:block" /> MERG Framework
          </h2>
          <div className="w-24 h-1.5 bg-[#D62D88] mx-auto rounded-full"></div>
        </div>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {coreValues.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>

        {/* Mobile View: Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1.1}
            spaceBetween={16}
            centeredSlides={false}
            grabCursor={true}
            // Ensure classes match the buttons exactly
            navigation={{
              prevEl: ".merg-prev",
              nextEl: ".merg-next",
            }}
            className="!pb-12"
          >
            {coreValues.map((value, index) => (
              <SwiperSlide key={index}>
                <ValueCard value={value} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons for Mobile */}
          <div className="mt-4 flex justify-center gap-4">
            <button className="merg-prev flex h-12 w-12 items-center justify-center rounded-full bg-white border border-pink-200 shadow-sm text-[#D62D88] disabled:opacity-30">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="merg-next flex h-12 w-12 items-center justify-center rounded-full bg-white border border-pink-200 shadow-sm text-[#D62D88] disabled:opacity-30">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ value }: { value: typeof coreValues[0] }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm flex flex-col relative min-h-[320px] overflow-hidden">
    <div className="relative z-10 max-w-[85%]">
      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
        {value.title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm">
        {value.description}
      </p>
    </div>
    <div className="absolute bottom-4 right-6">
      <Image
        src={value.iconSrc}
        alt={value.title}
        width={100}
        height={100}
        className="object-contain w-20 h-20 opacity-90"
      />
    </div>
  </div>
);

export default CoreValues;