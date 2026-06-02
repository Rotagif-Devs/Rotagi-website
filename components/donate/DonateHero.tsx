"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";

interface Props {
  description: string;
}
export default function DonateHero({ description }: Props) {
  return (
    <section className="relative min-h-[500px] flex overflow-hidden bg-pink-950 lg:mx-4 lg:rounded-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home-hero.jpg"
          width={1920}
          height={1080}
          alt="Empower Her Future"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[#41122B]/70" />

      <div className="relative z-10 flex flex-col justify-end w-full h-full">
        <div className="mx-auto max-w-11/12 w-full pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mb-4 relative"
          >
            <h1 className="text-white max-w-4xl font-cal-sans text-5xl sm:text-5xl md:text-[56px] lg:text-[72px] leading-[1.03] tracking-tight mb-4 uppercase">
              Empower Her Future
              <br /> Through Artificial Intelligence
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end w-full gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white/80 max-w-2xl font-dm-sans text-base md:text-lg leading-[160%]"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex shrink-0 md:ml-auto"
            >
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.dispatchEvent(new CustomEvent("openDonateStepper"));
                  document.getElementById("donate-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3.5 font-semibold"
              >
                Donate Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative gradients like home hero */}
      <div className="absolute right-0 bottom-0 flex opacity-20 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-12 md:w-16 h-[220px] md:h-[360px] bg-gradient-to-b from-white/0 to-white/40 transform rotate-180"
            style={{ marginRight: i * -10 + "px" }}
          />
        ))}
      </div>
    </section>
  );
}
