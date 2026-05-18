"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

const PartnerHero = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[550px] lg:mx-4 lg:rounded-2xl overflow-hidden mt-5 lg:mt-0 lg:w-[calc(100%-2rem)]">
      <Image
        src="/partner-hero.jpg"
        alt="Partner with ROTAGI"
        width={1800}
        height={1800} 
        priority
        className="object-cover h-100 lg:h-175"
      />
      <div className="absolute inset-0 bg-[#35022e]/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl flex flex-col items-center"
        >
          <div>
 <h3 className="text-4xl md:text-5xl lg:text-5xl font-normal font-cal-sans lg:mt-30 ">
            Partner with <span className="text-[#D62D88]">ROTAGI</span>
          </h3>
          </div>
          <p className="mt-4 text-sm md:text-base text-gray-200">
           Join us in creating lasting  impact through strategic partnerships that empower women in 
AI and Technology
            </p>
          <Button
            variant="primary"
            href="/partner/inquiry"
            className="px-20 py-3 lg:mt-20 text-sm md:text-base font-bold bg-[#D62D88] hover:bg-pink-700 text-white rounded-full transition-colors"
          >
            Partner With Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerHero;
