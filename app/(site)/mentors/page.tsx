import Image from "next/image";
import {
  Heart,
  Users,
  Lightbulb,
  Clock,
  GraduationCap,
  Briefcase,
  Code2,
  TrendingUp,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ProgramsCTA from "@/components/programs/ProgramsCTA";

const WHY_ITEMS = [
  {
    icon: Heart,
    title: "Give Back",
    description: "Share your journey and help others avoid common pitfalls.",
  },
  {
    icon: Users,
    title: "Build Connections",
    description: "Expand your network and learn from mentees.",
  },
  {
    icon: Lightbulb,
    title: "Develop Skills",
    description: "Enhance your leadership and communication skills as a mentor.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Commit as much time as works for you.",
  },
];

const WHO_CAN_APPLY = [
  {
    icon: GraduationCap,
    title: "Educators",
    description:
      "Teachers, professors, and trainers in STEM, technology, and education.",
  },
  {
    icon: Briefcase,
    title: "Industry Veterans",
    description:
      "Experienced professionals looking to give back and shape the next generation.",
  },
  {
    icon: Code2,
    title: "Technical Professionals",
    description:
      "Software engineers, data scientists, AI and other tech professionals with 2+ years of experience.",
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurs",
    description:
      "Tech founders and executives who want to share insights about entrepreneurship.",
  },
];

export default function MentorPage() {
  return (
    <div className="min-h-screen bg-[#FDF2F8]">
      {/* ── Hero — centered ───────────────────────────────── */}
      <section className="relative min-h-[420px] md:min-h-[500px] flex items-center justify-center overflow-hidden lg:mx-4 lg:rounded-2xl">
        <Image
          src="/mentor.jpg"
          alt="Become a Mentor"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#1a0a14]/65" />

        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto flex flex-col items-center gap-4">
          <h1 className="text-4xl md:text-6xl font-cal-sans font-normal leading-tight uppercase">
            Become a Mentor
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
            Share your knowledge, experience and passion for technology with the
            next generation of African girls and women. Make a real impact
            through mentorship.
          </p>
          <Button
            variant="primary"
            href="/mentors/apply"
            className="mt-2 bg-[#D81B7E] hover:bg-pink-700 text-white rounded-full px-8 py-3.5 font-semibold transition-colors"
          >
            Apply to Mentor
          </Button>
        </div>
      </section>

      {/* ── Why Mentorship Matters ───────────────────────── */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-cal-sans font-normal text-gray-950 mb-3">
            Why Mentorship Matters
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-14 max-w-xl mx-auto leading-relaxed">
            Mentors play a crucial role in building confidence, providing
            guidance, and opening doors for aspiring tech professionals.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#FDF2F8] border border-pink-100"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-pink-100 flex items-center justify-center shadow-sm">
                    <Icon size={22} className="text-[#D81B7E]" />
                  </div>
                  <h4 className="font-bold text-gray-950 text-sm md:text-base">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Who Can Apply ────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#FDF2F8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-cal-sans font-normal text-gray-950 mb-3">
              Who Can Apply
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Open to any professionals and executives passionate about
              mentoring and empowering others.
            </p>
          </div>

          {/* Grid with centre image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              {WHO_CAN_APPLY.slice(0, 2).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm flex-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FDF2F8] border border-pink-100 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[#D81B7E]" />
                    </div>
                    <h4 className="font-bold text-gray-950 mb-2 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Centre image */}
            <div className="hidden md:block relative rounded-2xl overflow-hidden min-h-[360px]">
              <Image
                src="/partner-hero.jpg"
                alt="Mentor working with mentee"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#1a0a14]/20 rounded-2xl" />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              {WHO_CAN_APPLY.slice(2).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm flex-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FDF2F8] border border-pink-100 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[#D81B7E]" />
                    </div>
                    <h4 className="font-bold text-gray-950 mb-2 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Existing CTA (video + join waitlist) ─────────── */}
      <ProgramsCTA />
    </div>
  );
}
