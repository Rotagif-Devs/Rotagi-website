"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

const PartnerHero = () => {
  return (
    <section className="relative w-full min-h-[420px] md:min-h-[500px] lg:mx-4 lg:rounded-2xl overflow-hidden mt-5 lg:mt-0 lg:w-[calc(100%-2rem)] flex items-center justify-center">
      <Image
        src="/partner-hero.jpg"
        alt="Partner with ROTAGI"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#35022e]/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal-sans uppercase">
            Partner with ROTAGI
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-xl leading-relaxed">
            Join us in creating lasting impact through strategic partnerships that empower women in AI and Technology.
          </p>
          <Button
            variant="primary"
            href="/partner/inquiry"
            className="mt-4 px-10 py-3 text-sm md:text-base font-bold bg-[#D62D88] hover:bg-pink-700 text-white rounded-full transition-colors"
          >
            Inquire Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerHero;
