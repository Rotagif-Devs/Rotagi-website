// components/Hero.tsx
"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[800px] flex flex-col items-center justify-end bg-pink-950 lg:mx-4 lg:rounded-2xl overflow-hidden mt-6 md:mt-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home-hero.jpg"
          width={1920}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#41122B]/70" />

      <div className="relative z-10 flex flex-col justify-end w-full h-full pb-16 md:pb-20 overflow-hidden">
        <div className="mx-auto max-w-11/12 w-full flex flex-col justify-end h-full relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mb-4 relative"
          >
            <h1 className="text-white max-w-4xl font-cal-sans text-6xl sm:text-5xl md:text-[72px] leading-[1.05] tracking-[-0.02em] mb-0 md:mb-0 uppercase">
              Empowering the Next Generation of African Girl Innovators
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end w-full gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white/80 max-w-2xl  font-dm-sans font-normal text-base md:text-lg leading-[160%] m-0"
            >
              The next breakthrough could come from her. We are making sure
              she's ready with AI literacy, digital skills, and leadership
              confidence
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex shrink-0 z-20 md:ml-auto"
            >
              <Button
                variant="secondary"
                href="/programs"
                withArrow
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3.5 font-semibold"
              >
                Explore Programs
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative gradients from design */}
      <div className="absolute right-0 bottom-0 flex opacity-20 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-12 md:w-16 h-[300px] md:h-[500px] bg-gradient-to-b from-white/0 to-white/40 transform rotate-180"
            style={{ marginRight: i * -10 + "px" }}
          />
        ))}
      </div>
    </section>
  );
}
