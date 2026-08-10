"use client";

import { useState } from "react";
import {
  Sprout,
  Play,
  FileText,
  PenLine,
  CheckCircle2,
  Sparkles,
  Heart,
  ArrowRight,
  Lock,
  Search,
  User,
  Download,
  XCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
  cohortService,
  CohortDashboard as CohortDashboardData,
  AssignmentStatusType,
} from "@/lib/services/cohort.service";

const STATUS_DOT: Record<AssignmentStatusType, string> = {
  pending: "bg-amber-500",
  submitted: "bg-emerald-500",
  feedback: "bg-blue-500",
};

const STATUS_TEXT: Record<AssignmentStatusType, string> = {
  pending: "text-amber-600",
  submitted: "text-emerald-600",
  feedback: "text-blue-600",
};

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <span className="text-xs font-bold text-secondary">{index}</span>
      <h2 className="text-xl font-cal-sans text-gray-900">{title}</h2>
    </div>
  );
}

function ActionCard({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  statusDot,
  actionLabel,
  href,
  onAction,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  statusDot?: string;
  actionLabel: string;
  href?: string;
  onAction?: () => void;
}) {
  const body = (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 flex items-center gap-1.5">
        {statusDot && <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />}
        {subtitle}
      </p>
      <span className="mt-auto text-sm font-bold text-secondary flex items-center gap-1.5">
        {actionLabel} <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {body}
      </a>
    );
  }
  return (
    <button type="button" onClick={onAction} className="text-left h-full w-full">
      {body}
    </button>
  );
}

