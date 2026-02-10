"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Button from "@/components/ui/Button";

const partnerLogos = [
  { name: "Apple Pay", logo: "/ApplePay.png" },
  { name: "Skrill", logo: "/Skrill.png" },
  // Add more real partners here when ready:
  // { name: "Paystack", logo: "/paystack.png" },
  // { name: "Flutterwave", logo: "/flutterwave.png" },
  // { name: "Visa", logo: "/visa.png" },
];

export default function Partners() {
  return (
    <section className="bg-primary py-16 md:py-20 flex justify-center">
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + description + button area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="text-black ">
            Trusted by Purpose-Driven Organizations
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="text-black text-left">
              We collaborate with partners who believe in measurable impact, inclusive growth, and empowering the next generation of African women.
            </p>

            {/* Button visible only on mobile here (hidden on md+) */}
            <div className="md:hidden w-full sm:w-auto">
              <Button variant="secondary" href="/partners" className="">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>

        {/* Logos section */}
        <div className="relative">
          {/* Desktop layout – equal width cards */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="flex h-[270px] items-center justify-center rounded-[40px] bg-white px-10 py-8 md:px-[50px] md:py-10"
              >
                <Image
                  width={1080}
                  height={1080}
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-[140px] w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          {/* Mobile Swiper with peek effect */}
          <div className="md:hidden ">
            <Swiper
              slidesPerView={1.4}
              spaceBetween={50}
              grabCursor={true}
              centeredSlides={false}
              className="pb-6"
            >
              {partnerLogos.map((partner) => (
                <SwiperSlide key={partner.name}>
                  <div className="mx-auto h-[220px] w-[80vw] max-w-[280px] rounded-[32px] bg-white px-8 py-10 flex items-center justify-center">
                    <Image
                      width={1080}
                      height={1080}
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-[120px] w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Button below slider on mobile */}
          <div className="mt-10 flex justify-center md:hidden">
            <Button variant="secondary" href="/partners" className="">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}