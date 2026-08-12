"use client";

import { ArrowRight, Lock, LogOut } from "lucide-react";
import {
  clearCohortToken,
  CohortDashboard as CohortDashboardData,
} from "@/lib/services/cohort.service";

// NOTE: the self-tick attendance form and name+email-gated certificate
// lookup (AttendanceMarker/CertificateChecker) that used to live here are
// commented out further down, per the org's request to link the Attendance
// and Certificate CTAs straight to an external Google Form/Drive resource
// instead. Re-enabling needs `useState` from "react", `Button` from
// "@/components/ui/Button", `cohortService` from the cohort service, and the
// `User`/`Search`/`Download`/`XCircle` icons from lucide-react back in scope.

function SectionHeader({ title }: { title: string }) {
  return <h2 className="text-xl font-cal-sans text-gray-900 mb-4">{title}</h2>;
}

function ActionCard({
  title,
  subtitle,
  statusDot,
  actionLabel,
  href,
  onAction,
}: {
  title: string;
  subtitle: string;
  statusDot?: string;
  actionLabel: string;
  href?: string;
  onAction?: () => void;
}) {
  const body = (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-cal-sans text-lg text-gray-900 mb-1">{title}</h3>
      <p className="font-dm-sans text-sm text-gray-500 mb-4 flex items-center gap-1.5">
        {statusDot && <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />}
        {subtitle}
      </p>
      <span className="mt-auto font-dm-sans text-sm font-bold text-secondary flex items-center gap-1.5">
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

const WEEK_COUNT = 4;

function weekStatusLabel(week: number, currentWeek: number) {
  if (week < currentWeek) return "Completed";
  if (week === currentWeek) return "Current Week";
  return "Upcoming";
}

// Shows the overall cohort's progress (admin-set currentWeek), not any
// individual learner's — everyone on a program sees the same tracker.
function WeekTracker({ currentWeek }: { currentWeek: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
      <h3 className="font-cal-sans text-lg text-gray-900 mb-1">Your programme journey</h3>
      <p className="font-dm-sans text-sm text-gray-500 mb-8">
        Google Classroom holds the real detail — this just shows roughly where your cohort is.
      </p>
      <div className="flex items-start">
        {Array.from({ length: WEEK_COUNT }, (_, i) => i + 1).map((week, i) => {
          const done = week < currentWeek;
          const current = week === currentWeek;
          return (
            <div key={week} className="flex-1 flex flex-col items-center relative">
              {i > 0 && (
                <div
                  className={`absolute top-6 right-1/2 w-full h-0.5 -z-10 ${
                    week <= currentWeek ? "bg-secondary" : "bg-gray-200"
                  }`}
                />
              )}
              <div
                className={`flex items-center justify-center rounded-full font-dm-sans font-bold border-2 transition-all ${
                  current
                    ? "w-14 h-14 bg-secondary border-secondary text-white text-base shadow-lg shadow-secondary/30 ring-4 ring-secondary/20"
                    : done
                      ? "w-12 h-12 bg-secondary/10 border-secondary text-secondary text-sm"
                      : "w-12 h-12 bg-white border-gray-200 text-gray-400 text-sm"
                }`}
              >
                {week}
              </div>
              <span className="mt-2 font-dm-sans text-xs font-bold text-gray-700">Week {week}</span>
              <span
                className={`font-dm-sans text-xs text-center px-1 ${
                  current ? "text-secondary font-bold" : "text-gray-500"
                }`}
              >
                {weekStatusLabel(week, currentWeek)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Self-tick attendance / certificate lookup — commented out, not deleted ---
// The org asked for the Attendance and Certificate CTAs to link straight out
// to an external Google Form / Drive folder instead (see the plain <ActionCard
// href=...> usage below). Keeping this UI here, unused, so it can be restored
// by uncommenting rather than rebuilt if that decision reverts.
//
// function AttendanceMarker({ program, onClose }: { program: string; onClose: () => void }) {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
//   const [loading, setLoading] = useState(false);
//
//   const handleMark = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return;
//     setLoading(true);
//     setStatus(null);
//     try {
//       const data = await cohortService.markAttendance(program, email.trim());
//       setStatus({ type: "success", msg: `Marked present for ${data.date}.` });
//     } catch (err: any) {
//       setStatus({ type: "error", msg: err?.message || "Failed to mark attendance." });
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-bold text-gray-900">Mark today&apos;s attendance</h3>
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <XCircle className="w-5 h-5" />
//         </button>
//       </div>
//       <form onSubmit={handleMark} className="flex flex-col sm:flex-row gap-3">
//         <input
//           type="email"
//           required
//           placeholder="Your registered email"
//           className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 focus:bg-white"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Button type="submit" variant="primary" className="py-3 px-6 rounded-xl shrink-0" disabled={loading}>
//           {loading ? "Marking…" : "Mark Present"}
//         </Button>
//       </form>
//       {status && (
//         <p className={`mt-3 text-sm font-semibold ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
//           {status.msg}
//         </p>
//       )}
//     </div>
//   );
// }
//
// function CertificateChecker({ program, onClose }: { program: string; onClose: () => void }) {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [certImage, setCertImage] = useState<string | null>(null);
//   const [certPdf, setCertPdf] = useState<string | null>(null);
//   const [notFound, setNotFound] = useState(false);
//
//   const handleCheck = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !fullName) return;
//     setLoading(true);
//     setError("");
//     setNotFound(false);
//     setCertImage(null);
//     setCertPdf(null);
//     try {
//       const data = await cohortService.getCertificateRecord(program, email.trim(), fullName.trim());
//       if (data) {
//         setCertImage(data.certificateImage);
//         setCertPdf(data.certificatePdf);
//       } else {
//         setNotFound(true);
//       }
//     } catch (err: any) {
//       setError(err?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-bold text-gray-900">Check certificate status</h3>
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <XCircle className="w-5 h-5" />
//         </button>
//       </div>
//
//       {!certImage && (
//         <form onSubmit={handleCheck} className="space-y-3">
//           <div className="relative">
//             <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
//             <input
//               type="text"
//               required
//               placeholder="Full name as registered"
//               className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 focus:bg-white"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//           </div>
//           <div className="relative">
//             <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
//             <input
//               type="email"
//               required
//               placeholder="Your registered email"
//               className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 focus:bg-white"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <Button type="submit" variant="primary" className="w-full py-3 rounded-xl" disabled={loading}>
//             {loading ? "Checking…" : "Check Status"}
//           </Button>
//         </form>
//       )}
//
//       {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
//       {notFound && (
//         <p className="mt-3 text-sm font-semibold text-amber-600">
//           No certificate found yet for that name and email — check back after your showcase.
//         </p>
//       )}
//       {certImage && (
//         <div className="mt-2">
//           {/* eslint-disable-next-line @next/next/no-img-element -- data: URL */}
//           <img src={certImage} alt="Your certificate" className="w-full rounded-lg border border-gray-100 mb-4" />
//           <div className="flex gap-3">
//             <a
//               href={certImage}
//               download="certificate.png"
//               className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-xl"
//             >
//               <Download className="w-4 h-4" /> Image
//             </a>
//             {certPdf && (
//               <a
//                 href={certPdf}
//                 download="certificate.pdf"
//                 className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl"
//               >
//                 <Download className="w-4 h-4" /> PDF
//               </a>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default function CohortPortalDashboard({
  program,
  data,
}: {
  program: string;
  data: CohortDashboardData;
}) {
  const handleLock = () => {
    clearCohortToken(program);
    window.location.reload();
  };

  const trackLine = [data.trackCode, data.trackName, data.trackMode].filter(Boolean).join(" - ");

  return (
    <main className="min-h-screen bg-primary pb-20 font-dm-sans">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        {/* Hero */}
        <div className="bg-secondary rounded-3xl p-8 mb-6 text-white relative overflow-hidden">
          <button
            onClick={handleLock}
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/25 rounded-full text-xs font-bold uppercase tracking-wide transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
          <h1 className="text-2xl md:text-3xl font-cal-sans mb-2">
            Welcome to {[data.cohortName, data.cohortNumber].filter(Boolean).join(" ") || "your cohort"}
          </h1>
          {trackLine && <p className="font-dm-sans text-white/80 text-sm md:text-base">{trackLine}</p>}
        </div>

        {/* Journey */}
        <WeekTracker currentWeek={data.currentWeek} />

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
              subtitle="Catch up on the recording"
              actionLabel="Watch recording"
              href={data.missedClassLink || undefined}
            />
          </div>
        </section>

        {/* Assignments */}
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

        {/* Course Materials */}
        <section className="mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              title="Course Materials"
              subtitle="Slides, handouts & guides"
              actionLabel="Open folder"
              href={data.courseMaterialsLink || undefined}
            />
          </div>
        </section>

        {/* Attendance — links straight to the org's Google Form; see the
            commented-out AttendanceMarker above for the self-tick version. */}
        <section className="mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              title="Mark Today's Attendance"
              subtitle="Takes under a minute"
              actionLabel="Open form"
              href={data.attendanceFormLink || undefined}
            />
          </div>
        </section>

        {/* Certificate — links straight to the org's Google Drive folder; see
            the commented-out CertificateChecker above for the gated version. */}
        <section className="mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              title="Certificate"
              subtitle={data.certificatesEnabled ? "Available now" : "Not yet available"}
              actionLabel="Open folder"
              href={data.certificateFolderLink || undefined}
            />
          </div>
        </section>

        {/* Community & Support */}
        <section className="mb-8">
          <SectionHeader title="Community & Support" />
          <div className="grid sm:grid-cols-2 gap-4">
            <ActionCard
              title="Ask A Question"
              subtitle="Facilitators & cohort chat"
              actionLabel="Open chat"
              href={data.communityChatLink || undefined}
            />
          </div>
        </section>

        <div className="text-center pt-4">
          <p className="font-dm-sans text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> This portal is only visible to learners with the cohort Access PIN.
          </p>
        </div>
      </div>
    </main>
  );
}
