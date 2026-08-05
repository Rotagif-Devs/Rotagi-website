"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { cohortService, CohortSettings } from "@/lib/services/cohort.service";

const ACCENTS = {
  orange: { bg: "bg-orange-50", text: "text-orange-500", btn: "bg-orange-500 hover:bg-orange-600", shadow: "shadow-orange-500/30" },
  purple: { bg: "bg-purple-50", text: "text-purple-500", btn: "bg-purple-600 hover:bg-purple-700", shadow: "shadow-purple-600/30" },
  green: { bg: "bg-green-50", text: "text-green-600", btn: "bg-green-600 hover:bg-green-700", shadow: "shadow-green-600/30" },
} as const;

export type ResourceAccent = keyof typeof ACCENTS;

/**
 * Shows the admin-configured Google Drive link for one cohort resource category
 * (materials / missed classes / certificates). Used both inside the tabbed
 * CohortDashboard and standalone on the deep-linkable portal pages.
 */
export default function ResourceLinkPanel({
  accent,
  icon,
  title,
  description,
  cta,
  linkKey,
}: {
  accent: ResourceAccent;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  linkKey: keyof CohortSettings;
}) {
  const [settings, setSettings] = useState<CohortSettings | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    cohortService
      .getSettings()
      .then((data) => {
        if (active) setSettings(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const a = ACCENTS[accent];
  const link = settings?.[linkKey];

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`w-24 h-24 ${a.bg} ${a.text} rounded-full flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h2 className="text-3xl font-cal-sans text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-500 text-lg mb-8">{description}</p>

      {!settings && !error ? (
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading link…</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">Could not load this resource. Please try again later.</span>
        </div>
      ) : link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${a.btn} text-white font-bold py-4 px-8 rounded-full shadow-lg ${a.shadow} transition-transform hover:-translate-y-1 w-full sm:w-auto`}
        >
          {cta}
        </a>
      ) : (
        <div className="flex items-center gap-2 text-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">This resource hasn&apos;t been added by the admin yet.</span>
        </div>
      )}
    </div>
  );
}
