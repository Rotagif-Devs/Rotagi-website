"use client";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";



import React from "react";

const Empower = () => {
  return (
    <div className="relative mt-16  lg:mx-5 h-[520px] md:h-170 lg:rounded-2xl overflow-hidden">
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
            items-center
            justify-center
            gap-6
            px-5
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
          
        <div className="w-full md:w-auto text-center md:text-left">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            >
          
          <h1 className="w-full md:w-220">
            Empowering <span className="text-pink-400">African Girls</span> to
            lead in the Digital World
          </h1>

          <p className="mt-3 text-gray-100 w-full md:w-200">
            Through AI technology, and life skills, we equip young African girls
            with the confidence, knowledge, and leadership to shape a just and
            equitable digital future.
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
          href="/programs"
          className="cursor-pointer mt-2 md:mt-40"
        >
          Learn our history
        </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Empower;
