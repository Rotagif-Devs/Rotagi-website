import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { COHORT_PROGRAMS } from "@/lib/services/cohort.service";

export default function CohortPortalPickerPage() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-cal-sans text-gray-900 mb-2">Cohort Portals</h1>
          <p className="text-gray-500">Pick your programme to sign in.</p>
        </div>

        <div className="space-y-3">
          {COHORT_PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              href={`/cohort/portal/${p.slug}`}
              className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-gray-900">{p.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
