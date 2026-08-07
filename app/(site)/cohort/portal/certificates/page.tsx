"use client";

import Link from "next/link";
import CohortGuard from "@/components/cohort/CohortGuard";
import CertificateLookup from "@/components/cohort/CertificateLookup";

export default function CertificatesPage() {
  return (
    <CohortGuard>
      <main className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/cohort/portal" className="text-secondary hover:underline font-medium text-sm mb-8 inline-block">
            &larr; Back to Dashboard
          </Link>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center">
            <CertificateLookup />
          </div>
        </div>
      </main>
    </CohortGuard>
  );
}
