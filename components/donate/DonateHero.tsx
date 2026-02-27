"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";

interface Props {
  description: string;
}

export default function DonateHero({ description }: Props) {
  return (
    <section className="relative min-h-[600px] flex overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-lg">
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

      <div className="relative inset-0 flex text-white w-full ">
        <div className="absolute bottom-6 left-0 right-0 z-10 px-6 sm:px-6 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <h1 className="text-2xl md:text-4xl lg:mt-0 mt-0 md:w-220 ">
              Empower <span className="text-pink-400">Her</span> Future Today
              With Your Support
            </h1>
          </motion.div>

          <div className="w-full md:mt-4 mt-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-200  w-full md:w-[80%]"
              >
                {description}
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-shrink-0"
              >
                <Button
                  variant="secondary"
                  href="#DonateNow"
                  className="cursor-pointer px-6 py-2 whitespace-nowrap"
                >
                  Donate Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
