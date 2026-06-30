"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
     <section className="relative min-h-[600px] flex flex-col items-center justify-end bg-pink-950 lg:mx-4 lg:rounded-2xl overflow-hidden mt-6 md:mt-0">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/she-hero.jpg"
             fill
              alt="African Girl Innovator"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#41122B]/60" />

      <div className="relative z-10 flex flex-col justify-end w-full h-full pb-16 md:pb-20 overflow-hidden">
        <div className="mx-auto max-w-11/12 px-6 lg:px-8 w-full flex flex-col justify-end h-full relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white text-xs tracking-wide backdrop-blur-md bg-white/10">
ROTAGI Annual Conference  |  Coming 2026             </div>
          </motion.div>

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mb-8 relative"
          >
            <h1 className="text-white max-w-4xl font-cal-sans font-normal text-4xl sm:text-5xl md:text-[72px] leading-[1.05] tracking-[-0.02em] uppercase">
              Where African Girls Rise Together
            </h1>
          </motion.div>

          {/* DESCRIPTION + CTA */}
          <div className="flex flex-col md:flex-row md:items-end w-full gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white max-w-xl opacity-90 font-dm-sans font-normal text-base md:text-lg leading-[160%] m-0"
            >
              A one day conference bringing together African girls and young women and a celebration of everything you can become.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex shrink-0 z-20 md:ml-auto"
            >
              <Button
                variant="secondary"
                href="#register"
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3.5 font-semibold"
              >
                Be the First to Know
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

 
    </section>
  );
}
