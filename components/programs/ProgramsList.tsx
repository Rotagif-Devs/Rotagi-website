"use client";

import { useState } from "react";
import ProgramCard from "@/components/programs/ProgramCard";
import type { Program } from "@/lib/programs";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "10-12 Years", value: "Ages 10-12" },
  { label: "13-15 Years", value: "Ages 13-15" },
  { label: "16-18 Years", value: "Ages 16-18" },
  { label: "18-40 Years", value: "Ages 18-40" },
];

interface Props {
  programs: Program[];
}

export default function ProgramsList({ programs }: Props) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredPrograms =
    selectedFilter === "All"
      ? programs
      : programs.filter((program) => program.ageRange === selectedFilter);

  return (
    <>
      {/* Filter Section */}
      <div className="py-8 px-4 sm:px-12">
        <div className="flex justify-center">
          <div className="bg-white inline-flex gap-2 rounded-full px-1 py-1 text-sm font-medium text-gray-600 overflow-x-auto max-w-full scrollbar-hide">
            {FILTERS.map((filter) => (
              <button
                key={filter.label}
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

      {/* Programs Grid */}
      <section className="px-4 sm:px-12 mb-16">
        <div className="container mx-auto">
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
    </>
  );
}
