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

  const tabs = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
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
  const [cohortCode, setCohortCode] = useState("");
  const [cohortTitle, setCohortTitle] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [pathwayLabel, setPathwayLabel] = useState("");
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weekLabels, setWeekLabels] = useState<string[]>([
    "Getting started",
    "Core skills",
    "In progress",
    "Showcase & certificate",
  ]);
  const [liveClassLink, setLiveClassLink] = useState("");
  const [liveClassSchedule, setLiveClassSchedule] = useState("");
  const [missedClassLink, setMissedClassLink] = useState("");
  const [courseMaterialsLink, setCourseMaterialsLink] = useState("");
  const [templatesLink, setTemplatesLink] = useState("");
  const [communityChatLink, setCommunityChatLink] = useState("");

  useEffect(() => {
    setLoading(true);
    cohortService
      .getSettings(program)
      .then((s: AdminCohortSettings) => {
        setHasPinSet(s.hasPinSet);
        setCohortCode(s.cohortCode);
        setCohortTitle(s.cohortTitle);
        setSchoolName(s.schoolName);
        setPathwayLabel(s.pathwayLabel);
        setCurrentWeek(s.currentWeek);
        setWeekLabels(s.weekLabels);
        setLiveClassLink(s.liveClassLink);
        setLiveClassSchedule(s.liveClassSchedule);
        setMissedClassLink(s.missedClassLink);
        setCourseMaterialsLink(s.courseMaterialsLink);
        setTemplatesLink(s.templatesLink);
        setCommunityChatLink(s.communityChatLink);
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
        cohortCode: cohortCode.trim(),
        cohortTitle: cohortTitle.trim(),
        schoolName: schoolName.trim(),
        pathwayLabel: pathwayLabel.trim(),
        currentWeek,
        weekLabels,
        liveClassLink: liveClassLink.trim(),
        liveClassSchedule: liveClassSchedule.trim(),
        missedClassLink: missedClassLink.trim(),
        courseMaterialsLink: courseMaterialsLink.trim(),
        templatesLink: templatesLink.trim(),
        communityChatLink: communityChatLink.trim(),
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cohort code</label>
            <input value={cohortCode} onChange={(e) => setCohortCode(e.target.value)} placeholder="e.g. AILIT-SEP26" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cohort title</label>
            <input value={cohortTitle} onChange={(e) => setCohortTitle(e.target.value)} placeholder="e.g. Basic Computer & AI Literacy" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School / venue name</label>
            <input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="e.g. Owajoba High School, Akure" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pathway badge</label>
            <input value={pathwayLabel} onChange={(e) => setPathwayLabel(e.target.value)} placeholder="e.g. SHE IGNITE PATHWAY" className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
          <h4 className="font-bold text-gray-900">Programme Journey</h4>
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
          <div className="grid grid-cols-2 gap-3">
            {weekLabels.map((label, i) => (
              <div key={i}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Week {i + 1} label</label>
                <input
                  value={label}
                  onChange={(e) => {
                    const next = [...weekLabels];
                    next[i] = e.target.value;
                    setWeekLabels(next);
                  }}
                  className="w-full p-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-primary text-sm"
                />
              </div>
            ))}
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
          <h4 className="font-bold text-gray-900">Learning Resources</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course materials link</label>
            <input type="url" value={courseMaterialsLink} onChange={(e) => setCourseMaterialsLink(e.target.value)} placeholder="https://drive.google.com/..." className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Templates & worksheets link</label>
            <input type="url" value={templatesLink} onChange={(e) => setTemplatesLink(e.target.value)} placeholder="https://drive.google.com/..." className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-primary" />
          </div>
        </div>

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
