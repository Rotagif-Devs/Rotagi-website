"use client"

import { programs } from "@/lib/programs";
import { useState } from "react";
import ProgramCard from "./ProgramCard";
export const Programselection = () => {
  const [selectedAgeRange, setSelectedAgeRange] = useState("All");
  const ageFilter = [
    "All",
    ...new Set(programs.map((program) => program.ageRange)),
  ];
  const filterAgeRange = () => {
    return selectedAgeRange === "All"
      ? programs
      : programs.filter((program) => program.ageRange === selectedAgeRange);
  };
  return (
    <section className="">
      <div className="my-6 mx-10 flex flex-col gap-10  ">
        <div className="border-2 flex justify-start">
        <div className=" bg-white rounded-4xl py-1.5">
          {ageFilter.map((ageRange) => {
            return (
              <button
                key={ageRange}
                onClick={() => setSelectedAgeRange(ageRange)}
                className={`px-10 py-1.5 cursor-pointer rounded-full mx-2 ${selectedAgeRange === ageRange ? "bg-[#D62D88] text-white" : "bg-white text-black font-bold"}`}
              >
                {ageRange}
              </button>
            );
          })}
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterAgeRange().map((program, index) => {
                return(
                    <ProgramCard key={program.id} program={program} index={index}/>
                )
            })}

        </div>
      </div>
    </section>
  );
};
