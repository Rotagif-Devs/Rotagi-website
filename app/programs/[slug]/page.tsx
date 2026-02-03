// app/programs/[slug]/page.tsx
import { getProgramBySlug, getAllPrograms } from "@/lib/programs";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


export async function generateStaticParams() {
  const programs = getAllPrograms();
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="program-detail">
      <Link href="/programs">← Back to programs</Link>

      <span className="age-badge">{program.ageRange}</span>
      <h1>{program.name}</h1>
      <p className="tagline">{program.tagline}</p>

      <Image width={500} height={500} src={program.image} alt={program.name} />

      <p className="description">{program.description}</p>

      <div className="program-info">
        <div>{program.duration}</div>
        <div>{program.format}</div>
        <div>{program.schedule}</div>
      </div>

      <div className="two-column">
        <section>
          <h2>{program.achievements.title}</h2>
          <ul>
            {program.achievements.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{program.prerequisites.title}</h2>
          <ul>
            {program.prerequisites.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h2>{program.benefits.title}</h2>
        <ul>
          {program.benefits.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <button>Get Started Now</button>
    </div>
  );
}
