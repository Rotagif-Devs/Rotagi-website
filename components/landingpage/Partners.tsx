"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Button from "@/components/ui/Button";

const partnerLogos = [
  { name: "Apple Pay", logo: "/ApplePay.png" },
  { name: "Skrill", logo: "/Skrill.png" },
  { name: "Paystack", logo: "/PayPass.svg" },
  // { name: "Flutterwave", logo: "/flutterwave.png" },
  // { name: "Visa", logo: "/visa.png" },
];

export default function Partners() {
  return (
    <section className="bg-primary py-16 lg:py-24 px-6 lg:px-8 flex justify-center border-t border-black/5">
      <div className="flex w-full max-w-7xl flex-col gap-12 md:gap-20">
        {/* Title + description + button area */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <h2 className="text-black max-w-lg font-cal-sans lowercase leading-tight">
            Trusted by Purpose-Driven Organizations
          </h2>

          <div className="flex flex-col items-start gap-8 max-w-2xl">
            <p className="text-gray-700 text-lg md:text-xl font-dm-sans leading-loose lg:w-full w-11/12">
              We collaborate with partners who believe in measurable impact,
              inclusive growth, and empowering the next generation of African
              women.
            </p>

            <div className="hidden md:block">
              <Button variant="primary" href="/partners" className="px-10 py-4">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>

        {/* Logos section */}
        <div className="relative">
          {/* Desktop layout – equal width cards */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="flex h-[320px] items-center justify-center rounded-[48px] bg-white px-12 hover:shadow-md transition-shadow group"
              >
                <Image
                  width={400}
                  height={400}
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-[160px] w-auto object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          {/* Mobile Swiper with peek effect */}
          <div className="md:hidden">
            <Swiper
              slidesPerView={1.2}
              spaceBetween={24}
              grabCursor={true}
              className="pb-10"
            >
              {partnerLogos.map((partner) => (
                <SwiperSlide key={partner.name}>
                  <div className="h-[230px] rounded-[40px] bg-white px-8 py-12 flex items-center justify-center mb-6">
                    <Image
                      width={300}
                      height={300}
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-[150px] w-auto object-contain opacity-40 grayscale"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Button below slider on mobile */}
          <div className="mt-6 flex justify-center md:hidden">
            <Button variant="primary" href="/partners" className="px-10 py-4">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
