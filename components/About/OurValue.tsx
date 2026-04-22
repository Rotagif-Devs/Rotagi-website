"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const OurValue = () => {
  const valuesData = [
    {
      title: "Equitable Access",
      description:
        "Breaking down barriers to ensure high quality tech education reaches even the most remote communities",
      icon: "/Team.svg",
    },
    {
      title: "Gender Equality",
      description:
        "Actively working to close the digital divide and elevate female voices in male dominated tech sectors",
      icon: "/Gender-equal.svg",
    },
    {
      title: "Responsible Innovation",
      description:
        "Teaching ethical AI development that considers cultural context and social responsibility",
      icon: "/innovation.svg",
    },
    {
      title: "Social Impact",
      description:
        "Measuring our success by the growth employment and local influence of our graduates",
      icon: "/social-impact.svg",
    },
  ];

  return (
    <section className="bg-[#fcebf5] py-20 px-4">
      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-16">
          <h2 className="text-2xl text-black mb-2">Our Values</h2>
          <div className="h-1.5 w-24 bg-[#d6448d] mx-auto rounded-full" />
        </div>

        <div className="lg:hidden">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".values-swiper-prev",
              nextEl: ".values-swiper-next",
            }}
            slidesPerView={1}
            spaceBetween={16}
            className="pb-12"
          >
            {valuesData.map((item) => (
              <SwiperSlide key={item.title}>
                <div className="group flex flex-col">
                  <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start h-full">
                    <div className="w-30 h-16 flex items-center justify-center mb-6">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="w-150 h-150 -ml-10"
                      />
                    </div>

                    <h3 className="text-lg  text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

       
          <div className="mt-6 flex justify-end gap-6">
            <button
              className="values-swiper-prev rounded-full bg-[#D62D882E] p-3 text-[#ffff] transition hover:bg-white hover:text-[#a52f68] backdrop-blur-sm border-2 border-white"
              aria-label="Previous value"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="values-swiper-next rounded-full bg-[#D62D882E] p-3 text-[#ffff] transition hover:bg-white hover:text-[#a52f68] backdrop-blur-sm border-2 border-white"
              aria-label="Next value"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {valuesData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
            >
              <div className="w-30 h-16 rounded-full flex items-center justify-center mb-6">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={32}
                  height={32}
                  className="w-100 h-100 -ml-10"
                />
              </div>

              <h3 className="text-lg  text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValue;