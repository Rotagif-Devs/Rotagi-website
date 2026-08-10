"use client";

import { useState } from "react";
import { Lock, Sprout } from "lucide-react";
import Button from "@/components/ui/Button";
import { cohortService } from "@/lib/services/cohort.service";

export default function CohortPinGate({
  program,
  onUnlocked,
}: {
  program: string;
  onUnlocked: () => void;
}) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;
    setLoading(true);
    setError("");
    try {
      await cohortService.validateAccessPin(program, pin.trim());
      onUnlocked();
    } catch (err: any) {
      setError(err?.message || "Invalid Access PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary px-6 py-16">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Sprout className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-cal-sans text-gray-900 mb-2">Welcome to your cohort</h1>
        <p className="text-gray-500 mb-8">Enter your Access PIN to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Access PIN</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                inputMode="numeric"
                placeholder="Enter your PIN"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <Button type="submit" variant="primary" className="w-full py-3 rounded-xl" disabled={loading}>
            {loading ? "Checking…" : "Enter Portal"}
          </Button>
        </form>
      </div>
    </main>
  );
}
