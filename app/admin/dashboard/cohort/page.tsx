"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Settings, Users, Megaphone, Upload, Link as LinkIcon, FileSpreadsheet } from "lucide-react";

// Mock Data
const MOCK_ANNOUNCEMENTS = [
  { id: "1", title: "Welcome to the new Cohort Portal!", content: "Please make sure you track your attendance daily.", date: "2026-07-28" }
];

export default function AdminCohortPage() {
  const [activeTab, setActiveTab] = useState("settings");
  
  // State for announcements
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);

  const tabs = [
    { id: "settings", label: "Links & Settings", icon: Settings },
    { id: "attendance", label: "Attendance Upload", icon: FileSpreadsheet },
    { id: "announcements", label: "Announcements", icon: Megaphone },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 p-4 shrink-0">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Cohort Manage</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "attendance" && <AttendanceTab />}
        {activeTab === "announcements" && <AnnouncementsTab announcements={announcements} setAnnouncements={setAnnouncements} />}
      </div>
    </div>
  );
}

// --- SUB COMPONENTS FOR TABS --- //

function SettingsTab() {
  const [pin, setPin] = useState("1234");
  const [materialsLink, setMaterialsLink] = useState("");
  const [missedClassesLink, setMissedClassesLink] = useState("");
  const [certificatesLink, setCertificatesLink] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); alert("Settings saved!"); }, 800);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Portal Links & Settings</h3>
      <p className="text-gray-500 mb-8">Manage access PIN and external Google Drive links for the learner portal.</p>
      
      <form onSubmit={handleSave} className="space-y-8">
        {/* Access PIN Section */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" /> Security
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Master Access PIN</label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary bg-white"
              placeholder="e.g. 1234"
              required
            />
          </div>
        </div>

        {/* Links Section */}
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-600" /> External Resource Links
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Materials Google Drive Link</label>
              <input
                type="url"
                value={materialsLink}
                onChange={(e) => setMaterialsLink(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Missed Classes Link</label>
              <input
                type="url"
                value={missedClassesLink}
                onChange={(e) => setMissedClassesLink(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificates Google Drive Link</label>
              <input
                type="url"
                value={certificatesLink}
                onChange={(e) => setCertificatesLink(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" disabled={saving} className="px-8">
          {saving ? "Saving..." : "Save Configuration"}
        </Button>
      </form>
    </div>
  );
}

function AttendanceTab() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setFile(null);
      alert("Attendance XLSX uploaded successfully! Learners can now view their records.");
    }, 1500);
  };

  return (
    <div className="max-w-xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Attendance Upload</h3>
      <p className="text-gray-500 mb-8">Upload the offline generated `.xlsx` file containing learner attendance data.</p>
      
      <form onSubmit={handleUpload} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Spreadsheet (.xlsx)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white hover:border-primary transition-colors cursor-pointer relative">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>{file ? file.name : "Upload a file"}</span>
                  <input 
                    type="file" 
                    accept=".xlsx, .xls, .csv" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required 
                  />
                </span>
              </div>
              <p className="text-xs text-gray-500">Excel or CSV up to 10MB</p>
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" disabled={uploading || !file} className="w-full">
          {uploading ? "Processing Data..." : "Upload & Sync Attendance"}
        </Button>
      </form>
    </div>
  );
}

function AnnouncementsTab({ announcements, setAnnouncements }: { announcements: any[], setAnnouncements: any }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    setTimeout(() => {
      const newAnn = { id: Date.now().toString(), title, content, date: new Date().toISOString().split('T')[0] };
      setAnnouncements([newAnn, ...announcements]);
      setPosting(false);
      setTitle("");
      setContent("");
    }, 800);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">New Announcement</h3>
        <p className="text-gray-500 mb-6">Broadcast information to the learner portal.</p>
        <form onSubmit={handlePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea required value={content} onChange={e => setContent(e.target.value)} rows={4} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
          </div>
          <Button type="submit" variant="primary" disabled={posting}>
            {posting ? "Posting..." : "Post Announcement"}
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-cal-sans text-gray-900 mb-4">Recent Announcements</h3>
        <div className="space-y-4">
          {announcements.length === 0 ? (
             <p className="text-gray-500 text-sm">No announcements yet.</p>
          ) : (
            announcements.map(a => (
              <div key={a.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900">{a.title}</h4>
                  <span className="text-xs text-gray-400">{a.date}</span>
                </div>
                <p className="text-sm text-gray-600">{a.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
