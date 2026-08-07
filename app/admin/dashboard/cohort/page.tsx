"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Settings, Megaphone, Upload, Link as LinkIcon, FileSpreadsheet, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cohortService, CohortAnnouncement } from "@/lib/services/cohort.service";
import CertificateTemplateEditor from "@/components/admin/CertificateTemplateEditor";
import AttendanceWindowControl from "@/components/admin/AttendanceWindowControl";

export default function AdminCohortPage() {
  const [activeTab, setActiveTab] = useState("settings");

  const tabs = [
    { id: "settings", label: "Links & Settings", icon: Settings },
    { id: "attendance", label: "Attendance Upload", icon: FileSpreadsheet },
    { id: "certificates", label: "Certificates Upload", icon: FileText },
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
        {activeTab === "certificates" && <CertificatesTab />}
        {activeTab === "announcements" && <AnnouncementsTab />}
      </div>
    </div>
  );
}

// --- Shared inline status banner --- //
function Banner({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-xl mb-6 border ${
        isSuccess
          ? "bg-green-50 text-green-700 border-green-100"
          : "bg-red-50 text-red-600 border-red-100"
      }`}
    >
      {isSuccess ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
      <p className="text-sm font-semibold">{children}</p>
    </div>
  );
}

// --- SUB COMPONENTS FOR TABS --- //

function SettingsTab() {
  const [pin, setPin] = useState("");
  const [materialsLink, setMaterialsLink] = useState("");
  const [missedClassesLink, setMissedClassesLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (pin.trim().length < 4) {
      setStatus({ type: "error", msg: "Access PIN must be at least 4 characters." });
      return;
    }

    setSaving(true);
    try {
      await cohortService.updateSettings({
        accessPin: pin.trim(),
        materialsLink: materialsLink.trim(),
        missedClassesLink: missedClassesLink.trim(),
      });
      setStatus({ type: "success", msg: "Configuration updated successfully." });
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to save configuration." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Portal Links & Settings</h3>
      <p className="text-gray-500 mb-8">Manage access PIN and external Google Drive links for the learner portal.</p>

      {status && <Banner type={status.type}>{status.msg}</Banner>}

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
              minLength={4}
              maxLength={20}
            />
            <p className="text-xs text-gray-400 mt-2">
              Setting a new PIN replaces the old one. Learners currently signed in keep access until they lock the portal.
            </p>
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
                required
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
                required
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
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus(null);
    setUploading(true);

    try {
      const msg = await cohortService.uploadAttendance(file);
      setStatus({ type: "success", msg });
      setFile(null);
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Upload failed. Please check the file and try again." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Attendance Upload</h3>
      <p className="text-gray-500 mb-8">Upload the offline generated `.xlsx` or `.csv` file containing learner attendance data.</p>

      {status && <Banner type={status.type}>{status.msg}</Banner>}

      <form onSubmit={handleUpload} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Spreadsheet (.xlsx / .csv)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white hover:border-primary transition-colors cursor-pointer relative">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>{file ? file.name : "Upload a file"}</span>
                  <input
                    type="file"
                    accept=".xlsx, .csv"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                  />
                </span>
              </div>
              <p className="text-xs text-gray-500">Excel or CSV up to 5MB</p>
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" disabled={uploading || !file} className="w-full">
          {uploading ? "Processing Data..." : "Upload & Sync Attendance"}
        </Button>
      </form>

      <hr className="my-10 border-gray-100" />

      <AttendanceWindowControl />
    </div>
  );
}

function CertificatesTab() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  // The template editor only makes sense once there's someone to generate a
  // certificate for — hidden until an upload succeeds here, or (on reload)
  // there's already an eligibility list from a previous session.
  const [showTemplateSection, setShowTemplateSection] = useState(false);

  useEffect(() => {
    cohortService
      .getCertificateTemplate()
      .then((data) => {
        if (data.eligibleLearnerCount > 0) setShowTemplateSection(true);
      })
      .catch(() => {});
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus(null);
    setUploading(true);

    try {
      const msg = await cohortService.uploadCertificates(file);
      setStatus({ type: "success", msg });
      setFile(null);
      setShowTemplateSection(true);
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Upload failed. Please check the file and try again." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Certificate Eligibility List</h3>
      <p className="text-gray-500 mb-8">
        Upload a spreadsheet with an <strong>Email</strong> column and a <strong>Full Name</strong> column — this is
        who qualifies for a certificate, and the exact name that gets composited onto it. Learners then verify with
        both their name and email on the portal, so they can only ever get their own certificate.
      </p>

      {status && <Banner type={status.type}>{status.msg}</Banner>}

      <form onSubmit={handleUpload} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Spreadsheet (.xlsx / .csv)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white hover:border-primary transition-colors cursor-pointer relative">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>{file ? file.name : "Upload a file"}</span>
                  <input
                    type="file"
                    accept=".xlsx, .csv"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                  />
                </span>
              </div>
              <p className="text-xs text-gray-500">Excel or CSV up to 5MB</p>
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" disabled={uploading || !file} className="w-full">
          {uploading ? "Processing Data..." : "Upload & Sync Eligibility List"}
        </Button>
      </form>

      {showTemplateSection && (
        <>
          <hr className="my-10 border-gray-100" />
          <CertificateTemplateEditor />
        </>
      )}
    </div>
  );
}

function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState<CohortAnnouncement[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadAnnouncements = async () => {
    setLoadingList(true);
    setListError(false);
    try {
      const data = await cohortService.getAnnouncementsAdmin();
      setAnnouncements(data);
    } catch {
      setListError(true);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setPosting(true);
    try {
      const created = await cohortService.createAnnouncement({ title: title.trim(), content: content.trim() });
      setAnnouncements((prev) => [created, ...prev]);
      setTitle("");
      setContent("");
      setStatus({ type: "success", msg: "Announcement posted." });
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to post announcement." });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">New Announcement</h3>
        <p className="text-gray-500 mb-6">Broadcast information to the learner portal.</p>

        {status && <Banner type={status.type}>{status.msg}</Banner>}

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
          {loadingList ? (
            <div className="flex items-center gap-3 text-gray-400 py-4">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading…</span>
            </div>
          ) : listError ? (
            <p className="text-red-500 text-sm">Could not load announcements.</p>
          ) : announcements.length === 0 ? (
            <p className="text-gray-500 text-sm">No announcements yet.</p>
          ) : (
            announcements.map(a => (
              <div key={a.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900">{a.title}</h4>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{a.date}</span>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-line">{a.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
