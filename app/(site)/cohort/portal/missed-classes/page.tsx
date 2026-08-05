"use client";

import { Video } from "lucide-react";
import Link from "next/link";
import CohortGuard from "@/components/cohort/CohortGuard";
import ResourceLinkPanel from "@/components/cohort/ResourceLinkPanel";

export default function MissedClassesPage() {
  return (
    <CohortGuard>
      <main className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/cohort/portal" className="text-secondary hover:underline font-medium text-sm mb-8 inline-block">
            &larr; Back to Dashboard
          </Link>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center">
            <ResourceLinkPanel
              accent="purple"
              icon={<Video className="w-12 h-12" />}
              title="Missed Classes"
              description="Catch up on what you missed. Find all recorded sessions and class playbacks hosted on Google Drive."
              cta="View Recorded Sessions"
              linkKey="missedClassesLink"
            />
          </div>
        </div>
      </main>
    </CohortGuard>
  );
}
