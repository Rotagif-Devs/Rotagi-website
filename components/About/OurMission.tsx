"use client";
import Image from "next/image";
import React from "react";

const OurMission = () => {
  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-pink-50/40 blur-2xl" />

            <div className="relative w-full lg:w-2xl rounded-[28px] bg-white p-6  shadow-[0_18px_50px_rgba(236,72,153,0.18)] ring-1 ring-pink-100">
              <div className="space-y-6 md:space-y-8">
                
                {/* Mission Section */}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="shrink-0 w-[60px] h-[30px] relative flex items-center">
                      <Image
                        src="/power.svg"
                        alt="Mission icon"
                        width={40}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 tracking-wide">OUR MISSION</h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-[#667085]">
                    We develop digital fluency, ethical understanding, and leadership confidence for girls and women across Africa. Our goal is to empower African girls through accessible, inclusive education and community driven digital opportunity.
                  </p>
                </div>

                {/* Vision Section */}
                <div className="flex flex-col">
                  <div className="flex items-center ">
                    <div className="shrink-0 w-[60px] h-[30px] relative flex items-center">
                      <Image 
                        src="/bulb-hand.svg" 
                        alt="Vision icon" 
                        width={40} 
                        height={30} 
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 tracking-wide">VISION</h3>
                  </div>
                  <p className="mt-3  text-[#667085]">
                    We envision a future where every African girl has the knowledge, confidence, and opportunity to lead the digital economy and shape a just, equitable digital future.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side Image Container */}
          <div className="flex md:justify-end">
            <div className="relative h-64 w-full lg:block hidden sm:h-80 sm:w-80 md:h-100 md:w-100 overflow-hidden rounded-[28px] bg-gray-100 shadow-lg ring-1 ring-gray-200 mx-auto md:mx-0">
              <Image
                src="/Team-member.png"
                alt="Women collaborating on a laptop"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;