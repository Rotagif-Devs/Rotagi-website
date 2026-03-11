// components/Hero.tsx
"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[650px] md:h-[800px] lg:h-[900px] flex flex-col items-center justify-end bg-[#41122B] lg:mx-4 lg:rounded-2xl pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          width={1920}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#41122B] to-[#41122B]/30 opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col justify-end w-full h-full pb-12 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full flex flex-col justify-end h-full relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mb-8 relative"
          >
            <h1 className="text-white font-cal-sans font-normal text-4xl sm:text-5xl md:text-[72px] leading-[1.05] tracking-[-0.02em] opacity-95 mb-2 md:mb-2">
              Empowering <br className="hidden md:block" /> the Next Generation{" "}
              <br className="hidden md:block" /> of African Girl Innovators
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-center w-full gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white max-w-xl opacity-90 font-dm-sans font-normal text-[16px] leading-[160%] m-0 tracking-normal"
            >
              The next breakthrough could come from her. We are making sure
              she&apos;s ready with AI literacy, digital skills, and leadership
              confidence.
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
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-4 font-bold md:px-12 object-contain"
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
