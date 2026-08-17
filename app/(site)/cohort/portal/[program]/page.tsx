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
  clearCohortToken,
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
      .catch((err) => {
        const message = err?.message || "Failed to load your cohort dashboard.";
        // An expired/invalid cohort token is a normal session timeout, not a real
        // error — clear it and drop back to the PIN gate instead of dead-ending
        // on a raw "Unauthorized" message with no way forward.
        if (/unauthorized/i.test(message)) {
          clearCohortToken(program);
          setUnlocked(false);
          return;
        }
        setLoadError(message);
      });
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
