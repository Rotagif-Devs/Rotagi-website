import Image from "next/image";
import ProgramsHero from "@/components/programs/ProgramsHero";
import PTA from "@/components/globalComp/PTA";
import CourseGrid from "@/components/cohort/CourseGrid";
import { BookOpen, Briefcase, Users, Award, Zap, HandHeart } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Tech Cohorts | ROTAGIF",
  description: "Gain In-Demand Digital Skills with ROTAGI Scholarship Support.",
};

const BENEFITS = [
  {
    title: "Structured Learning",
    description: "Follow a well-designed learning pathway that builds your digital skills from beginner to advanced through guided lessons.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Hands-on Projects",
    description: "Work on practical projects that help you apply your knowledge and build a portfolio for future opportunities.",
    icon: Zap,
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    title: "Mentorship & Support",
    description: "Receive guidance from experienced mentors and facilitators throughout your learning journey.",
    icon: HandHeart,
    color: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    title: "Career Readiness",
    description: "Develop workplace skills, strengthen your portfolio, prepare your CV, and get ready for internships, freelancing, or employment.",
    icon: Briefcase,
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    title: "Community & Networking",
    description: "Join a vibrant community of learners, mentors, and industry professionals to collaborate, network, and grow.",
    icon: Users,
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Certificate of Completion",
    description: "Earn a ROTAGI Certificate of Completion after successfully meeting the program requirements.",
    icon: Award,
    color: "bg-yellow-50 text-yellow-600 border-yellow-100",
  },
];

export default function CohortPage() {
  return (
    <main className="min-h-screen bg-white font-dm-sans overflow-x-hidden">
      {/* Custom Hero Section matching Home Page */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-end bg-pink-950 lg:mx-4 lg:rounded-2xl overflow-hidden mt-6 md:mt-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/programs-hero.jpg"
            fill
            alt="ROTAGI Cohort"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#41122B]/70" />

        <div className="relative z-10 flex flex-col justify-end w-full h-full pb-16 md:pb-20 overflow-hidden">
          <div className="mx-auto max-w-[1260px] px-5 md:px-10 w-full flex flex-col justify-end h-full relative">
            <div className="w-full mb-4 md:mb-6 relative">
              <h1 className="text-white max-w-4xl font-cal-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.1] tracking-[-0.02em] mb-0 md:mb-0">
                Gain In-Demand Digital Skills with ROTAGI Scholarship Support
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-end w-full gap-6 md:gap-8 mt-2 md:mt-0">
              <p className="text-white/80 max-w-2xl font-dm-sans font-normal text-sm sm:text-base md:text-lg leading-[160%] m-0">
                The ROTAGI Digital Skills Scholarship provides aspiring young women and girls with the opportunity to learn high-demand digital and technology skills through a practical, beginner-friendly training program designed to prepare them for academic, career, and entrepreneurial success.
              </p>

              <div className="flex shrink-0 z-20 md:ml-auto w-full md:w-auto mt-2 md:mt-0">
                <Link
                  href="#courses"
                  className="bg-white text-pink-600 hover:bg-gray-100 rounded-full px-6 md:px-8 py-3.5 md:py-4 font-semibold uppercase tracking-wide transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center w-full md:w-auto text-sm md:text-base"
                >
                  Apply for Scholarship
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid with Closed Modal */}
      <CourseGrid />

      {/* Mid-Page CTA */}
      <section className="bg-pink-600 py-16 px-5 md:px-10 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
        <div className="max-w-[1260px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl md:text-4xl font-semibold font-cal-sans mb-4">
              APPLY FOR SCHOLARSHIP
            </h2>
            <p className="text-pink-100 text-lg">
              Our next cohort starts August 3rd. Limited slots available.
            </p>
          </div>
          {/* This button will scroll them back up to click a course, or we can just link it to `#courses` */}
          <Link 
            href="#courses"
            className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shrink-0"
          >
            Apply for Scholarship
          </Link>
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section className="py-24 px-5 md:px-10 max-w-[1260px] mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold font-cal-sans text-gray-900 mb-6">
            What You'll Gain as a ROTAGI Scholar
          </h2>
          <p className="text-lg text-gray-600">
            Join 500+ Girls Learning In-Demand Tech Skills Every 3 Months
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 ${benefit.color}`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-cal-sans">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Bottom CTA */}
      <section className="py-20 px-5 md:px-10 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-semibold font-cal-sans text-gray-900 mb-6">
            Start building the skills you need for a successful career in technology.
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Apply for a ROTAGI scholarship today and join our vibrant community.
          </p>
          <Link 
            href="#courses"
            className="px-10 py-5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-2xl shadow-xl shadow-pink-600/20 hover:shadow-pink-600/40 hover:-translate-y-1 transition-all duration-300"
          >
            Explore Courses & Apply
          </Link>
        </div>
      </section>

      {/* Global Call to Action */}
      <div className="bg-white border-t border-gray-100">
        <PTA />
      </div>
    </main>
  );
}
