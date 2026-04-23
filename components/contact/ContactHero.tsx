"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  title: string;
  btn: string;
}

export default function ContactHero({ title, btn }: Props) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-lg">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/programs-hero.jpg"
          width={1080}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#41122B]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 lg:px-8">
        
        {/* Button */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#DB2777] text-white text-[10px] md:text-xs font-semibold px-4 py-1.5 rounded-md mb-6 uppercase tracking-widest border-2 border-white"
        >
          {btn}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white !normal-case font-cal-sans 
                     text-3xl sm:text-4xl md:text-5xl lg:text-7xl 
                     leading-[1.1] tracking-tight max-w-5xl"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}