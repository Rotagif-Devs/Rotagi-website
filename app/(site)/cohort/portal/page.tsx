import Link from "next/link";
import Image from "next/image";
import { GraduationCap, ArrowRight } from "lucide-react";
import { COHORT_PROGRAMS } from "@/lib/services/cohort.service";

export default function CohortPortalPickerPage() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid md:grid-cols-2">
        {/* Image side */}
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-secondary/10 via-white to-secondary/5 p-10 overflow-hidden">
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
          <Image
            src="/cohort-portal-hero.png"
            alt="ROTAGI She Tech Skills"
            width={520}
            height={520}
            className="relative object-contain w-full max-w-sm mix-blend-multiply"
            priority
          />
        </div>

        {/* Programme side */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 shadow-md md:hidden">
            <Image src="/logo.png" alt="ROTAGI" width={40} height={40} className="object-contain" />
          </div>
          <h1 className="text-2xl md:text-3xl font-cal-sans text-gray-900 mb-2">ROTAGI She Tech Skill Portal</h1>
          <p className="font-dm-sans text-gray-500 mb-8">Pick your programme to sign in.</p>

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
