"use client";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Empower = () => {
  return (
    <div className="relative lg:mx-5 h-[815px] md:h-170 lg:rounded-3xl overflow-hidden">
      <Image
        src="/Threegirls.jpg"
        alt="Empowering African girls to lead in the digital world"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1400px"
        className="object-cover"
      />

   
      <div className="absolute inset-0 bg-[#2a0036]/70" />

      <div
        className="
          absolute inset-0
          flex flex-col
          items-start          
          justify-end          
          gap-4                
          px-5
          pb-10                
          pt-24                
          text-white
          md:top-96
          md:flex-row
          md:items-center
          md:justify-between
          md:gap-0
          md:px-12
          md:py-10
        "
      >
        <div className="w-full md:w-auto text-left md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-2xl md:text-4xl lg:mt-0 mt-0 md:w-220 ">
              Empowering{" "}
              <span className="text-pink-400">African Girls</span> to lead in
              the Digital World
            </h1>

            <p className="mt-4 text-sm md:text-base text-gray-100 md:w-200">
              Through AI technology, and life skills, we equip young African
              girls with the confidence, knowledge, and leadership to shape a
              just and equitable digital future.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Button
            variant="secondary"
            href="#OurStory"
            className="mt-6 cursor-pointer md:mt-40 lg:mr-0"
          >
            Learn our history
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Empower;