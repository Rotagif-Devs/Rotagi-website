import { getAllPrograms } from "@/lib/programs";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramsList from "@/components/programs/ProgramsList";
import ProgramsCTA from "@/components/programs/ProgramsCTA";

const HERO_DATA = {
  title: "Program Pathways",
  description:
    "Empowering the next generation of women in technology through specialized training, mentorship, and real-world experience.",
};

const FILTERS = [
  { label: "All", value: "All" },
  { label: "10-12", value: "Ages 10-12" },
  { label: "13-15", value: "Ages 13-15" },
  { label: "16-18", value: "Ages 16-18" },
  { label: "18-40", value: "Ages 18-40" },
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
