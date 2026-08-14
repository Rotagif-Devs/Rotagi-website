import Link from "next/link";
import Image from "next/image";
import { GraduationCap, ArrowRight } from "lucide-react";
import { COHORT_PROGRAMS } from "@/lib/services/cohort.service";

export default function CohortPortalPickerPage() {
  return (
    <main className="min-h-screen w-full flex flex-col md:grid md:grid-cols-2">
      {/* Image side — a top banner on mobile, the left column from md up */}
      <div className="relative flex items-center justify-center bg-gradient-to-br from-secondary/10 via-white to-secondary/5 p-6 h-48 sm:h-64 md:h-auto md:p-10 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <Image
          src="/cohort-portal-hero.png"
          alt="ROTAGI She Tech Skills"
          width={520}
          height={520}
          className="relative object-contain w-full max-w-[220px] sm:max-w-xs md:max-w-md mix-blend-multiply"
          priority
        />
      </div>

      {/* Program side */}
      <div className="flex flex-col justify-start md:justify-center px-6 sm:px-12 lg:px-20 pt-8 pb-10 md:py-16">
        <div className="w-full max-w-md mx-auto md:mx-0">
          <h1 className="text-2xl md:text-3xl font-cal-sans text-gray-900 mb-2">ROTAGI She Tech Skill Portal</h1>
          <p className="font-dm-sans text-gray-500 mb-8">Pick your program to sign in.</p>

          <div className="space-y-3">
            {COHORT_PROGRAMS.map((p) => (
              <Link
                key={p.slug}
                href={`/cohort/portal/${p.slug}`}
                className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-cal-sans text-gray-900 flex-1">{p.title}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
