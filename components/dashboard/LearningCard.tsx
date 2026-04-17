"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Monitor, Sparkles } from "lucide-react";

export interface LearningCardProps {
  id: number;
  title: string;
  description: string;
  bg: string;
  panel: string;
  image: string;
}

export default function LearningCard({
  id,
  title,
  description,
  bg,
  panel,
  image,
}: LearningCardProps) {
  // Determine icon based on title
  const Icon = title.toLowerCase().includes("artificial") ? Brain : 
               title.toLowerCase().includes("literacy") ? Monitor : Sparkles;
  
  // Extract hex colors from classes
  const bgColor = bg.includes("[") ? bg.split("[")[1].split("]")[0] : "#FDF2F0";
  const accentColor = panel.includes("[") ? panel.split("[")[1].split("]")[0] : "#CC6534";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1 }}
      whileHover={{ y: -6 }}
      className={`relative h-[420px] overflow-hidden rounded-[28px] md:h-[440px] ${bg}`}
    >
      {/* 1. Tilted Image Area (Background) */}
      <div className="absolute top-13 left-1/2 z-10 h-[200px] w-[235px] -translate-x-1/2 rotate-[9deg] overflow-hidden rounded-[24px] shadow-lg md:h-[215px] md:w-[270px]">
        <img src={image} alt={title} className="object-cover" />
      </div>

      {/* 2. Floating Icon Circle Overlay */}
      <div className="absolute left-[18%] top-[66px] z-30 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#2D99F3] shadow-md md:left-[19%] md:top-[78px]">
        <Icon size={22} className="text-white" />
      </div>

      {/* 3. The "Tabbed" Content Box (Bottom Layer) */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="relative w-full">
           <svg 
             viewBox="0 0 400 240" 
             preserveAspectRatio="none" 
             className="w-full h-[260px]"
             fill={accentColor}
             xmlns="http://www.w3.org/2000/svg"
           >
             <path d="M 0,240 L 0,40 Q 0,10 30,10 L 180,10 Q 210,10 210,40 Q 210,70 240,70 L 370,70 Q 400,70 400,100 L 400,240 Z" />
           </svg>

           {/* 4. Text Content Overlay */}
           <div className="absolute inset-0 flex flex-col p-6 pt-2">
             <div className="h-[50px] flex items-center">
                <h4 className="text-white font-medium leading-6">
                  {title}
                </h4>
             </div>

             <div className="border-t border-t-white/30 mt-4">
                <div className="py-2" />
                <p className="text-[0.98rem] leading-7 text-white/95 mb-6 line-clamp-3">
                  {description}
                </p>

                <button
                  type="button"
                  className="cursor-pointer inline-flex items-center gap-2 text-[1rem] font-medium mt-2 text-white"
                >
                  Explore <ArrowRight size={18} />
                </button>
             </div>
           </div>
        </div>
      </div>
    </motion.article>
  );
}
