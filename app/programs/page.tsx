// app/programs/page.tsx (or pages/programs.tsx)
import { getAllPrograms } from "@/lib/programs";
import Image from "next/image";
import Link from "next/link";

export default function ProgramsPage() {
  const programs = getAllPrograms();

  return (
    <div className="programs-page">
      <h1>Program Pathways</h1>

      <div className="programs-grid">
        {programs.map((program) => (
          <div key={program.id} className="program-card">
            <span className="age-badge">{program.ageRange}</span>
            <Image width={500} height={500} src={program.image} alt={program.name} />
            <h2>{program.name}</h2>
            <p>{program.tagline}</p>
            <Link href={`/programs/${program.slug}`}>Learn More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
