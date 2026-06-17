"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";

interface Props {
  description: string;
}

export default function DonateHero({ description }: Props) {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex overflow-hidden bg-[#2D0F21] lg:mx-4 lg:rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/programs-hero.jpg"
          fill
          alt="African Girls Empowerment"
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#2D0F21]/70" />
      </div>

      {/* Bottom-aligned content like home hero */}
      <div className="relative z-10 flex items-end w-full px-6 sm:px-8 md:px-12 lg:px-16 pb-10 md:pb-14">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white font-cal-sans font-normal uppercase text-4xl sm:text-5xl md:text-[64px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] mb-6 max-w-4xl"
          >
            Empower Future Through Artificial Intelligence
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-200 text-sm md:text-base leading-relaxed max-w-xl"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="shrink-0"
            >
              <Button
                variant="primary"
                size="md"
                onClick={(e) => {
                  e.preventDefault();
                  document.dispatchEvent(new CustomEvent("openDonateStepper"));
                  document
                    .getElementById("donate-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer px-8 py-3.5 bg-white hover:bg-white/70 text-black rounded-full font-semibold whitespace-nowrap transition-colors"
              >
                Donate Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}