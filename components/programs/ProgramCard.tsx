import type { Program } from "@/lib/programs";
import Image from "next/image";
import Button from "../ui/Button";

interface Props {
  program: Program;
  index: number;
}
export default function ProgramCard({ program, index }: Props) {
  return (
    <div
      key={index}
      className="flex flex-col text-darkgray p-4 overflow-hidden rounded-3xl bg-white"
    >
    
      <div className="relative aspect-4/3 rounded-2xl md:aspect-video w-full bg-brown overflow-hidden">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          width={800}
          height={800}
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full text-black/80 px-3 py-1 text-xs font-medium bg-white/60 backdrop-blur-sm">
            {program.level}
          </span>
        </div>
      </div>

     
      <div className="flex flex-1 flex-col px-2 pt-6">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#FABFD380] px-6 py-1.5 text-sm font-semibold text-[#D62D88]">
            {program.ageRange}
          </span>
        </div>
        <h3 className="mb-2 text-dark">{program.name}</h3>
        <p className="mb-2 flex-1 ">
          {program.tagline || program.description}
        </p>
        <p className="text-darkgray font-semibold mb-2">Key Outcomes:</p>
        <ul className="mb-6 space-y-2">
          {program.outcomes.items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-darkgray"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-darkgray" />
              {item}
            </li>
          ))}
        </ul>
        <div>
          <Button
            variant="ghost"
            withArrow
            href={`/programs/${program.slug}`}
            className="mb-4"
          >
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}
