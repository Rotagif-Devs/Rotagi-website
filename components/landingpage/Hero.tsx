// components/Hero.tsx
"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] lg:min-h-[80vh] flex flex-col items-center justify-end overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-[32px] mt-4 py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          width={1920}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#41122B] to-transparent opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col justify-center w-full">
        <div className="mx-auto bottom-10 max-w-7xl px-6 lg:px-8 w-full pt-16 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-white text-2xl md:text-5xl lg:text-7 leading-[1.1] mb-8 font-cal-sans">
              Empowering the Next Generation of African Girl Innovators
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white text-lg md:text-xl max-w-2xl opacity-90 leading-loose"
            >
              The next breakthrough could come from her. We are making sure
              she&apos;s ready with AI literacy, digital skills, and leadership
              confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex shrink-0"
            >
              <Button
                variant="secondary"
                href="/programs"
                withArrow
                className="px-8 py-4 lg:text-lg"
              >
                Explore Programs
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
