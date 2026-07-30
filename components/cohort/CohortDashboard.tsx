"use client";

import { useState } from "react";
import { BookOpen, Calendar, FileText, Lock, Video, Home as HomeIcon, Search } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

// Mock Data
const MOCK_ANNOUNCEMENTS = [
  { id: "1", title: "Welcome to the new Cohort Portal!", content: "Please make sure you track your attendance daily.", date: "2026-07-28" }
];

export default function CohortDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const handleLock = () => {
    sessionStorage.removeItem("cohort_auth");
    localStorage.removeItem("cohort_auth");
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
          {activeTab === "materials" && <MaterialsTab />}
          {activeTab === "missed" && <MissedClassesTab />}
          {activeTab === "certificates" && <CertificatesTab />}
          {activeTab === "attendance" && <AttendanceTab />}
        </div>
      </div>
    </main>
  );
}

// --- TAB COMPONENTS --- //

function HomeTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-cal-sans text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
          📢
        </span>
        Recent Announcements
      </h2>
      <div className="space-y-4 max-w-3xl">
        {MOCK_ANNOUNCEMENTS.length > 0 ? (
          MOCK_ANNOUNCEMENTS.map(ann => (
            <div key={ann.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{ann.title}</h3>
                <span className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">{ann.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{ann.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No announcements at this time.</p>
        )}
      </div>
    </div>
  );
}

function MaterialsTab() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-24 h-24 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
        <BookOpen className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-cal-sans text-gray-900 mb-4">Course Materials</h2>
      <p className="text-gray-500 text-lg mb-8">
        Access all your slides, study guides, and reading resources hosted securely on Google Drive.
      </p>
      
      {/* 
        This is where the Google Drive Link from the admin panel would be injected.
        For now, it acts as an external button. 
      */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-orange-500/30 transition-transform hover:-translate-y-1 w-full sm:w-auto"
      >
        Open Materials Folder
      </a>
    </div>
  );
}

function MissedClassesTab() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-24 h-24 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6">
        <Video className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-cal-sans text-gray-900 mb-4">Missed Classes</h2>
      <p className="text-gray-500 text-lg mb-8">
        Catch up on what you missed. Find all recorded sessions and class playbacks hosted on Google Drive.
      </p>
      
      {/* 
        This is where the Google Drive Link from the admin panel would be injected.
      */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-purple-600/30 transition-transform hover:-translate-y-1 w-full sm:w-auto"
      >
        View Recorded Sessions
      </a>
    </div>
  );
}

function CertificatesTab() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
        <FileText className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-cal-sans text-gray-900 mb-4">Your Certificates</h2>
      <p className="text-gray-500 text-lg mb-8">
        Completed your track? Access the Google Drive folder to search for and download your official certificate.
      </p>
      
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-green-600/30 transition-transform hover:-translate-y-1 w-full sm:w-auto"
      >
        Access Certificates Folder
      </a>
    </div>
  );
}

function AttendanceTab() {
  const [email, setEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setHasSearched(true);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-cal-sans text-gray-900 mb-2">Attendance Tracker</h2>
        <p className="text-gray-500">Enter your registered email to check your attendance records.</p>
      </div>

      {!hasSearched ? (
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="email" 
              required
              placeholder="e.g. yourname@example.com"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" className="py-4 px-8 rounded-xl shrink-0">
            Check Record
          </Button>
        </form>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center max-w-lg mx-auto animate-in zoom-in-95">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Records Not Available</h3>
          <p className="text-yellow-700 mb-6">
            The attendance records for <strong className="font-semibold">{email}</strong> have not been uploaded by the administrator yet. Please check back later.
          </p>
          <button 
            onClick={() => setHasSearched(false)}
            className="text-sm font-bold text-yellow-800 hover:underline"
          >
            Check another email
          </button>
        </div>
      )}
    </div>
  );
}
