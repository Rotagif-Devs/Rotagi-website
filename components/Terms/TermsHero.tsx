"use client";
import { motion } from "framer-motion";

interface Props {
  title: string;
}

export default function TermsHero({ title }: Props) {
  return (
    <section className="relative bg-[#2D0F21] py-20 px-4 text-center text-white lg:mx-4 min-h-[260px] md:min-h-[300px] lg:rounded-b-2xl flex flex-col justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-cal-sans font-normal uppercase tracking-wide"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
