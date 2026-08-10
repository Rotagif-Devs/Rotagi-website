"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cohortService, CohortAssignment, AssignmentStatusType } from "@/lib/services/cohort.service";

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

const STATUS_OPTIONS: { value: AssignmentStatusType; label: string }[] = [
  { value: "pending", label: "Pending / Due" },
  { value: "submitted", label: "Submitted" },
  { value: "feedback", label: "Feedback ready" },
];

export default function CohortAssignmentsManager({ program }: { program: string }) {
  const [assignments, setAssignments] = useState<CohortAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [creating, setCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [statusLabel, setStatusLabel] = useState("");
  const [statusType, setStatusType] = useState<AssignmentStatusType>("pending");
  const [actionLabel, setActionLabel] = useState("View & submit");
  const [actionUrl, setActionUrl] = useState("");

  const load = () => {
    setLoading(true);
    cohortService
      .getAssignments(program)
      .then(setAssignments)
      .catch(() => setStatus({ type: "error", msg: "Could not load assignments." }))
      .finally(() => setLoading(false));
  };

  useEffect(load, [program]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setStatus(null);
    try {
      const created = await cohortService.createAssignment(program, {
        title: title.trim(),
        statusLabel: statusLabel.trim(),
        statusType,
        actionLabel: actionLabel.trim(),
        actionUrl: actionUrl.trim(),
      });
      setAssignments((prev) => [...prev, created]);
      setTitle("");
      setStatusLabel("");
      setActionLabel("View & submit");
      setActionUrl("");
      setStatusType("pending");
      setStatus({ type: "success", msg: "Assignment added." });
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to add assignment." });
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this assignment from the portal?")) return;
    try {
      await cohortService.deleteAssignment(program, id);
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to remove assignment." });
    }
  };

  return (
    <div className="max-w-3xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Assignments</h3>
      <p className="text-gray-500 mb-8">
        Shown on the learner dashboard as a card — the action link points to wherever the actual work happens (a
        Google Form, Classroom post, etc.), this isn&apos;t a submission system itself.
      </p>

      {status && <Banner type={status.type}>{status.msg}</Banner>}

      <form onSubmit={handleCreate} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. My first AI prompt"
            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary bg-white"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status label</label>
            <input
              type="text"
              required
              value={statusLabel}
              onChange={(e) => setStatusLabel(e.target.value)}
              placeholder="e.g. Due Friday"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status type</label>
            <select
              value={statusType}
              onChange={(e) => setStatusType(e.target.value as AssignmentStatusType)}
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary bg-white"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action label</label>
            <input
              type="text"
              required
              value={actionLabel}
              onChange={(e) => setActionLabel(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action link</label>
            <input
              type="url"
              required
              value={actionUrl}
              onChange={(e) => setActionUrl(e.target.value)}
              placeholder="https://forms.google.com/..."
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary bg-white"
            />
          </div>
        </div>
        <Button type="submit" variant="primary" disabled={creating}>
          {creating ? "Adding…" : "Add Assignment"}
        </Button>
      </form>

      {loading ? (
        <div className="flex items-center gap-3 text-gray-400 py-6">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading assignments…
        </div>
      ) : assignments.length === 0 ? (
        <p className="text-gray-500 text-sm">No assignments yet.</p>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-4 p-4 bg-white border border-gray-100 rounded-xl"
            >
              <div>
                <p className="font-bold text-gray-900">{a.title}</p>
                <p className="text-sm text-gray-500">
                  {a.statusLabel} · {a.actionLabel}
                </p>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-gray-400 hover:text-red-600 transition-colors shrink-0"
                aria-label="Remove assignment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
