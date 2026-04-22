import { getAllPrograms } from "@/lib/programs";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramsList from "@/components/programs/ProgramsList";
import ProgramsCTA from "@/components/programs/ProgramsCTA";

const HERO_DATA = {
  title: "Program Pathways",
  description:
    "Discover your free learning pathway from your first spark of curiosity to confident leadership in AI, Digital Skills, and Life Skills. Every programme is built around you, at every stage of life.",
};
const FILTERS = [
  { label: "All Ages", value: "All" },
  { label: "10-12 years", value: "10-12 years" },
  { label: "13-15 years", value: "13-15 years" },
  { label: "16-18 years", value: "16-18 years" },
  { label: "18-40 years", value: "18-40 years" },
];

export default function ProgramsPage() {
  const programs = getAllPrograms();

  return (
    <main className="min-h-screen">
      <ProgramsHero
        title={HERO_DATA.title}
        description={HERO_DATA.description}
      />
      <ProgramsList programs={programs} filters={FILTERS} />
      <ProgramsCTA />
    </main>
  );
}
