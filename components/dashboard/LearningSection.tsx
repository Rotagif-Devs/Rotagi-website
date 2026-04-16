"use client";

import { motion } from "framer-motion";
import LearningCard from "./LearningCard";
import { learningCards } from "@/types/dashboard";

export default function LearningSection() {
  return (
    <section className="rounded-[30px] bg-white/90 p-3 md:p-6">
  <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
    {learningCards.map((card) => (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: card.id * 0.12 }}
        className="w-full"
      >
        <LearningCard {...card} />
      </motion.div>
    ))}
  </div>
</section>
  );
}