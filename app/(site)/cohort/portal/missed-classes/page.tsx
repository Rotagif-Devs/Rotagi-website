"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function MissedClassesPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/cohort/portal" className="text-secondary hover:underline font-medium text-sm mb-8 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-cal-sans text-gray-900 mb-4">Missed Classes</h2>
          <p className="text-gray-500 text-lg max-w-md">
            No missed classes have been uploaded by the admin yet. Check back later to catch up on any sessions you might have missed.
          </p>
        </div>
      </div>
    </main>
  );
}
