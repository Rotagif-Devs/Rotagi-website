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

            <div className="relative w-full lg:w-2xl rounded-[28px] bg-white p-6 md:p-8 shadow-[0_18px_50px_rgba(236,72,153,0.18)] ring-1 ring-pink-100">
              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-3">
                  <span className="mt-1 lg:w-20 w-30">
                    <Image
                      src="/power.svg"
                      alt="icon"
                      width={60}
                      height={30}
                    />
                  </span>

                  <div>
                    <h3>OUR MISSION</h3>
                    <p className="mt-2 leading-6 text-gray-600">
                      We develop digital fluency, ethical understanding, and leadership confidence for girls and women across Africa. Our goal is to empower African girls through accessible, inclusive education and community driven digital opportunity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="lg:mt-1 lg:w-20 w-30">
                    <Image src="/bulb-hand.svg" alt="icon" width={60} height={30} />
                  </span>

                  <div>
                    <h3>VISION</h3>
                    <p className="mt-2 leading-6 text-gray-600">
                     We envision a future where every African girl has the knowledge, confidence, and opportunity to lead the digital economy and shape a just, equitable digital future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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