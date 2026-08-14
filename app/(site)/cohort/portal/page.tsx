import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { COHORT_PROGRAMS } from "@/lib/services/cohort.service";

function Wordmark({ light }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.png" alt="ROTAGI" width={28} height={28} className="object-contain" />
      <span className={`font-cal-sans font-bold tracking-wide ${light ? "text-white" : "text-gray-900"}`}>
        ROTAGI
      </span>
    </div>
  );
}

// A proper graduation cap glyph (mortarboard + tassel) instead of the
// generic lucide outline icon — black cap, brand-pink tassel, matching the
// reference render the org supplied.
function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 8 L45 18 L24 28 L3 18 Z" fill="currentColor" />
      <path
        d="M13 21.5 V29 a11 5.5 0 0 0 22 0 v-7.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M42 19 V32" stroke="#d62d88" strokeWidth="2" strokeLinecap="round" />
      <circle cx="42" cy="34" r="2.5" fill="#d62d88" />
    </svg>
  );
}

export default function CohortPortalPickerPage() {
  return (
    <main className="min-h-screen w-full flex flex-col md:grid md:grid-cols-2">
      {/* Image side — white background, top banner on mobile, left column from md up */}
      <div className="relative flex flex-col bg-white py-8 md:py-10 px-6 md:px-10 min-h-[42vh] md:min-h-0">
        <Wordmark />
        <div className="flex-1 flex items-center justify-center py-6">
          <Image
            src="/cohort-portal-hero.png"
            alt="ROTAGI She Tech Skills"
            width={640}
            height={640}
            className="object-contain w-full max-w-[320px] sm:max-w-md md:max-w-xl"
            priority
          />
        </div>
      </div>

      {/* Program side — the brand's primary pink */}
      <div className="flex-1 flex flex-col bg-secondary px-6 sm:px-12 lg:px-20 py-8 md:py-16">
        <Wordmark light />
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto md:mx-0 py-6">
            <h1 className="text-2xl md:text-3xl font-cal-sans text-white mb-2">ROTAGI She Tech Skill Portal</h1>
            <p className="font-dm-sans text-white/80 mb-8">Pick your program to sign in.</p>

            <div className="space-y-3">
              {COHORT_PROGRAMS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/cohort/portal/${p.slug}`}
                  className="group flex items-center gap-4 bg-white rounded-2xl border border-white/50 p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <GraduationCapIcon className="w-6 h-6" />
                  </div>
                  <span className="font-cal-sans text-gray-900 flex-1">{p.title}</span>
                  <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
