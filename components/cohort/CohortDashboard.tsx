"use client";

import { BookOpen, Calendar, CheckCircle, FileText, Upload } from "lucide-react";
import Link from "next/link";

const dashboardLinks = [
  {
    title: "Learning Materials & Resources",
    description: "Access the cohort's Google Drive repository for all course materials and recorded sessions.",
    icon: BookOpen,
    href: "#", // Placeholder
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Attendance & Progress Tracker",
    description: "Sign in for classes and monitor your learning journey progress.",
    icon: Calendar,
    href: "#", // Placeholder
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    title: "Missed Classes",
    description: "Catch up on any missed sessions and access supplementary notes.",
    icon: CheckCircle,
    href: "#", // Placeholder
    color: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    title: "Certificates & Achievements",
    description: "View and download your earned certificates and badges.",
    icon: FileText,
    href: "#", // Placeholder
    color: "bg-yellow-50 text-yellow-600 border-yellow-100",
  },
  {
    title: "Facilitator Upload Portal",
    description: "Secure upload portal for facilitators to share new materials.",
    icon: Upload,
    href: "#", // Placeholder
    color: "bg-purple-50 text-purple-600 border-purple-100",
  }
];

export default function CohortDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 font-dm-sans p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-primary -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-cal-sans text-white mb-4">Cohort Dashboard</h1>
          <p className="text-white/80 text-lg">
            Welcome back! Access your learning materials, track your progress, and stay updated.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group block p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-100 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-cal-sans text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
