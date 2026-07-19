import Image from "next/image";
import PTA from "@/components/globalComp/PTA";
import CourseGrid from "@/components/cohort/CourseGrid";
import { BookOpen, Briefcase, Users, Award, Zap, HandHeart } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Scholarship Cohorts | ROTAGI",
  description: "Apply for a ROTAGI scholarship and gain in demand digital, life, and enterprise skills. Practical, beginner friendly training for African girls and young women.",
  openGraph: {
    title: "Gain In-Demand Skills with ROTAGI Scholarship Support",
    description: "Practical, beginner-friendly training in digital, life, and enterprise skills for African girls and young women.",
    url: "https://www.rotagif.com/cohort",
    locale: "en_GB",
    images: [
      {
        url: "https://www.rotagif.com/programs-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Young African women taking part in a ROTAGI digital skills session",
      },
    ],
  },
  twitter: {
    title: "Gain In-Demand Skills with ROTAGI Scholarship Support",
    description: "Practical, beginner-friendly training in digital, life, and enterprise skills for African girls and young women.",
  },
};

const BENEFITS = [
  {
    title: "Guided Curriculum",
    description: "Move from beginner to advanced through a well designed pathway, one step at a time.",
    image: "/cohort-images/guided-curriculum.png",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Hands on Projects",
    description: "Apply your skills to real briefs and build a portfolio that opens doors.",
    image: "/cohort-images/hands-on-projects.png",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    title: "Mentorship & Support",
    description: "Get guidance from experienced mentors and facilitators at every stage.",
    image: "/cohort-images/mentorship-support.jpg",
    color: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    title: "Career Readiness",
    description: "Sharpen your workplace skills, polish your CV, and prepare for internships, freelancing, or employment.",
    image: "/cohort-images/career-readiness.jpg",
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    title: "Community & Networking",
    description: "Join a vibrant community of ROTAGI scholars, mentors, and industry professionals.",
    image: "/cohort-images/community-networking.jpg",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Certificate of Completion",
    description: "Earn your ROTAGI certificate once you have met the program requirements.",
    image: "/cohort-images/certificate-of-completion.jpg",
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
            src="/cohort-hero.png"
            fill
            alt="Young African women taking part in a ROTAGI digital skills session"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#41122B]/70" />

        <div className="relative z-10 flex flex-col justify-end w-full h-full pb-16 md:pb-20 overflow-hidden">
          <div className="mx-auto w-11/12 flex flex-col justify-end h-full relative">
            <div className="w-full mb-4 md:mb-6 relative">
              <h1 className="text-white max-w-4xl font-cal-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.1] tracking-[-0.02em] mb-0 md:mb-0">
                Gain In Demand Skills with ROTAGI Scholarship Support
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-end w-full gap-6 md:gap-8 mt-2 md:mt-0">
              <p className="text-white/80 max-w-2xl font-dm-sans font-normal text-sm sm:text-base md:text-lg leading-[160%] m-0">
                The ROTAGI Scholarship helps African girls and young women gain digital, life, and enterprise skills through practical, beginner friendly training.
              </p>

              <div className="flex shrink-0 z-20 md:ml-auto w-full md:w-auto mt-2 md:mt-0">
                <Link
                  href="#courses"
                  className="bg-white text-secondary hover:bg-gray-100 rounded-full px-6 md:px-8 py-3.5 md:py-4 font-semibold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center w-full md:w-auto text-sm md:text-base"
                >
                  Apply for a Scholarship
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid with Closed Modal */}
      <CourseGrid />

      {/* Mid-Page CTA */}
      <section className="bg-secondary py-16 px-5 md:px-10 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
        <div className="max-w-[1260px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl md:text-4xl font-cal-sans mb-4">
              Apply for a Scholarship
            </h2>
            <p className="text-pink-100 text-lg">
              Our next cohort starts 3 August 2026. Limited places available.
            </p>
          </div>
          <Link 
            href="#courses"
            className="px-8 py-4 bg-white text-secondary font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shrink-0"
          >
            Apply for a Scholarship
          </Link>
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section className="bg-primary px-5 md:px-10 py-24 w-full">
        <div className="max-w-[1260px] mx-auto">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wider text-[#D62D88] uppercase">
              What You will Gain as a ROTAGI Scholar
            </p>

            <h2 className="mx-auto mt-4 max-w-4xl uppercase leading-[1.1]  text-3xl md:text-5xl font-cal-sans">
              JOIN 500+ AFRICAN GIRLS AND YOUNG WOMEN GAINING IN DEMAND SKILLS FOR WORK, LIFE, AND BUSINESS.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {BENEFITS.map((benefit, idx) => {
              return (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-6 rounded-2xl border border-pink-100/20 backdrop-blur-sm"
                >
                  <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center overflow-hidden`}>
                    <Image src={benefit.image} alt={benefit.title} width={56} height={56} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg  tracking-wide font-cal-sans">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5D677C]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Bottom CTA */}
      <section className="py-20 px-5 md:px-10 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-cal-sans text-gray-900 mb-6">
            Start building the skills that shape your future.
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Apply for a ROTAGI scholarship today and join the community.
          </p>
          <Link 
            href="#courses"
            className="px-10 py-5 bg-secondary hover:bg-primary/90 text-white font-semibold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            Apply for a Scholarship
          </Link>
        </div>
      </section>

 
    </main>
  );
}
