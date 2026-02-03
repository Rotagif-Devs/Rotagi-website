import Link from "next/link";
import { Program } from "@/types/program";

interface Props {
  program: Program;
}

export default function ProgramCard({ program }: Props) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-sm">
      <img
        src={program.image}
        alt={program.title}
        className="h-40 w-full rounded-lg object-cover"
      />

      <span className="mt-4 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
        {program.ageRange}
      </span>

      <h3 className="mt-3 text-lg font-semibold">{program.title}</h3>

      <p className="mt-2 text-sm text-gray-600">{program.description}</p>

      <Link
        href={`/programs/${program.slug}`}
        className="mt-4 inline-flex text-sm font-medium text-pink-600"
      >
        Learn more →
      </Link>
    </article>
  );
}

