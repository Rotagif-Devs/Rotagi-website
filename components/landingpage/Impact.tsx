"use client";

import Button from "@/components/ui/Button";

const stats = [
  { num: "1000 +", label: "Girls Reached" },
  { num: "15 +", label: "Programs" },
  { num: "10 +", label: "Communities" },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="py-16 lg:py-24 px-6 lg:px-8 flex justify-center"
    >
      <div className="flex w-full max-w-7xl flex-col gap-20">
        {/* Title + text + button area */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <h2 className="text-black max-w-[608px] font-cal-sans font-normal text-4xl md:text-5xl leading-tight">
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
              className="px-9 py-3.5 rounded-full"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats content */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-3.5 text-center"
            >
              <div className="text-secondary text-6xl md:text-7xl font-normal font-cal-sans">
                {stat.num}
              </div>
              <div className="opacity-80 text-secondary text-lg font-normal font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
