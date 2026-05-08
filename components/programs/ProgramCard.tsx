import type { Program } from "@/lib/programs";
import Image from "next/image";
import Button from "../ui/Button";

interface Props {
  program: Program;
  index?: number;
}

export default function ProgramCard({ program, index }: Props) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-5">
      {/* Image */}
      <div className="relative h-[240px] overflow-hidden rounded-t-2xl bg-[#2A0018]">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.name}
          fill
          className="object-contain object-right-bottom"
        />

        {/* Level Badge */}
        <div className="absolute left-4 top-5">
          <span className="rounded-full bg-[#D8CBD3] px-5 py-2 text-sm font-medium text-black">
            {program.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-6">
        {/* Age */}
        <div className="mb-5">
          <span className="rounded-full bg-[#FAD5E5] px-5 py-2 text-sm font-medium text-[#D62D88]">
            {program.ageRange}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-4 font-medium leading-tight text-[#1B1B1B]">
          {program.name}
        </h3>

        {/* Description */}
        <p className="mb-3 text-base leading-8 text-[#5E5E73]">
          {program.tagline || program.description}
        </p>

        {/* Outcomes */}
        <div className="mb-4">
          <p className="text-[1rem]! mb-3 font-medium text-[#5E5E73]">
            Key Outcomes:
          </p>

          <ul className="list-disc space-y-2 pl-5">
            {program.outcomes.items.map((item) => (
              <li key={item} className="text-base leading-7 text-[#5E5E73]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="mt-auto">
          <Button
            variant="ghost"
            href={`/programs/${program.slug}`}
            className="p-0 text-[#E52B87] hover:bg-transparent flex gap-2 justify-start items-center"
          >
            Learn More
            <Image
              src="/v9.png"
              alt="learn more"
              width={15}
              height={15}
              className=" object-contain"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
