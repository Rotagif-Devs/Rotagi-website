import { getAllPrograms } from "@/lib/programs";
import ProgramCard from "@/components/programs/ProgramCard";
import Link from "next/link";
import CTA from "@/components/globalComp/CTA";

export default function ProgramsPage() {
  const programs = getAllPrograms();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#9D174D] py-20 text-white sm:py-32">
        <div className="absolute inset-0 bg-[url('/img-1.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Program Pathways
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-pink-100 sm:text-xl">
            Empowering the next generation of women in technology through
            specialized training, mentorship, and real-world experience.
          </p>
        </div>
      </section>

      {/* Filter Section (Visual Only for now based on design) */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-center gap-8 overflow-x-auto px-4 py-4 text-sm font-medium text-gray-600 sm:justify-center">
          <button className="whitespace-nowrap rounded-full bg-[#DB2777] px-6 py-2 text-white">
            All
          </button>
          <button className="whitespace-nowrap hover:text-[#DB2777]">
            10-12 Years
          </button>
          <button className="whitespace-nowrap hover:text-[#DB2777]">
            13-15 Years
          </button>
          <button className="whitespace-nowrap hover:text-[#DB2777]">
            16-18 Years
          </button>
          <button className="whitespace-nowrap hover:text-[#DB2777]">
            18-40 Years
          </button>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-12 max-w-6xl mx-auto">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

     <CTA/>
      
    </main>
  );
}
