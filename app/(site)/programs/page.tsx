import { getAllPrograms } from "@/lib/programs";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramsList from "@/components/programs/ProgramsList";
import ProgramsCTA from "@/components/programs/ProgramsCTA";

const HERO_DATA = {
  title: "PROGRAM PATHWAYS",
  description:
    "Discover your  learning pathway from your first spark of curiosity to confident leadership in AI, Digital Skills, and Life Skills. Every Program is built around you, at every stage of life. ",
};
const FILTERS = [
  { label: "All Ages(4)", value: "All" },
  { label: "10-12 years", value: "Ages 10-12" },
  { label: "13-15 years", value: "Ages 13-15" },
  { label: "16-18 years", value: "Ages 16-18" },
  { label: "18-40 years", value: "Ages 18-40" },
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
