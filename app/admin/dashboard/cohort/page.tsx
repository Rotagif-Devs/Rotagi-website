"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Settings, Users, FileText, BookOpen, Megaphone, Upload, CheckCircle, Clock } from "lucide-react";

// Mock Data
const MOCK_STUDENTS = [
  { id: "1", name: "Amina Yusuf", email: "amina@example.com", track: "Data Analysis", attendance: { present: 14, absent: 2 }, certUploaded: false },
  { id: "2", name: "Chioma Eze", email: "chioma@example.com", track: "UI/UX Design", attendance: { present: 16, absent: 0 }, certUploaded: true },
  { id: "3", name: "Fatima Ali", email: "fatima@example.com", track: "Web Development", attendance: { present: 10, absent: 6 }, certUploaded: false },
];

const MOCK_MATERIALS = [
  { id: "1", title: "Introduction to HTML & CSS", type: "PDF", date: "2026-07-20" },
  { id: "2", title: "Figma UI Kit Basics", type: "Link", date: "2026-07-22" },
];

const MOCK_ANNOUNCEMENTS = [
  { id: "1", title: "Welcome to the new Cohort Portal!", content: "Please make sure you track your attendance daily.", date: "2026-07-28" }
];

export default function AdminCohortPage() {
  const [activeTab, setActiveTab] = useState("settings");
  
  // States that can be overridden by backend API fetch later
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [materials, setMaterials] = useState(MOCK_MATERIALS);
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);

  useEffect(() => {
    // TODO: When backend is ready, fetch data here and call setStudents, setMaterials, setAnnouncements
    // If fetch is successful, the mock data will be overwritten.
  }, []);

  const tabs = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "certificates", label: "Certificates", icon: FileText },
    { id: "materials", label: "Materials", icon: BookOpen },
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
        {activeTab === "attendance" && <AttendanceTab students={students} />}
        {activeTab === "certificates" && <CertificatesTab students={students} setStudents={setStudents} />}
        {activeTab === "materials" && <MaterialsTab materials={materials} setMaterials={setMaterials} />}
        {activeTab === "announcements" && <AnnouncementsTab announcements={announcements} setAnnouncements={setAnnouncements} />}
      </div>
    </div>
  );
}

// --- SUB COMPONENTS FOR TABS --- //

function SettingsTab() {
  const [pin, setPin] = useState("1234");
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); alert("Settings saved!"); }, 800);
  };

  return (
    <div className="max-w-xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Portal Settings</h3>
      <p className="text-gray-500 mb-8">Manage access PIN and basic portal configurations.</p>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access PIN</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
          />
        </div>
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}

function AttendanceTab({ students }: { students: any[] }) {
  return (
    <div>
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Attendance Tracker</h3>
      <p className="text-gray-500 mb-6">Monitor student presence and absence records.</p>
      
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="p-4 font-medium">Student Name</th>
              <th className="p-4 font-medium">Track</th>
              <th className="p-4 font-medium text-center">Present</th>
              <th className="p-4 font-medium text-center">Absent</th>
              <th className="p-4 font-medium text-center">Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => {
              const total = s.attendance.present + s.attendance.absent;
              const perc = total === 0 ? 0 : Math.round((s.attendance.present / total) * 100);
              return (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.email}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{s.track}</td>
                  <td className="p-4 text-center font-medium text-green-600">{s.attendance.present}</td>
                  <td className="p-4 text-center font-medium text-red-600">{s.attendance.absent}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${perc >= 75 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {perc}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CertificatesTab({ students, setStudents }: { students: any[], setStudents: any }) {
  const handleUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulate file upload delay
      alert(`Uploading certificate for student ID ${id}...`);
      setTimeout(() => {
        setStudents(students.map(s => s.id === id ? { ...s, certUploaded: true } : s));
        alert("Upload successful!");
      }, 1000);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Certificates Manager</h3>
      <p className="text-gray-500 mb-6">Upload certificates for students who have completed their tracks.</p>
      
      <div className="grid gap-4">
        {students.map((s) => (
          <div key={s.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            <div>
              <div className="font-medium text-gray-900">{s.name}</div>
              <div className="text-sm text-gray-500">{s.track}</div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              {s.certUploaded ? (
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                  <CheckCircle className="w-4 h-4" /> Uploaded
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4" /> Pending
                </span>
              )}
              <label className="cursor-pointer bg-white border border-gray-200 hover:border-primary px-4 py-2 rounded-xl text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Upload PDF</span>
                <input type="file" accept=".pdf,image/*" className="hidden" onChange={(e) => handleUpload(s.id, e)} />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaterialsTab({ materials, setMaterials }: { materials: any[], setMaterials: any }) {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      const newMat = { id: Date.now().toString(), title, type: "File", date: new Date().toISOString().split('T')[0] };
      setMaterials([newMat, ...materials]);
      setUploading(false);
      setTitle("");
      alert("Material uploaded successfully!");
    }, 1000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Upload Material</h3>
        <p className="text-gray-500 mb-6">Add new resources to the cohort portal.</p>
        <form onSubmit={handleUpload} className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Material Title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg" placeholder="e.g. Week 1 Slide Deck" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
            <input type="file" required className="w-full p-2 border border-gray-200 rounded-lg bg-white" />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Resource"}
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-cal-sans text-gray-900 mb-4">Uploaded Materials</h3>
        <div className="space-y-3">
          {materials.length === 0 ? (
            <p className="text-gray-500 text-sm">No materials uploaded yet.</p>
          ) : (
            materials.map(m => (
              <div key={m.id} className="p-3 border border-gray-100 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{m.title}</div>
                  <div className="text-xs text-gray-500">{m.date} &bull; {m.type}</div>
                </div>
                <button className="text-red-500 text-sm hover:underline" onClick={() => setMaterials(materials.filter((item: any) => item.id !== m.id))}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
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
