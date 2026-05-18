"use client";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Empower = () => {
  return (
    <div className="relative lg:mx-4 min-h-[460px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] lg:rounded-2xl overflow-hidden flex items-end">
      
      <Image
        src="/Threegirls.jpg"
        alt="Empowering African girls to lead in the digital world"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1400px"
        className="object-cover"
      />
      
      
      <div className="absolute inset-0 bg-linear-to-t from-[#2a0036]/90 via-[#2a0036]/70 to-[#2a0036]/30 lg:to-[#2a0036]/40" />
      
      {/* Dynamic Content Container */}
      <div
        className="
          absolute inset-x-0 bottom-0
          flex flex-col
          items-start          
          justify-end          
          gap-6                
          px-5
          pb-8
          pt-20
          text-white
          sm:px-8
          md:flex-row
          md:items-end
          md:justify-between
          md:gap-12
          md:px-12
          md:pb-12
        "
      >
        {/* Typography Wrapper */}
        <div className="w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Using responsive font scaling classes */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wide uppercase leading-tight">
              EMPOWERING{" "}
              <span className="text-[#fce4ec]">AFRICAN GIRLS</span> TO LEAD IN THE DIGITAL 
              WORLD
            </h1>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-200 max-w-md lg:max-w-max leading-relaxed font-medium">
              Through age specific programmes, we equip African girls and young women with the confidence, knowledge, and leadership to shape a just and equitable digital future.
            </p>
          </motion.div>
        </div>

        {/* CTA Button Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="shrink-0 w-full sm:w-auto mt-2 md:mt-0"
        >
          <Button
            variant="secondary"
            href="/programs"
            className="cursor-pointer w-50 lg:full sm:w-auto text-center justify-center inline-flex"
          >
            Explore Our Programmes
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Empower;