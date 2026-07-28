"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";

const MOCK_MATERIALS = [
  { id: "1", title: "Introduction to HTML & CSS", type: "PDF", date: "2026-07-20" },
  { id: "2", title: "Figma UI Kit Basics", type: "Link", date: "2026-07-22" },
];

export default function MaterialsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/cohort/portal" className="text-secondary hover:underline font-medium text-sm mb-8 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px]">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-cal-sans text-gray-900">Learning Materials</h2>
              <p className="text-gray-500">Access course resources and recorded sessions.</p>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_MATERIALS.map(m => (
              <div key={m.id} className="p-5 border border-gray-100 rounded-xl flex items-center justify-between hover:border-blue-100 hover:shadow-sm transition-all group">
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{m.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">{m.date} &bull; <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{m.type}</span></div>
                </div>
                <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