function WeekTracker({ currentWeek, weekLabels }: { currentWeek: number; weekLabels: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
      <h3 className="font-bold text-gray-900 mb-1">Your programme journey</h3>
      <p className="text-sm text-gray-500 mb-8">
        Google Classroom holds the real detail — this just shows roughly where your cohort is.
      </p>
      <div className="flex items-start">
        {weekLabels.map((label, i) => {
          const week = i + 1;
          const done = week < currentWeek;
          const current = week === currentWeek;
          return (
            <div key={week} className="flex-1 flex flex-col items-center relative">
              {i > 0 && (
                <div
                  className={`absolute top-5 right-1/2 w-full h-0.5 -z-10 ${
                    week <= currentWeek ? "bg-secondary" : "bg-gray-200"
                  }`}
                />
              )}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  done
                    ? "bg-secondary border-secondary text-white"
                    : current
                      ? "bg-white border-secondary text-secondary"
                      : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {done ? <CheckCircle2 className="w-5 h-5" /> : week}
              </div>
              <span className="mt-2 text-xs font-bold text-gray-700">Week {week}</span>
              <span className="text-xs text-gray-500 text-center px-1">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AttendanceMarker({ program, onClose }: { program: string; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus(null);
    try {
      const data = await cohortService.markAttendance(program, email.trim());
      setStatus({ type: "success", msg: `Marked present for ${data.date}.` });
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to mark attendance." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Mark today&apos;s attendance</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <XCircle className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleMark} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Your registered email"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 focus:bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="primary" className="py-3 px-6 rounded-xl shrink-0" disabled={loading}>
          {loading ? "Marking…" : "Mark Present"}
        </Button>
      </form>
      {status && (
        <p className={`mt-3 text-sm font-semibold ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
          {status.msg}
        </p>
      )}
    </div>
  );
}

function CertificateChecker({ program, onClose }: { program: string; onClose: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [certImage, setCertImage] = useState<string | null>(null);
  const [certPdf, setCertPdf] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    setLoading(true);
    setError("");
    setNotFound(false);
    setCertImage(null);
    setCertPdf(null);
    try {
      const data = await cohortService.getCertificateRecord(program, email.trim(), fullName.trim());
      if (data) {
        setCertImage(data.certificateImage);
        setCertPdf(data.certificatePdf);
      } else {
        setNotFound(true);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Check certificate status</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      {!certImage && (
        <form onSubmit={handleCheck} className="space-y-3">
          <div className="relative">
            <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="Full name as registered"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 focus:bg-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="Your registered email"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full py-3 rounded-xl" disabled={loading}>
            {loading ? "Checking…" : "Check Status"}
          </Button>
        </form>
      )}

      {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      {notFound && (
        <p className="mt-3 text-sm font-semibold text-amber-600">
          No certificate found yet for that name and email — check back after your showcase.
        </p>
      )}
      {certImage && (
        <div className="mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- data: URL */}
          <img src={certImage} alt="Your certificate" className="w-full rounded-lg border border-gray-100 mb-4" />
          <div className="flex gap-3">
            <a
              href={certImage}
              download="certificate.png"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-xl"
            >
              <Download className="w-4 h-4" /> Image
            </a>
            {certPdf && (
              <a
                href={certPdf}
                download="certificate.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl"
              >
                <Download className="w-4 h-4" /> PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CohortPortalDashboard({
  program,
  data,
}: {
  program: string;
  data: CohortDashboardData;
}) {
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);

  return (
    <main className="min-h-screen bg-primary pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        {/* Hero */}
        <div className="bg-secondary rounded-3xl p-8 mb-6 text-white relative overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-cal-sans mb-2 flex items-center gap-2">
            Welcome to your cohort <Sprout className="w-6 h-6" />
          </h1>
          <p className="text-white/80 text-sm md:text-base mb-4">
            {[data.cohortCode, data.cohortTitle, data.schoolName].filter(Boolean).join(" · ")}
          </p>
          {data.pathwayLabel && (
            <span className="inline-block bg-white/15 border border-white/25 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {data.pathwayLabel}
            </span>
          )}
        </div>

        {/* Journey */}
        <WeekTracker currentWeek={data.currentWeek} weekLabels={data.weekLabels} />

        {/* 01 My Classes */}
        <section className="mb-8">
          <SectionHeader index="01" title="My Classes" />
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              icon={<Play className="w-5 h-5" />}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
              title="Join live class"
              subtitle={data.liveClassSchedule || "Schedule TBA"}
              actionLabel="Join class"
              href={data.liveClassLink || undefined}
            />
            <ActionCard
              icon={<FileText className="w-5 h-5" />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Watch missed class"
              subtitle="Catch up on the recording"
              statusDot="bg-red-500"
              actionLabel="Watch recording"
              href={data.missedClassLink || undefined}
            />
          </div>
        </section>

        {/* 02 Assignments */}
        {data.assignments.length > 0 && (
          <section className="mb-8">
            <SectionHeader index="02" title="Assignments" />
            <div className="grid sm:grid-cols-2 gap-4">
              {data.assignments.map((a) => (
                <ActionCard
                  key={a.id}
                  icon={<PenLine className="w-5 h-5" />}
                  iconBg="bg-amber-50"
                  iconColor="text-amber-600"
                  title={a.title}
                  subtitle={a.statusLabel}
                  statusDot={STATUS_DOT[a.statusType]}
                  actionLabel={a.actionLabel}
                  href={a.actionUrl}
                />
              ))}
            </div>
          </section>
        )}

        {/* 03 Learning Resources */}
        <section className="mb-8">
          <SectionHeader index="03" title="Learning Resources" />
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              icon={<FileText className="w-5 h-5" />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Course materials"
              subtitle="Slides, handouts & guides"
              actionLabel="Open folder"
              href={data.courseMaterialsLink || undefined}
            />
            <ActionCard
              icon={<FileText className="w-5 h-5" />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Templates & worksheets"
              subtitle="Editable copies"
              actionLabel="Open folder"
              href={data.templatesLink || undefined}
            />
          </div>
        </section>

        {/* 04 Attendance */}
        <section className="mb-8">
          <SectionHeader index="04" title="Attendance" />
          {showAttendanceForm ? (
            <AttendanceMarker program={program} onClose={() => setShowAttendanceForm(false)} />
          ) : (
            <div className="max-w-md">
              <ActionCard
                icon={<CheckCircle2 className="w-5 h-5" />}
                iconBg="bg-purple-50"
                iconColor="text-purple-600"
                title="Mark today's attendance"
                subtitle="Quick form · takes under a minute"
                actionLabel="Mark attendance"
                onAction={() => setShowAttendanceForm(true)}
              />
            </div>
          )}
        </section>

        {/* 05 Certificate */}
        <section className="mb-8">
          <SectionHeader index="05" title="Certificate" />
          {showCertificateForm ? (
            <CertificateChecker program={program} onClose={() => setShowCertificateForm(false)} />
          ) : (
            <div className="max-w-md">
              <ActionCard
                icon={<Sparkles className="w-5 h-5" />}
                iconBg="bg-orange-50"
                iconColor="text-orange-600"
                title="Programme certificate"
                subtitle={data.certificatesEnabled ? "Available now" : "Unlocks after Week 4 showcase"}
                statusDot={data.certificatesEnabled ? "bg-emerald-500" : "bg-amber-500"}
                actionLabel="Check status"
                onAction={() => setShowCertificateForm(true)}
              />
            </div>
          )}
        </section>

        {/* 06 Community & Support */}
        <section className="mb-8">
          <SectionHeader index="06" title="Community & Support" />
          <div className="max-w-md">
            <ActionCard
              icon={<Heart className="w-5 h-5" />}
              iconBg="bg-pink-50"
              iconColor="text-pink-600"
              title="Ask a question"
              subtitle="Facilitators & cohort chat"
              actionLabel="Open chat"
              href={data.communityChatLink || undefined}
            />
          </div>
        </section>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> This portal is only visible to learners with the cohort Access PIN.
          </p>
        </div>
      </div>
    </main>
  );
}
