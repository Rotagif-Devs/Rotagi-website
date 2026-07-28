"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function AdminCohortPage() {
  const [pin, setPin] = useState("1234");
  const [driveLink, setDriveLink] = useState("");
  const [attendanceLink, setAttendanceLink] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-cal-sans text-gray-900">Cohort Portal Settings</h1>
        <p className="text-gray-500">Manage access PIN and repository links for the cohort portal.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access PIN</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
            placeholder="e.g. 123456"
          />
          <p className="text-xs text-gray-400 mt-1">This PIN will be required by candidates to access the portal.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Google Drive Repository URL</label>
          <input
            type="url"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attendance & Progress Tracker URL</label>
          <input
            type="url"
            value={attendanceLink}
            onChange={(e) => setAttendanceLink(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
            placeholder="https://docs.google.com/spreadsheets/..."
          />
        </div>

        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
