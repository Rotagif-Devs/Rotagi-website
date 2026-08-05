"use client";

import { useState } from "react";
import { Calendar, Search, CheckCircle2, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { cohortService, AttendanceSummary } from "@/lib/services/cohort.service";

/**
 * Email-based attendance lookup backed by the admin-uploaded spreadsheet
 * (GET /api/cohort/attendance/record). There is no endpoint for learners to
 * mark their own attendance — only the admin's offline upload updates records.
 */
export default function AttendanceLookup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AttendanceSummary | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searchedEmail, setSearchedEmail] = useState("");

  const reset = () => {
    setResult(null);
    setNotFound(false);
    setError("");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    reset();
    setLoading(true);
    setSearchedEmail(email);

    try {
      const data = await cohortService.getAttendanceRecord(email.trim());
      if (data) {
        setResult(data);
      } else {
        setNotFound(true);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasSearched = result !== null || notFound || !!error;

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
          <Button type="submit" variant="primary" className="py-4 px-8 rounded-xl shrink-0" disabled={loading}>
            {loading ? "Checking…" : "Check Record"}
          </Button>
        </form>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto animate-in zoom-in-95">
          <h3 className="text-xl font-bold text-red-800 mb-2">Something went wrong</h3>
          <p className="text-red-700 mb-6">{error}</p>
          <button onClick={reset} className="text-sm font-bold text-red-800 hover:underline">
            Try again
          </button>
        </div>
      ) : notFound ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center max-w-lg mx-auto animate-in zoom-in-95">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Records Not Available</h3>
          <p className="text-yellow-700 mb-6">
            The attendance records for <strong className="font-semibold">{searchedEmail}</strong> have not been uploaded by the administrator yet. Please check back later.
          </p>
          <button
            onClick={reset}
            className="text-sm font-bold text-yellow-800 hover:underline"
          >
            Check another email
          </button>
        </div>
      ) : result ? (
        <div className="animate-in zoom-in-95">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-cal-sans text-green-700">{result.totalPresent}</div>
              <div className="text-sm font-medium text-green-600 mt-1">Present</div>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-cal-sans text-red-700">{result.totalAbsent}</div>
              <div className="text-sm font-medium text-red-600 mt-1">Absent</div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mb-4">
            Showing records for <strong className="font-semibold text-gray-700">{result.email}</strong>
          </p>

          {/* Records */}
          <div className="space-y-2 max-w-lg mx-auto">
            {result.records.map((r, i) => (
              <div
                key={`${r.date}-${i}`}
                className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-5 py-3"
              >
                <span className="font-medium text-gray-700">{r.date}</span>
                {r.status === "present" ? (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Present
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-500 text-sm font-semibold">
                    <XCircle className="w-4 h-4" /> Absent
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button onClick={reset} className="text-sm font-bold text-primary hover:underline">
              Check another email
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
