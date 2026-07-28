"use client";

import { BookOpen, Calendar, CheckCircle, FileText, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_ANNOUNCEMENTS = [
  { id: "1", title: "Welcome to the new Cohort Portal!", content: "Please make sure you track your attendance daily.", date: "2026-07-28" }
];

const dashboardLinks = [
  {
    title: "Learning Materials & Resources",
    description: "Access the cohort's Google Drive repository for all course materials and recorded sessions.",
    icon: BookOpen,
    href: "/cohort/portal/materials",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Attendance & Progress Tracker",
    description: "Sign in for classes and monitor your learning journey progress.",
    icon: Calendar,
    href: "/cohort/portal/attendance",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    title: "Missed Classes",
    description: "Catch up on any missed sessions and access supplementary notes.",
    icon: CheckCircle,
    href: "/cohort/portal/missed-classes",
    color: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    title: "Certificates & Achievements",
    description: "View and download your earned certificates and badges.",
    icon: FileText,
    href: "/cohort/portal/certificates",
    color: "bg-yellow-50 text-yellow-600 border-yellow-100",
  }
];

export default function CohortDashboard() {
  const router = useRouter();

  const handleLock = () => {
    sessionStorage.removeItem("cohort_auth");
    localStorage.removeItem("cohort_auth");
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-white font-dm-sans p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-pink-950/5 -skew-y-6 transform origin-top-left -z-10" />

      <div className="max-w-5xl mx-auto pt-16 md:pt-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-cal-sans text-gray-900 mb-4">Cohort Dashboard</h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Access your learning materials, track your progress, and stay updated.
            </p>
          </div>
          <button 
            onClick={handleLock}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm w-fit"
          >
            <Lock className="w-4 h-4" />
            Lock Portal
          </button>
        </div>

        {/* Announcements Section */}
        {MOCK_ANNOUNCEMENTS.length > 0 && (
          <div className="mb-10 bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-cal-sans text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                📢
              </span>
              Announcements
            </h2>
            <div className="space-y-4">
              {MOCK_ANNOUNCEMENTS.map(ann => (
                <div key={ann.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{ann.title}</h3>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{ann.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <h3 className="text-xl font-cal-sans text-gray-900 mb-2">
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
