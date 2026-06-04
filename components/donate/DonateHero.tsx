"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";

interface Props {
  description: string;
}

export default function DonateHero({ description }: Props) {
  return (
    <section className="relative min-h-[480px] md:min-h-[550px] flex items-center overflow-hidden bg-pink-950 lg:mx-4 lg:rounded-2xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/GroupOfStudent.png"
          width={1920}
          height={1080}
          alt="Empower Her Future"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[#41122B]/5 mix-blend-multiply" />
      <div className="absolute inset-0  via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end h-full min-h-[350px] md:min-h-[400px]">
        
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full mb-6"
        >
          <h1 className="text-white max-w-4xl font-cal-sans text-4xl sm:text-5xl md:text-6xl lg:text-6xl  leading-[1.1] tracking-tight uppercase">
            Empower Her Future
            <br /> Through Artificial Intelligence
          </h1>
        </motion.div>

        {/* Description & CTA Row */}
        <div className="flex flex-col md:flex-row md:items-end w-full gap-6 md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-white/90 max-w-2xl font-dm-sans text-sm md:text-base lg:text-lg leading-relaxed"
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
              className="bg-white text-black hover:bg-gray-100 transition-colors rounded-full px-8 py-3.5 font-bold shadow-lg text-sm md:text-base"
            >
              Donate Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradients */}
      <div className="absolute right-0 bottom-0 flex opacity-15 pointer-events-none">
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