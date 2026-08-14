"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, GraduationCap, CheckCircle2, AlertCircle } from "lucide-react";
import { cohortService, AdminProgramSummary } from "@/lib/services/cohort.service";

export default function AdminCohortProgramsPage() {
  const [programs, setPrograms] = useState<AdminProgramSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    cohortService
      .getPrograms()
      .then(setPrograms)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cal-sans text-black tracking-tight">Cohort Portals</h1>
        <p className="text-gray-500 mt-1">Pick a program to manage its cohort portal.</p>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-gray-400 py-10">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading programs…
        </div>
      ) : error ? (
        <p className="text-red-500">Could not load cohort programs.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/admin/dashboard/cohort/${p.slug}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${
                  p.configured ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {p.configured ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {p.configured ? "Configured" : "Needs setup"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
