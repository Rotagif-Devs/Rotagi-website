"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Eye, EyeOff } from "lucide-react";
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
  const [showPin, setShowPin] = useState(false);
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
    <main className="min-h-screen w-full grid md:grid-cols-2">
      {/* Image side — a top banner on mobile, the left column from md up */}
      <div className="relative flex items-center justify-center bg-gradient-to-br from-secondary/10 via-white to-secondary/5 p-6 h-48 sm:h-64 md:h-auto md:p-10 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <Image
          src="/cohort-portal-hero.png"
          alt="ROTAGI She Tech Skills"
          width={520}
          height={520}
          className="relative object-contain w-full max-w-[220px] sm:max-w-xs md:max-w-md mix-blend-multiply"
          priority
        />
      </div>

      {/* PIN form side */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-10 md:py-16 text-center md:text-left">
        <div className="w-full max-w-md mx-auto md:mx-0">
          <h1 className="text-2xl font-cal-sans text-gray-900 mb-2">Welcome to your cohort</h1>
          <p className="font-dm-sans text-gray-500 mb-8">Enter your Access PIN to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access PIN</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPin ? "text" : "password"}
                  required
                  inputMode="numeric"
                  placeholder="Enter your PIN"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPin((v) => !v)}
                  aria-label={showPin ? "Hide PIN" : "Show PIN"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <Button type="submit" variant="primary" className="w-full py-3 rounded-xl" disabled={loading}>
              {loading ? "Checking…" : "Enter Portal"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
