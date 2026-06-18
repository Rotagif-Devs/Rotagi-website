"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  title: string;
  category: string;
}

export default function BlogHero({ title, category }: Props) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/programs-hero.jpg" // Using same placeholder for now, user can change
          width={1080}
          height={1080}
          alt="Blog Hero"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#41122B]/70" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white w-full">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
           
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-white">
              {title}
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
