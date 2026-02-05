"use client";
import { getAllPrograms } from "@/lib/programs";
import ProgramCard from "@/components/programs/ProgramCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/globalComp/CTA";
import { useState } from "react";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "10-12", value: "Ages 10-12" },
  { label: "13-15", value: "Ages 13-15" },
  { label: "16-18", value: "Ages 16-18" },
  { label: "18-40", value: "Ages 18-40" },
];

export default function ProgramsPage() {
  const programs = getAllPrograms();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredPrograms =
    selectedFilter === "All"
      ? programs
      : programs.filter((program) => program.ageRange === selectedFilter);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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

        <div className="absolute h-full text-center space-y-4 flex flex-col justify-center items-center text-white w-full">
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-5xl"
            >
              <h1 className="text-white ">Program Pathways</h1>
            </motion.div>

            <div className="flex md:flex-row flex-col justify-between align-center max-w-xl mx-auto md:gap-0 gap-10 mt-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="
                      text-white max-w-3xl
                    "
              ></motion.p>
              Empowering the next generation of women in technology through
              specialized training, mentorship, and real-world experience.
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-5 justify-center md:items-center w-fit"
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="py-8 px-12">
        <div className="bg-white inline-flex gap-2 rounded-full px-1 py-1 text-sm font-medium text-gray-600 overflow-x-auto max-w-full">
          {FILTERS.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setSelectedFilter(filter.value)}
              className={`whitespace-nowrap rounded-full px-6 py-2 transition-colors ${
                selectedFilter === filter.value
                  ? "bg-secondary text-white"
                  : "hover:text-secondary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <section className="px-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-12 max-w-6xl mx-auto">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          {filteredPrograms.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No programs found for this age range.
            </div>
          )}
        </div>
      </section>

      <CTA />
    </main>
  );
}
