"use client";

import Empower from "@/components/About/Empower";
import OurMission from "@/components/About/OurMission";
import OurSdg from "@/components/About/OurSdg";
import OurStory from "@/components/About/OurStory";
import OurValue from "@/components/About/OurValue";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const About = () => {
  const teamData = [
    { name: "Amara K.", role: "Founder", image: "/Amara.png" },
    { name: "Fatima D.", role: "Co. Founder", image: "/Fatima.png" },
    { name: "Lola Jay", role: "Outreach", image: "/Lola.png" },
    { name: "Zara David", role: "Outreach", image: "/zara.png" },
  ];

  return (
    <section className="w-full mx-auto lg:py-8">
      <Empower />
      <OurStory />
      <OurMission />
      <OurValue />
      <OurSdg />

      <section className="bg-[#d6448d] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-white">The Visionaries</h2>
            <div className="h-1.5 w-24 bg-white mx-auto rounded-full"></div>
          </div>

          <div className="md:hidden">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".vision-swiper-prev",
                nextEl: ".vision-swiper-next",
              }}
              slidesPerView={1}
              spaceBetween={16}
              className="pb-4"
            >
              {teamData.map((member) => (
                <SwiperSlide key={member.name}>
                  <div className="mx-auto max-w-xs rounded-3xl bg-[#2a0036] px-6 py-8">
                    <div className="flex items-center justify-center">
                      <div className="relative w-50 h-50">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={1500}
                          height={1000}
                          className="object-contain rounded-2xl"
                        />
                      </div>
                    </div>

                    <div className="mt-6 text-center text-white">
                      <h4>{member.name}</h4>
                      <p className="mt-1">{member.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-6 flex justify-end gap-4">
              <button
                className="vision-swiper-prev flex h-9 w-9 items-center justify-center rounded-full border border-white/80 text-white"
                aria-label="Previous team member"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className="vision-swiper-next flex h-9 w-9 items-center justify-center rounded-full border border-white/80 text-white"
                aria-label="Next team member"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        
          <div className="hidden md:block">
            <div className="bg-white rounded-3xl py-10 px-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-pink-300">
                {teamData.map((member, index) => (
                  <div key={index} className="flex flex-col items-center p-4">
                    <div className="relative w-32 h-32 md:w-60 md:h-60 mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={1500}
                        height={1000}
                        className="object-contain"
                      />
                    </div>

                    <h4>{member.name}</h4>
                    <p className="mt-1">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;