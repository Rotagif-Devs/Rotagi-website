// components/Hero.tsx
"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden bg-[#41122B] mx-4 mt-6 rounded-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-16 w-full">
        <div className="relative z-10 mx-auto w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="
                text-4xl sm:text-4xl md:text-7xl lg:text-7xl 
              leading-tight tracking-tight font-light
               text-white drop-shadow-sm max-w-7/12
                font-cal-sans"
            >
              Empowering the Next Gen of African Girl Innovators
            </h1>
          </motion.div>

          <div className="flex justify-between align-center w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="
                text-base sm:text-base md:text-base 
                text-gray-200
                font-light leading-relaxed max-w-7/12
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
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              <Button variant="white" size="lg" className="min-w-64">
                Explore Programs
                <ArrowRightIcon className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
