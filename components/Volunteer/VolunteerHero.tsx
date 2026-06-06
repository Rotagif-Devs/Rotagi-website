"use client";
import React from "react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";

const VolunteerHero = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex flex-col items-end justify-end bg-pink-900 lg:mx-4 lg:rounded-2xl overflow-hidden mt-6 md:mt-0">
      {/* Background Image */}
      <Image
        src="/img-1.png"
        fill
        alt="Volunteer"
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1a0a14]/65 z-0" />

      {/* Content bottom-aligned */}
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 pb-10 md:pb-14">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white font-cal-sans font-normal uppercase text-4xl sm:text-5xl md:text-[64px] leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl"
        >
          Volunteer with ROTAGI
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-white/80 w-full md:w-[55%] font-dm-sans text-sm md:text-base leading-relaxed"
          >
            Empower African girls and young women by giving your time, skills,
            and voice to create lasting impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex shrink-0 md:ml-auto"
          >
            <Button
              variant="secondary"
              href="#apply"
              className="bg-[#D81B7E] hover:bg-pink-700 text-white rounded-full px-8 py-3.5 font-semibold transition-colors"
            >
              Apply to Volunteer
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerHero;
