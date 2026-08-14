"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import { cohortService } from "@/lib/services/cohort.service";

function Wordmark({ light }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.png" alt="ROTAGI" width={28} height={28} className="object-contain" />
      <span className={`font-cal-sans font-bold tracking-wide ${light ? "text-white" : "text-gray-900"}`}>
        ROTAGI
      </span>
    </div>
  );
}

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
    <main className="min-h-screen w-full flex flex-col md:grid md:grid-cols-2">
      {/* Image side — white background, top banner on mobile, left column from md up */}
      <div className="relative flex flex-col bg-white py-8 md:py-10 px-6 md:px-10 min-h-[42vh] md:min-h-0">
        <Wordmark />
        <div className="flex-1 flex items-center justify-center py-6">
          <Image
            src="/cohort-portal-hero.png"
            alt="ROTAGI She Tech Skills"
            width={640}
            height={640}
            className="object-contain w-full max-w-[280px] sm:max-w-sm md:max-w-md"
            priority
          />
        </div>
      </div>

      {/* PIN form side — the brand's primary pink */}
      <div className="flex-1 flex flex-col bg-secondary px-6 sm:px-12 lg:px-20 py-8 md:py-16 text-center md:text-left">
        <Wordmark light />
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto md:mx-0 py-6">
            <h1 className="text-4xl sm:text-5xl font-cal-sans font-bold leading-[1.1] text-white mb-4">
              Welcome to your cohort
            </h1>
            <p className="font-dm-sans text-white/80 mb-8">Enter your Access PIN to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Access PIN</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPin ? "text" : "password"}
                    required
                    inputMode="numeric"
                    placeholder="Enter your PIN"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white"
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

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 rounded-xl border-2 border-white"
                disabled={loading}
              >
                {loading ? "Checking…" : "Enter Portal"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
