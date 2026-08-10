"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import CohortPinGate from "@/components/cohort/CohortPinGate";
import CohortPortalDashboard from "@/components/cohort/CohortPortalDashboard";
import {
  cohortService,
  getCohortToken,
  COHORT_PROGRAMS,
  CohortDashboard,
} from "@/lib/services/cohort.service";

export default function CohortProgramPortalPage() {
  const params = useParams();
  const program = String(params?.program || "");
  const isValidProgram = COHORT_PROGRAMS.some((p) => p.slug === program);

  const [unlocked, setUnlocked] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [data, setData] = useState<CohortDashboard | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!isValidProgram) return;
    setUnlocked(!!getCohortToken(program));
    setCheckingToken(false);
  }, [program, isValidProgram]);

  useEffect(() => {
    if (!unlocked) return;
    cohortService
      .getDashboard(program)
      .then(setData)
      .catch((err) => setLoadError(err?.message || "Failed to load your cohort dashboard."));
  }, [unlocked, program]);

  if (!isValidProgram) {
    notFound();
  }

  if (checkingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    );
  }

  if (!unlocked) {
    return <CohortPinGate program={program} onUnlocked={() => setUnlocked(true)} />;
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary px-6">
        <div className="bg-white rounded-2xl border border-red-100 p-8 text-center max-w-md">
          <p className="text-red-600 font-semibold">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    );
  }

  return <CohortPortalDashboard program={program} data={data} />;
}
