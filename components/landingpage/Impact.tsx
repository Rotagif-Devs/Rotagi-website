"use client";

import Button from "@/components/ui/Button";

const stats = [
  { num: "1000+", label: "Girls Reached" },
  { num: "15+", label: "Schools" },
  { num: "10+", label: "Communities" },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="py-16 lg:py-24 px-6 lg:px-8 flex justify-center"
    >
      <div className="flex w-full max-w-11/12 flex-col gap-12 md:gap-20">
        {/* Title + text + button area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="text-black max-w-[608px] font-cal-sans font-normal text-4xl md:text-5xl leading-tight uppercase">
            Access That Creates Impact
          </h2>

          <div className="flex flex-col items-start gap-8 max-w-[580px]">
            <p className="text-gray-600 font-dm-sans font-normal text-base leading-relaxed text-justify md:text-left">
              Since 2020, ROTAGI has equipped thousands of girls and women with
              skills that translate into confidence, careers, and community
              transformation across Africa.
            </p>

            <Button
              variant="primary"
              href="/about"
              className="hidden md:flex px-9 py-3.5 rounded-full text-sm md:text-base"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats content */}
        <div className="grid grid-cols-2 md:flex md:flex-row justify-start md:justify-center items-start md:items-center gap-x-8 gap-y-12 md:gap-32 mt-4 md:mt-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start md:items-center justify-center gap-2 md:gap-3.5 md:text-center"
            >
              <div className="text-secondary text-5xl md:text-7xl font-normal font-cal-sans">
                {stat.num}
              </div>
              <div className="opacity-80 text-secondary text-sm md:text-lg font-normal font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="flex justify-center md:hidden mt-4">
          <Button
            variant="primary"
            href="/about"
            className="px-9 py-3.5 rounded-full text-sm w-fit mx-auto text-center flex justify-center"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
