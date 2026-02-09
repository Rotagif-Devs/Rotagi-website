// app/programs/[slug]/page.tsx
import { getProgramBySlug, getAllPrograms } from "@/lib/programs";
import { notFound } from "next/navigation";
import Link from "next/link";
import PTA from "@/components/globalComp/PTA";
import Image from "next/image";
import { CalendarRange, Clock, Group, User } from "lucide-react";

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
    <section className="">
      <div className="px-8 md:px-15 md:py-0 py-10">
      <span className="flex items-center gap-3">←<Link href="/programs" className="flex items-center text-sm">Back to programs</Link></span>
      <div className="">
        <div className="flex justify-center items-center flex-col">
          <span className="inline-block rounded-full bg-[#FABFD380] px-3 py-1 text-sm font-medium text-[#DB2777]">
            {program.ageRange}
          </span>
          <h1 className="text-black font-medium my-6">{program.name}</h1>
          <p className="tagline text-[#121212] font-medium">{program.tagline}</p>
        </div>
        <div>
          <div className="w-full h-full md:h-[50vh] lg:h-[70vh] my-4">
            <Image
              width={500}
              height={600}
              src={program.detailImage}
              alt={program.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-[#121212] text-sm md:text-base lg:text-lg my-4">{program.description}</div>
          <div className="md:flex flex-col gap-6 my-4 text-[#49594C] text-sm md:text-sm lg:text-base">
            <div className="flex items-center gap-2 md:py-0 py-2">
              <Clock width={20} height={20} />
              {program.duration}</div>
            <div className="flex items-center gap-2 md:py-0 py-2">
              <User width={20} height={20} />
              {program.format}</div>
            <div className="flex items-center gap-2 md:py-0 py-2">
              <CalendarRange width={20} height={20} />
              {program.schedule}</div>
          </div>
        </div>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 bg-white py-10 px-8 md:px-15">
        <div>
          <div className="text-base md:text-lg lg:text-xl font-semibold text-[#DB2777] mb-3 md:mb-5">
            {program.achievements.title}{" "}
          </div>

          <ul className="list-disc pl-5">
            {program.achievements.items.map((item, index) => (
              <li
                className="  my-1 text-[#49594C] text-sm  md:text-base lg:text-lg"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-base md:text-lg lg:text-xl font-semibold text-[#DB2777] mb-3 md:mb-5">
            {program.prerequisites.title}{" "}
          </div>
          <ul className="list-disc pl-5">
            {program.prerequisites.items.map((item, index) => (
              <li
                className="  my-1 text-[#49594C] text-sm  md:text-base lg:text-lg"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-base md:text-lg lg:text-xl font-semibold text-[#DB2777] mb-3 md:mb-5">
            {program.benefits.title}{" "}
          </div>
          <ul className="list-disc pl-5">
            {program.benefits.items.map((item, index) => (
              <li
                className="  my-1 text-[#49594C] text-sm  md:text-base lg:text-lg"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <CTA /> */}
      {/* </div> */}
      <PTA />
    </section>
  );
}
