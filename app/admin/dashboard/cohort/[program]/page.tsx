"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Settings,
  Upload,
  FileSpreadsheet,
  FileText,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
  cohortService,
  COHORT_PROGRAMS,
  AdminCohortSettings,
} from "@/lib/services/cohort.service";
import CohortAssignmentsManager from "@/components/admin/CohortAssignmentsManager";
import CohortAttendanceWindowControl from "@/components/admin/CohortAttendanceWindowControl";
import CohortCertificateTemplateEditor from "@/components/admin/CohortCertificateTemplateEditor";

function Banner({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-xl mb-6 border ${
        isSuccess ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"
      }`}
    >
      {isSuccess ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
      <p className="text-sm font-semibold">{children}</p>
    </div>
  );
}

export default function AdminCohortProgramPage() {
  const params = useParams();
  const program = String(params?.program || "");
  const programInfo = COHORT_PROGRAMS.find((p) => p.slug === program);
  const [activeTab, setActiveTab] = useState("settings");

  if (!programInfo) {
    notFound();
  }

  // The Assignments tab (multi-assignment CRUD list) stays hidden — the
  // learner dashboard now uses a single admin-set Google Classroom link
  // instead (see the Course Materials/Assignments block in SettingsTab).
  const tabs = [
    { id: "settings", label: "Settings", icon: Settings },
    // { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "attendance", label: "Attendance", icon: FileSpreadsheet },
    { id: "certificates", label: "Certificates", icon: FileText },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 p-4 shrink-0">
        <Link
          href="/admin/dashboard/cohort"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 px-2"
        >
          <ChevronLeft className="w-4 h-4" /> All programmes
        </Link>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">{programInfo.title}</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {activeTab === "settings" && <SettingsTab program={program} />}
        {activeTab === "assignments" && <CohortAssignmentsManager program={program} />}
        {activeTab === "attendance" && <AttendanceTab program={program} />}
        {activeTab === "certificates" && <CertificatesTab program={program} />}
      </div>
    </div>
  );
}

function SettingsTab({ program }: { program: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [accessPin, setAccessPin] = useState("");
  const [hasPinSet, setHasPinSet] = useState(false);
  const [cohortName, setCohortName] = useState("");
  const [cohortNumber, setCohortNumber] = useState("");
  const [trackCode, setTrackCode] = useState("");
  const [trackName, setTrackName] = useState("");
  const [trackMode, setTrackMode] = useState("");
  const [currentWeek, setCurrentWeek] = useState(1);
  const [liveClassLink, setLiveClassLink] = useState("");
  const [liveClassSchedule, setLiveClassSchedule] = useState("");
  const [missedClassLink, setMissedClassLink] = useState("");
  const [courseMaterialsLink, setCourseMaterialsLink] = useState("");
  const [assignmentsClassroomLink, setAssignmentsClassroomLink] = useState("");
  const [communityChatLink, setCommunityChatLink] = useState("");
  const [attendanceFormLink, setAttendanceFormLink] = useState("");
  const [certificateFolderLink, setCertificateFolderLink] = useState("");

  useEffect(() => {
    setLoading(true);
    cohortService
      .getSettings(program)
      .then((s: AdminCohortSettings) => {
        setHasPinSet(s.hasPinSet);
        setCohortName(s.cohortName);
        setCohortNumber(s.cohortNumber);
        setTrackCode(s.trackCode);
        setTrackName(s.trackName);
        setTrackMode(s.trackMode);
        setCurrentWeek(s.currentWeek);
        setLiveClassLink(s.liveClassLink);
        setLiveClassSchedule(s.liveClassSchedule);
        setMissedClassLink(s.missedClassLink);
        setCourseMaterialsLink(s.courseMaterialsLink);
        setAssignmentsClassroomLink(s.assignmentsClassroomLink);
        setCommunityChatLink(s.communityChatLink);
        setAttendanceFormLink(s.attendanceFormLink);
        setCertificateFolderLink(s.certificateFolderLink);
      })
      .catch(() => setStatus({ type: "error", msg: "Could not load settings." }))
      .finally(() => setLoading(false));
  }, [program]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!hasPinSet && accessPin.trim().length < 4) {
      setStatus({ type: "error", msg: "Set an Access PIN (at least 4 characters) before saving." });
      return;
    }

    setSaving(true);
    try {
      await cohortService.updateSettings(program, {
        ...(accessPin.trim() ? { accessPin: accessPin.trim() } : {}),
        cohortName: cohortName.trim(),
        cohortNumber: cohortNumber.trim(),
        trackCode: trackCode.trim(),
        trackName: trackName.trim(),
        trackMode: trackMode.trim(),
        currentWeek,
        liveClassLink: liveClassLink.trim(),
        liveClassSchedule: liveClassSchedule.trim(),
        missedClassLink: missedClassLink.trim(),
        courseMaterialsLink: courseMaterialsLink.trim(),
        assignmentsClassroomLink: assignmentsClassroomLink.trim(),
        communityChatLink: communityChatLink.trim(),
        attendanceFormLink: attendanceFormLink.trim(),
        certificateFolderLink: certificateFolderLink.trim(),
      });
      setHasPinSet(true);
      setAccessPin("");
      setStatus({ type: "success", msg: "Configuration updated successfully." });
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to save configuration." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-400">Loading settings…</p>;

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Portal Settings</h3>
      <p className="text-gray-500 mb-8">Everything shown on this programme&apos;s learner dashboard.</p>

      {status && <Banner type={status.type}>{status.msg}</Banner>}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4">Security</h4>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access PIN {hasPinSet && <span className="text-gray-400 font-normal">(leave blank to keep current PIN)</span>}
          </label>
          <input
            type="text"
            value={accessPin}
            onChange={(e) => setAccessPin(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary bg-white"
            placeholder={hasPinSet ? "••••••" : "e.g. 1234"}
            minLength={4}
            maxLength={20}
          />
        </div>

        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
          <h4 className="font-bold text-gray-900">Cohort Header</h4>
          <p className="text-xs text-gray-500 -mt-2">
            Heading shows &ldquo;Welcome to {"{Cohort name} {Cohort number}"}&rdquo;; the line under it shows
            &ldquo;{"{Track code} - {Track name} - {Track mode}"}&rdquo;.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cohort name</label>
              <input value={cohortName} onChange={(e) => setCohortName(e.target.value)} placeholder="e.g. ROTAGI She Tech Skills" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cohort number</label>
              <input value={cohortNumber} onChange={(e) => setCohortNumber(e.target.value)} placeholder="e.g. Cohort 2" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track code</label>
              <input value={trackCode} onChange={(e) => setTrackCode(e.target.value)} placeholder="e.g. RPD-121" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track name</label>
              <input value={trackName} onChange={(e) => setTrackName(e.target.value)} placeholder="e.g. Product Design / UIUX" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track mode</label>
              <input value={trackMode} onChange={(e) => setTrackMode(e.target.value)} placeholder="e.g. Remote" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
          <h4 className="font-bold text-gray-900">Programme Journey</h4>
          <p className="text-xs text-gray-500 -mt-2">
            This is the overall cohort&apos;s progress, shown the same way to every learner — not per-learner tracking.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current week</label>
            <select
              value={currentWeek}
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary"
            >
              {[1, 2, 3, 4].map((w) => (
                <option key={w} value={w}>
                  Week {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
          <h4 className="font-bold text-gray-900">My Classes</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live class link</label>
            <input type="url" value={liveClassLink} onChange={(e) => setLiveClassLink(e.target.value)} placeholder="https://meet.google.com/..." className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live class schedule</label>
            <input value={liveClassSchedule} onChange={(e) => setLiveClassSchedule(e.target.value)} placeholder="e.g. Wed - 4:00 PM WAT" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Missed class recording link</label>
            <input type="url" value={missedClassLink} onChange={(e) => setMissedClassLink(e.target.value)} placeholder="https://drive.google.com/..." className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Course Materials</h4>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course materials link</label>
            <input type="url" value={courseMaterialsLink} onChange={(e) => setCourseMaterialsLink(e.target.value)} placeholder="https://drive.google.com/..." className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Assignments</h4>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Classroom link</label>
            <input type="url" value={assignmentsClassroomLink} onChange={(e) => setAssignmentsClassroomLink(e.target.value)} placeholder="https://classroom.google.com/..." className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
        </div>

        {/* attendanceFormLink / certificateFolderLink stay saved but unused —
            Attendance and Certificate now use the self-tick / lookup tabs
            below instead of an external link. Re-add inputs here to revert. */}

        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-gray-900 mb-4">Community & Support</h4>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chat / support link</label>
          <input type="url" value={communityChatLink} onChange={(e) => setCommunityChatLink(e.target.value)} placeholder="https://chat.whatsapp.com/..." className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
        </div>

        <Button type="submit" variant="primary" disabled={saving} className="px-8">
          {saving ? "Saving..." : "Save Configuration"}
        </Button>
      </form>
    </div>
  );
}

function AttendanceTab({ program }: { program: string }) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus(null);
    setUploading(true);
    try {
      const msg = await cohortService.uploadAttendance(program, file);
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

      <CohortAttendanceWindowControl program={program} />
    </div>
  );
}

function CertificatesTab({ program }: { program: string }) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [showTemplateSection, setShowTemplateSection] = useState(false);

  useEffect(() => {
    cohortService
      .getCertificateTemplate(program)
      .then((data) => {
        if (data.eligibleLearnerCount > 0) setShowTemplateSection(true);
      })
      .catch(() => {});
  }, [program]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus(null);
    setUploading(true);
    try {
      const msg = await cohortService.uploadCertificates(program, file);
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
        who qualifies for a certificate, and the exact name that gets composited onto it.
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
          <CohortCertificateTemplateEditor program={program} />
        </>
      )}
    </div>
  );
}
