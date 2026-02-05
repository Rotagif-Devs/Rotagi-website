// components/Hero.tsx
"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function ProgramHero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-lg">
      {/* Background Image with Overlay */}
      
      <div className="absolute inset-0 z-0">
        <Image
          src="/programhero.jpg"
          width={1080}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#41122B]/70 z-10"></div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center z-10 w-screen px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <h1
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mediumbold text-center"
            >
             Program Pathways
            </h1>
          </motion.div>

          <div className="flex mt-4 text-center ">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="
                text-white max-w-3xl
              "
            >
            Discover age-appropriate pathways from curiosity to career. Each program is designed to meet you where you are and guide you toward your goals.
            </motion.p>
          </div>
        </div>
      </div> 
    </section>
  );
}
