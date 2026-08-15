"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2, Download, Trash2 } from "lucide-react";
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

export default function CohortAttendanceWindowControl({ program }: { program: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [tickedCount, setTickedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = async () => {
    try {
      const data = await cohortService.getAttendanceWindowStatus(program);
      setOpen(data.open);
      setDate(data.date);
      setTickedCount(data.tickedCount);
    } catch {
      // transient poll failure isn't worth surfacing
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);

  useEffect(() => {
    if (open) {
      pollRef.current = setInterval(refresh, 5000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleToggle = async () => {
    setToggling(true);
    setStatus(null);
    try {
      const next = !open;
      await cohortService.toggleAttendanceWindow(program, next);
      await refresh();
      setStatus({ type: "success", msg: next ? "Attendance window opened for today." : "Attendance window closed." });
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
      await cohortService.exportAttendance(program);
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to export attendance." });
    } finally {
      setExporting(false);
    }
  };

  const handleClear = async () => {
    if (
      !confirm(
        "Permanently delete ALL attendance records for this program? This can't be undone — export a copy first if you want to keep it.",
      )
    ) {
      return;
    }
    setClearing(true);
    setStatus(null);
    try {
      const msg = await cohortService.clearAttendance(program);
      setStatus({ type: "success", msg });
      await refresh();
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to clear attendance." });
    } finally {
      setClearing(false);
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
          <p className="font-bold text-gray-900">{open ? `Open for ${date}` : "Closed"}</p>
          <p className="text-sm text-gray-500">
            {open
              ? `${tickedCount} learner${tickedCount === 1 ? "" : "s"} marked present so far`
              : "Learners can't mark attendance right now."}
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

      <div className="flex items-center gap-6 flex-wrap">
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {exporting ? "Preparing file…" : "Export Attendance to Excel"}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={clearing}
          className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:underline disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {clearing ? "Clearing…" : "Clear All Attendance Data"}
        </button>
      </div>
    </div>
  );
}
