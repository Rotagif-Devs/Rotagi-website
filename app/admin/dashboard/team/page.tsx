"use client";

import React, { useEffect, useState } from "react";
import { UserPlus, Trash2, ShieldCheck, ShieldOff, Eye, EyeOff } from "lucide-react";
import { adminService, StaffUser, StaffRole } from "@/lib/services/admin.service";
import Button from "@/components/ui/Button";

const ROLE_LABEL: Record<string, string> = {
  content_manager: "Content Manager",
  cohort_manager: "Cohort Manager",
};

const ROLE_DESCRIPTION: Record<StaffRole, string> = {
  content_manager: "Can post and manage their own blog posts and events only.",
  cohort_manager: "Can manage the cohort portal only.",
};

export default function TeamPage() {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<StaffRole>("content_manager");
  const [showPassword, setShowPassword] = useState(false);

  const loadStaff = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getStaff();
      setStaff(data);
    } catch (err) {
      console.error("Failed to load staff:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setRole("content_manager");
    setShowPassword(false);
    setFormError("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsCreating(true);
    try {
      await adminService.createStaff({ email, password, firstName, lastName, role });
      resetForm();
      await loadStaff();
    } catch (err: any) {
      setFormError(err?.message || "Failed to create staff account");
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleStatus = async (user: StaffUser) => {
    const nextStatus = user.status === "active" ? "disabled" : "active";
    await adminService.updateStaff(user._id, { status: nextStatus });
    loadStaff();
  };

  const handleDelete = async (user: StaffUser) => {
    if (!confirm(`Remove ${user.firstName} ${user.lastName}'s staff account? This can't be undone.`)) return;
    await adminService.deleteStaff(user._id);
    loadStaff();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-black font-outfit tracking-tight">Team</h1>
        <p className="text-gray-500 mt-2 font-medium">
          Give staff a restricted admin account — Content Manager (blog + events only) or Cohort Manager (cohort
          portal only).
        </p>
      </div>

      {/* Create form */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Add a Staff Account</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 pr-11 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as StaffRole)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none"
            >
              <option value="content_manager">Content Manager</option>
              <option value="cohort_manager">Cohort Manager</option>
            </select>
            <p className="text-xs text-gray-400">{ROLE_DESCRIPTION[role]}</p>
          </div>

          {formError && <p className="md:col-span-2 text-sm text-red-600 font-medium">{formError}</p>}

          <div className="md:col-span-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isCreating}
              className="bg-secondary text-white hover:bg-secondary/90 px-8 font-bold shadow-lg shadow-secondary/20"
            >
              <UserPlus size={18} className="mr-2" />
              {isCreating ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>

      {/* Staff list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Staff Accounts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">
                    No staff accounts yet.
                  </td>
                </tr>
              ) : (
                staff.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-700">
                      {s.firstName} {s.lastName}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">{s.email}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {ROLE_LABEL[s.roles.find((r) => r in ROLE_LABEL) || ""] || s.roles.join(", ")}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          s.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        }`}
                      >
                        {s.status === "active" ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(s)}
                          title={s.status === "active" ? "Disable account" : "Re-activate account"}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          {s.status === "active" ? <ShieldOff size={18} /> : <ShieldCheck size={18} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s)}
                          title="Delete account"
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
