import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/lib/programs";
import Image from "next/image";
import Button from "../ui/Button";

// import { Program } from "@/types/program";
interface Props {
  program: Program;
  index: number;
}
export default function ProgramCard({ program, index }: Props) {
  return (
    <div className="flex flex-col  overflow-hidden rounded-3xl bg-[#FDF2F8]">
      {/* Image Container */}
      <div className="relative aspect-4/3 md:aspect-video w-full overflow-hidden">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          width={500}
          height={500}
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full text-black/80 px-3 py-1 text-xs font-medium bg-white/60 backdrop-blur-sm">
            {program.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#FABFD380] px-3 py-1.5 text-sm font-semibold text-[#D62D88]">
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

        <div>
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
    </div>
  );
}
