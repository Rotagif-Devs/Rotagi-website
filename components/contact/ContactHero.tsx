"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  title: string;
  btn: string;
}

export default function ContactHero({ title, btn }: Props) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-lg">
      <div className="absolute inset-0 z-0">
        <Image
          src="/programs-hero.jpg"
          width={1080}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#41122B]/70" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white w-full">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-gray-100 border px-4 py-1 text-white bg-secondary rounded-[0.4rem] !text-[1rem] !font-bold"
            >
              {btn}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-white mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight font-cal-sans">{title}</h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}