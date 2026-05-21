"use client";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Empower = () => {
  return (
    /* 
      1. Fixed parent height constraints: Changed the extreme md:min-h-[800px] 
         and restricted lg:h-[450px] so it is properly reduced but looks natural.
    */
    <div className="relative lg:mx-4 min-h-[460px] sm:min-h-[500px] md:min-h-[550px] lg:h-[600px] lg:rounded-2xl overflow-hidden flex items-end">
      
      {/* 
        2. Added 'fill' and 'object-top': This forces the crop to happen at the 
           bottom of the image, keeping the girls' heads completely safe from being cut off.
      */}
      <Image
        src="/Threegirls.jpg"
        alt="Empowering African girls to lead in the digital world"
        fill
        priority
        className="object-cover object-top"
      />
      
      <div className="absolute inset-0 bg-[#41122B]/80" />
      
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
            {/* 3. Removed 'mb-30' which was pushing text way too far up inside a shorter box */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:max-w-[800px] lg:text-5xl font-black mb-4 uppercase leading-tight">
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