"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, FileText, Lock, Video, Home as HomeIcon, Loader2 } from "lucide-react";
import { cohortService, clearCohortToken, CohortAnnouncement } from "@/lib/services/cohort.service";
import ResourceLinkPanel from "./ResourceLinkPanel";
import AttendanceLookup from "./AttendanceLookup";

export default function CohortDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const handleLock = () => {
    clearCohortToken();
    window.location.reload();
  };

  const tabs = [
    { id: "home", label: "Overview", icon: HomeIcon },
    { id: "materials", label: "Materials", icon: BookOpen },
    { id: "missed", label: "Missed Classes", icon: Video },
    { id: "certificates", label: "Certificates", icon: FileText },
    { id: "attendance", label: "Attendance", icon: Calendar },
  ];

  return (
    <main className="min-h-screen bg-gray-50 font-dm-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-pink-950/5 -skew-y-6 transform origin-top-left -z-10" />

      <div className="max-w-6xl mx-auto pt-16 md:pt-20 px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-gray-900">
          <div>
            <h1 className="text-4xl md:text-5xl font-cal-sans mb-3 text-black">Cohort Portal</h1>
            <p className="text-gray-600 text-lg max-w-xl">
              Welcome back! Access your learning materials, recordings, certificates, and attendance tracking here.
            </p>
          </div>
          <button
            onClick={handleLock}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium transition-colors text-sm w-fit shadow-sm border border-gray-200"
          >
            <Lock className="w-4 h-4" />
            Lock Portal
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 flex overflow-x-auto no-scrollbar gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-secondary text-white shadow-md shadow-pink-900/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 p-6 md:p-10 min-h-[500px]">
          {activeTab === "home" && <HomeTab />}
          {activeTab === "materials" && (
            <ResourceLinkPanel
              accent="orange"
              icon={<BookOpen className="w-12 h-12" />}
              title="Course Materials"
              description="Access all your slides, study guides, and reading resources hosted securely on Google Drive."
              cta="Open Materials Folder"
              linkKey="materialsLink"
            />
          )}
          {activeTab === "missed" && (
            <ResourceLinkPanel
              accent="purple"
              icon={<Video className="w-12 h-12" />}
              title="Missed Classes"
              description="Catch up on what you missed. Find all recorded sessions and class playbacks hosted on Google Drive."
              cta="View Recorded Sessions"
              linkKey="missedClassesLink"
            />
          )}
          {activeTab === "certificates" && (
            <ResourceLinkPanel
              accent="green"
              icon={<FileText className="w-12 h-12" />}
              title="Your Certificates"
              description="Completed your track? Access the Google Drive folder to search for and download your official certificate."
              cta="Access Certificates Folder"
              linkKey="certificatesLink"
            />
          )}
          {activeTab === "attendance" && <AttendanceLookup />}
        </div>
      </div>
    </main>
  );
}

function HomeTab() {
  const [announcements, setAnnouncements] = useState<CohortAnnouncement[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    cohortService
      .getAnnouncements()
      .then((data) => active && setAnnouncements(data))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-cal-sans text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
          📢
        </span>
        Recent Announcements
      </h2>
      <div className="space-y-4 max-w-3xl">
        {announcements === null && !error ? (
          <div className="flex items-center gap-3 text-gray-400 py-6">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading announcements…</span>
          </div>
        ) : error ? (
          <p className="text-red-500 italic">Could not load announcements. Please try again later.</p>
        ) : announcements && announcements.length > 0 ? (
          announcements.map(ann => (
            <div key={ann.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{ann.title}</h3>
                <span className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">{ann.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{ann.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No announcements at this time.</p>
        )}
      </div>
    </div>
  );
}
