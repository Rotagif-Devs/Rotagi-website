"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

const PartnerHero = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <Image
        src="/Threegirls.jpg"
        alt="Partner with ROTAGI"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#35022e]/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide">
            Partner with <span className="text-[#D62D88]">ROTAGI</span>
          </h1>
          <Button
            variant="primary"
            href="/partner/inquiry"
            className="px-10 py-3 text-sm md:text-base font-bold bg-[#D62D88] hover:bg-pink-700 text-white rounded-full transition-colors"
          >
            Partner With Us
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerHero;
