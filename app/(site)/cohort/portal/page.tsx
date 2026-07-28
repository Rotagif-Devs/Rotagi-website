"use client";

import { useState, useEffect } from "react";
import CohortDashboard from "@/components/cohort/CohortDashboard";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

export default function CohortPortalPage() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user previously authenticated in this session
    const auth = sessionStorage.getItem("cohort_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call for PIN validation
    setTimeout(() => {
      if (pin === "1234") {
        setIsAuthenticated(true);
        sessionStorage.setItem("cohort_auth", "true");
      } else {
        setError("Invalid Access PIN. Please check your PIN and try again.");
      }
      setLoading(false);
    }, 1000);
  };

  if (isAuthenticated) {
    return <CohortDashboard />;
  }

  return (
    <main className="min-h-screen bg-white font-dm-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-pink-950/5 -skew-y-6 transform origin-top-left -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-pink-950/5 border border-gray-100 p-8 md:p-12 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-cal-sans text-gray-900 mb-3">Cohort Access</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Enter the Access PIN provided by your administrator to view cohort materials and track progress.
          </p>
        </div>

        <form onSubmit={handleAccess} className="space-y-6">
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
              Access PIN
            </label>
            <input
              type="password"
              id="pin"
              name="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-lg text-center tracking-widest font-semibold placeholder:font-normal placeholder:tracking-normal"
              placeholder="Enter PIN"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full bg-secondary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-4 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Unlock Access
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>This is a secure portal for registered cohort candidates and facilitators only.</p>
        </div>
      </div>
    </main>
  );
}
