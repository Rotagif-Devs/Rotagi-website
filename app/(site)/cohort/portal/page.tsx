import Link from "next/link";
import Image from "next/image";
import { GraduationCap, ArrowRight } from "lucide-react";
import { COHORT_PROGRAMS } from "@/lib/services/cohort.service";

export default function CohortPortalPickerPage() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        {/* Branded header card */}
        <div className="bg-secondary rounded-3xl p-8 mb-8 text-center text-white relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-lg">
              <Image src="/logo.png" alt="ROTAGI" width={64} height={64} className="object-contain" />
            </div>
            <h1 className="text-2xl md:text-3xl font-cal-sans mb-2">ROTAGI She Tech Skill Portal</h1>
            <p className="font-dm-sans text-white/80">Pick your programme to sign in.</p>
          </div>
        </div>

        <div className="space-y-3">
          {COHORT_PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              href={`/cohort/portal/${p.slug}`}
              className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
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
    </main>
  );
}
