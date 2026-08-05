"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import CohortGuard from "@/components/cohort/CohortGuard";
import ResourceLinkPanel from "@/components/cohort/ResourceLinkPanel";

export default function MaterialsPage() {
  return (
    <CohortGuard>
      <main className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/cohort/portal" className="text-secondary hover:underline font-medium text-sm mb-8 inline-block">
            &larr; Back to Dashboard
          </Link>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center">
            <ResourceLinkPanel
              accent="orange"
              icon={<BookOpen className="w-12 h-12" />}
              title="Course Materials"
              description="Access all your slides, study guides, and reading resources hosted securely on Google Drive."
              cta="Open Materials Folder"
              linkKey="materialsLink"
            />
          </div>
        </div>
      </main>
    </CohortGuard>
  );
}
