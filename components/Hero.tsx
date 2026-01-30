// components/Hero.tsx
"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden bg-[#41122B] md:mx-4 md:mt-6 rounded-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-16 w-full">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="
                text-6xl md:text-7xl lg:text-7xl 
                leading-[1.1] tracking-tight font-normal
                text-white drop-shadow-sm max-w-[985px]
                font-cal-sans"
            >
             Empowering the Next Generation of African Girl Innovators
            </h1>
          </motion.div>

          <div className="flex md:flex-row flex-col justify-between align-center w-full md:gap-0 gap-10 mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="
                text-lg sm:text-base md:text-lg 
                text-[rgb(186,186,186)]
                font-light leading-relaxed max-w-[610px]
                font-header
              "
            >
              The next breakthrough could come from her. We are making sure
              she's ready with AI literacy, digital skills, and leadership
              confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-5 justify-center md:items-center w-fit"
            >
              <Button 
                variant="white" 
                className="min-w-[217.55px] h-[50px] rounded-[34px] px-[34px] py-[15px] gap-[8px] !text-base whitespace-nowrap cursor-pointer"
              >
                Explore Programs
                <ArrowRightIcon className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
