"use client";

import { useState } from "react";
import ProgramCard from "@/components/programs/ProgramCard";
import type { Program } from "@/lib/programs";

interface Props {
  programs: Program[];
  filters: { label: string; value: string }[];
}

export default function ProgramsList({ programs, filters }: Props) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredPrograms =
    selectedFilter === "All"
      ? programs
      : programs.filter(
          (program) => program.ageRange === selectedFilter
        );

  return (
    <section className="max-w-6xl mx-auto">
      {/* Filter Section */}
      <div className="py-8 px-4 sm:px-12">
        <div className="flex justify-start">
          <div className="bg-white inline-flex gap-2 rounded-full px-1 py-1 text-sm font-medium text-gray-600 overflow-x-auto max-w-full scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`whitespace-nowrap rounded-full px-4 sm:px-6 py-2 transition-colors ${
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
      </div>
      <section className=" sm:px-12 mb-16">
        <div className="">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-12 max-w-6xl mx-auto">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} index={0} />
            ))}
          
          </div>
          {filteredPrograms.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No programs found for this age range.
            </div>
          )}
        </div>
      </section>
    </section>
  );
}