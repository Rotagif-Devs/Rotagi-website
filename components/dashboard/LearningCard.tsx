"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Monitor } from "lucide-react";

export interface LearningCardProps {
  title: string;
  description: string;
  bg: string;
  panel: string;
  image: string;
}

export default function LearningCard({
  title,
  description,
  bg,
  panel,
  image,
}: LearningCardProps) {
  const Icon = title.includes("Artificial") ? Brain : Monitor;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative h-[420px] overflow-hidden rounded-[28px] p-5 md:h-[440px] md:p-6 ${bg}`}
    >
      <div className="absolute left-1/2 top-13 z-10 h-[200px] w-[235px] -translate-x-1/2 rotate-[9deg] overflow-hidden rounded-[24px]  shadow-lg md:h-[215px] md:w-[270px]">
        <img
          src={image}
          alt={title}
          className=" object-cover"
        />
      </div>

      <div className="absolute left-[18%] top-[66px] z-20 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#2D99F3] shadow-md md:left-[19%] md:top-[78px]">
        <Icon size={22} className="text-white" />
      </div>

      <div
        className={`absolute bottom-4 left-4 right-4 z-20 overflow-hidden rounded-[24px] text-white md:bottom-5 ${panel} p-6 `}
      >
          <div className={`${panel} `}>
            <h4 className=" font-medium leading-6 ">
              {title}
            </h4>
          </div>

        <div className="border-t border-t-white mt-4">
          <div className="py-2" />
          <p className=" text-[0.98rem] leading-7 text-white/95">
            {description}
          </p>

          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 text-[1rem] font-medium mt-2"
          >
            Explore <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}