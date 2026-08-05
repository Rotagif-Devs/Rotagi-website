"use client";

import { useState, useEffect } from "react";
import CohortDashboard from "@/components/cohort/CohortDashboard";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import AdminLeftPanel from "@/components/AdminLeftPanel";
import { cohortService, getCohortToken } from "@/lib/services/cohort.service";

export default function CohortPortalPage() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Restore access if a valid cohort token is still present in this tab.
    if (getCohortToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await cohortService.validateAccessPin(pin.trim());
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(
        err?.message?.replace(/^Unauthorized:.*?-\s*/, "") ||
          "Invalid Access PIN. Please check your PIN and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <CohortDashboard />;
  }

  return (
    <div className="min-h-screen w-full lg:flex-row flex flex-col overflow-hidden bg-white">
      <AdminLeftPanel />
      
      <div className="flex-1 flex items-center justify-center p-5 lg:p-12 h-screen overflow-y-auto bg-primary">
        <div className="w-full max-w-[554px]">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-pink-100 italic">
              Learner Access
            </div>
            <h3 className="text-3xl text-gray-900 leading-tight">Cohort Login</h3>
            <p className="text-gray-500 mt-2 font-medium">
              Enter the Access PIN to view cohort materials and track progress.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 px-5 py-4 rounded-xl flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleAccess} className="space-y-6">
            <div>
              <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">
                Access PIN <span className="text-pink-500">*</span>
              </label>
              <input
                type="password"
                id="pin"
                name="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                required
                className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm transition-all text-gray-900 tracking-widest text-lg font-bold placeholder:font-normal placeholder:tracking-normal"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !pin}
              className="w-full py-4.5 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:opacity-95 hover:shadow-pink-200/50 active:scale-[0.98] shadow-xl shadow-pink-100 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin" size={22} />
                  <span>Verifying PIN...</span>
                </div>
              ) : (
                "Access Portal"
              )}
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Secure Portal &bull; Registered Cohort Members Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
