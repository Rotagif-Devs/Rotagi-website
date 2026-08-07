"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { cohortService } from "@/lib/services/cohort.service";

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

/**
 * Daily self-tick attendance: open a window at class start, learners mark
 * themselves present on the portal, close it at class end. While open, the
 * ticked count here polls every few seconds so the admin can watch it fill in.
 */
export default function AttendanceWindowControl() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [tickedCount, setTickedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = async () => {
    try {
      const data = await cohortService.getAttendanceWindowStatus();
      setOpen(data.open);
      setDate(data.date);
      setTickedCount(data.tickedCount);
    } catch {
      // Leave whatever we last had — a transient poll failure isn't worth surfacing.
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (open) {
      pollRef.current = setInterval(refresh, 5000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [open]);

  const handleToggle = async () => {
    setToggling(true);
    setStatus(null);
    try {
      const next = !open;
      await cohortService.toggleAttendanceWindow(next);
      await refresh();
      setStatus({
        type: "success",
        msg: next ? "Attendance window opened for today." : "Attendance window closed.",
      });
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to update the attendance window." });
    } finally {
      setToggling(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    setStatus(null);
    try {
      await cohortService.exportAttendance();
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to export attendance." });
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-gray-400 py-6">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading attendance window…
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Daily Attendance Window</h3>
      <p className="text-gray-500 mb-6">
        Open this at the start of class so learners can mark themselves present from the portal, then close it when
        class ends. Reopening tomorrow starts a fresh day automatically.
      </p>

      {status && <Banner type={status.type}>{status.msg}</Banner>}

      <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="font-bold text-gray-900">
            {open ? `Open for ${date}` : "Closed"}
          </p>
          <p className="text-sm text-gray-500">
            {open ? `${tickedCount} learner${tickedCount === 1 ? "" : "s"} marked present so far` : "Learners can't mark attendance right now."}
          </p>
        </div>
        <Button
          type="button"
          variant={open ? undefined : "primary"}
          className={open ? "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50" : undefined}
          onClick={handleToggle}
          disabled={toggling}
        >
          {toggling ? "Updating…" : open ? "Close Attendance Window" : "Open Attendance Window"}
        </Button>
      </div>

      <button
        type="button"
        onClick={handleExport}
        disabled={exporting}
        className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {exporting ? "Preparing file…" : "Export Attendance to Excel"}
      </button>
    </div>
  );
}
