import Link from "next/link";
<<<<<<< Updated upstream
import { ArrowRight } from "lucide-react";
import type { Program } from "@/lib/programs";
import Image from "next/image";
import Button from "../ui/Button";
=======
import { Program } from "@/lib/programs";
>>>>>>> Stashed changes

// import { Program } from "@/types/program";
interface Props {
  program: Program;
  index: number;
}
export default function ProgramCard({ program, index }: Props) {
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col overflow-hidden rounded-3xl bg-[#FDF2F8]">
      {/* Image Container */}
      <div className="relative aspect-4/3 md: w-full overflow-hidden">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          width={500}
          height={500}
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {program.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#FCE7F3] px-3 py-1 text-sm font-semibold text-[#DB2777]">
            {program.ageRange}
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-bold text-gray-900">
          {program.name}
        </h3>

        <p className="mb-6 flex-1 text-gray-600 leading-relaxed">
          {program.tagline || program.description}
        </p>

        <ul className="mb-6 space-y-2">
          {program.prerequisites.items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DB2777]" />
              {item}
            </li>
          ))}
        </ul>

        <Button
          variant="ghost"
          withArrow
          href={`/programs/${program.slug}`}
          className=""
        >
          Learn more
        </Button>
      </div>
    </div>
=======
    <article className="rounded-2xl bg-white p-5 shadow-sm">
      <div>
        <div
          className={`bg-brown rounded-xl w-full h-full flex items-center ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <img
            src={program.image}
            alt={program.name}
            className="h-[50%] w-[50%] rounded-lg object-contain"
          />
        </div>

        <span className="mt-4 inline-block rounded-full bg-pink-100 px-6 py-1.5   text-lg lg:text-sm md:text-base font-semibold text-pink-600">
          {program.ageRange}
        </span>

        <h3 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-black">{program.name}</h3>

        <p className="mt-2 text-2xl text-gray-600">{program.description}</p>

        <Link
          href={`/programs/${program.slug}`}
          className="mt-4 inline-flex text-base font-semibold text-pink-600"
        >
          Learn more →
        </Link>
      </div>
    </article>
>>>>>>> Stashed changes
  );
}
