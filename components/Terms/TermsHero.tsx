"use client";
import { motion } from "framer-motion";

interface Props {
  title: string;
}
export default function TermsHero({ title }: Props) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex overflow-hidden bg-[#41122B] lg:mx-4 lg:rounded-lg">
      {/* Background Image with Overlay */}
      <div className="flex  bg-[#41122B]/70 justify-center items-center text-white w-full">
        {/* <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center"> */}
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
        {/* </div> */}
      </div>
    </section>
  );
}
