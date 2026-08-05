"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getCohortToken } from "@/lib/services/cohort.service";

/**
 * These portal sub-pages are deep-linkable routes separate from /cohort/portal,
 * which is where the PIN gate actually lives. Without this guard, hitting one
 * directly (no cohort token yet) would just spray 401s at every fetch.
 */
export default function CohortGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (getCohortToken()) {
      setAuthorized(true);
    } else {
      router.replace("/cohort/portal");
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
