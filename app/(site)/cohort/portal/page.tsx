import Link from "next/link";
import Image from "next/image";
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

export default function CohortPortalPickerPage() {
  return (
    <main className="min-h-screen w-full flex flex-col md:grid md:grid-cols-2">
      {/* Image side — white background, top banner on mobile, left column from md up */}
      <div className="relative flex flex-col bg-[#EFEFEF] py-8 md:py-10 px-6 md:px-10 min-h-[42vh] md:min-h-0">
        <Wordmark />
        <div className="flex-1 flex items-center justify-center py-6">
          <Image
            src="/cohort-portal-hero.jpg"
            alt="ROTAGI She Tech Skills"
            width={640}
            height={640}
            className="object-contain w-full max-w-[350px] sm:max-w-md md:max-w-xl"
            priority
          />
        </div>
      </div>

      {/* Program side — the brand's primary pink */}
      <div className="flex-1 flex flex-col bg-[#D6448D] px-6 sm:px-12 lg:px-20 py-8 md:py-16">
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto md:mx-0 py-6">
            <h1 className="text-4xl sm:text-5xl font-cal-sans font-bold leading-[1.1] text-white mb-4">
              ROTAGI She Tech Skill Portal
            </h1>
            <p className="font-dm-sans text-white/80 mb-8">Pick your program to sign in.</p>

            <div className="space-y-3">
              {COHORT_PROGRAMS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/cohort/portal/${p.slug}`}
                  className="group flex items-center gap-4 bg-white rounded-2xl border border-white/50 p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Image src="/graduation-cap.png" alt="" width={44} height={30} className="object-contain w-8 h-auto" />
                  </div>
                  <span className="font-cal-sans text-gray-900 flex-1">{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
