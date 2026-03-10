"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
}

export default function ProgramsHero({ title, description }: Props) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/programs-hero.jpg"
          width={1080}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
          priority
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-[#41122B]/70" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white w-full">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-white mb-6">
              {title}
            </h1>
          </motion.div>

          <div className="max-w-2xl mx-auto mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-gray-100"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
