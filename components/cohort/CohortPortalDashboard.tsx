"use client";

import { useState, Fragment } from "react";
import { LogOut, User, Search, Download, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  cohortService,
  clearCohortToken,
  CohortDashboard as CohortDashboardData,
} from "@/lib/services/cohort.service";

function ActionCard({
  title,
  subtitle,
  statusDot,
  actionLabel,
  href,
  onAction,
}: {
  title: string;
  subtitle?: string;
  statusDot?: string;
  actionLabel: string;
  href?: string;
  onAction?: () => void;
}) {
  const body = (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-cal-sans text-lg text-gray-900 mb-1">{title}</h3>
      {subtitle && (
        <p className="font-dm-sans text-sm text-gray-500 mb-4 flex items-center gap-1.5">
          {statusDot && <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />}
          {subtitle}
        </p>
      )}
      <span className="mt-auto font-dm-sans text-sm font-bold text-secondary">{actionLabel}</span>
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

function weekStatusLabel(week: number, currentWeek: number) {
  if (week < currentWeek) return "Completed";
  if (week === currentWeek) return "Current Week";
  return "Upcoming";
}

// A solid bridge linking one week circle to the next — a flex-growing
// sibling that fills the entire gap and touches both circles' edges (the
// circles themselves don't grow, so this is the only thing stretching).
// Pink and animated while the cohort has reached/passed that week, black
// and still for weeks ahead.
function BridgeConnector({ active }: { active: boolean }) {
  return (
    <div className="flex items-center flex-1 mt-6">
      <div className={`h-2 w-full rounded-full ${active ? "bg-secondary animate-pulse" : "bg-black"}`} />
    </div>
  );
}

// Shows the overall cohort's progress (admin-set currentWeek out of
// admin-set totalWeeks — programs run different lengths), not any individual
// learner's — everyone on a program sees the same tracker.
function WeekTracker({ currentWeek, totalWeeks }: { currentWeek: number; totalWeeks: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
      <h3 className="font-cal-sans text-lg text-gray-900 mb-8">Your ROTAGI Program Journey Start Here</h3>
      <div className="flex items-start">
        {Array.from({ length: totalWeeks || 4 }, (_, i) => i + 1).map((week, i) => {
          const done = week < currentWeek;
          const current = week === currentWeek;
          return (
            <Fragment key={week}>
              {i > 0 && <BridgeConnector active={week <= currentWeek} />}
              <div className={`shrink-0 flex flex-col items-center ${current ? "w-14" : "w-12"}`}>
                <div
                  className={`flex items-center justify-center rounded-full font-dm-sans font-bold border-2 transition-all ${
                    current
                      ? "w-14 h-14 bg-secondary border-secondary text-white text-base shadow-lg shadow-secondary/30 ring-4 ring-secondary/20"
                      : done
                        ? "w-12 h-12 bg-secondary/10 border-secondary text-secondary text-sm"
                        : "w-12 h-12 bg-white border-black text-black text-sm"
                  }`}
                >
                  {week}
                </div>
                <span className="mt-2 font-dm-sans text-xs font-bold text-black whitespace-nowrap">Week {week}</span>
                <span
                  className={`font-dm-sans text-xs text-center whitespace-nowrap ${
                    current ? "text-secondary font-bold" : "text-black"
                  }`}
                >
                  {weekStatusLabel(week, currentWeek)}
                </span>
              </div>
            </Fragment>
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
        <h3 className="font-cal-sans text-lg text-gray-900">Mark today&apos;s attendance</h3>
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
        <h3 className="font-cal-sans text-lg text-gray-900">Check certificate status</h3>
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

  const handleLock = () => {
    clearCohortToken(program);
    window.location.reload();
  };

  const trackLine = [data.trackCode, data.trackName, data.trackMode].filter(Boolean).join(" - ");

  return (
    <main className="min-h-screen bg-primary pb-20 font-dm-sans">
      <div className="max-w-5xl mx-auto px-6 pt-10 relative">
        {/* Hero */}
        <div className="bg-secondary rounded-3xl p-8 mb-6 text-white overflow-hidden">
          <div className="flex flex-col sm:flex-row-reverse sm:items-start sm:justify-between gap-4">
            <button
              onClick={handleLock}
              className="self-end sm:self-start shrink-0 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/25 rounded-full text-xs font-bold uppercase tracking-wide transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-cal-sans mb-2">
                Welcome to {[data.cohortName, data.cohortNumber].filter(Boolean).join(" ") || "your cohort"}
              </h1>
              {trackLine && <p className="font-dm-sans text-white/80 text-sm md:text-base">{trackLine}</p>}
            </div>
          </div>
        </div>

        {/* Journey */}
        <WeekTracker currentWeek={data.currentWeek} totalWeeks={data.totalWeeks} />

        {/* Classes */}
        <section className="mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              title="Join Live Class"
              subtitle={data.liveClassSchedule || "Schedule TBA"}
              actionLabel="Join class"
              href={data.liveClassLink || undefined}
            />
            <ActionCard
              title="Watch Missed Class"
              actionLabel="Watch recording"
              href={data.missedClassLink || undefined}
            />
          </div>
        </section>

        {/* Individual assignments, if the admin has added any via the (currently
            hidden) multi-assignment tab — the single Assignments card below
            covers the common case of just linking out to Google Classroom. */}
        {data.assignments.length > 0 && (
          <section className="mb-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {data.assignments.map((a) => (
                <ActionCard
                  key={a.id}
                  title={a.title}
                  subtitle={a.statusLabel}
                  actionLabel={a.actionLabel}
                  href={a.actionUrl}
                />
              ))}
            </div>
          </section>
        )}

        {/* Course Materials + Assignments */}
        <section className="mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              title="Course Materials"
              actionLabel="Open folder"
              href={data.courseMaterialsLink || undefined}
            />
            <ActionCard
              title="Google Classroom"
              actionLabel="Open classroom"
              href={data.assignmentsClassroomLink || undefined}
            />
          </div>
        </section>

        {/* Attendance — self-tick, gated by the admin-controlled daily window. */}
        <section className="mb-8">
          {showAttendanceForm ? (
            <AttendanceMarker program={program} onClose={() => setShowAttendanceForm(false)} />
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <ActionCard
                  title="Mark Today's Attendance"
                  actionLabel="Mark attendance"
                  onAction={() => setShowAttendanceForm(true)}
                />
              </div>
            </div>
          )}
        </section>

        {/* Certificate — name+email lookup against the admin's eligibility list. */}
        <section className="mb-8">
          {showCertificateForm ? (
            <CertificateChecker program={program} onClose={() => setShowCertificateForm(false)} />
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <ActionCard
                  title="Certificate"
                  subtitle={data.certificatesEnabled ? "Available now" : undefined}
                  actionLabel="Check status"
                  onAction={() => setShowCertificateForm(true)}
                />
              </div>
            </div>
          )}
        </section>

        {/* Community & Support */}
        <section className="mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <ActionCard
                title="Community & Support"
                actionLabel="Open chat"
                href={data.communityChatLink || undefined}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
