// components/Hero.tsx
"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          width={1080}
          height={1080}
          alt="African Girl Innovator"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-16 w-full">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <h1
              className="text-white "
            >
             Empowering the Next Generation of African Girl Innovators
            </h1>
          </motion.div>

          <div className="flex md:flex-row flex-col justify-between align-center w-full md:gap-0 gap-10 mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="
                text-white max-w-3xl
              "
            >
              The next breakthrough could come from her. We are making sure
              she&apos;s ready with AI literacy, digital skills, and leadership
              confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-5 justify-center md:items-center w-fit"
            >
              <Button 
                variant="secondary" 
                href="/programs"
                withArrow
                className=" cursor-pointer"
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
