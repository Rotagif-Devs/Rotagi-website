
"use client";

import React, { useMemo, useState } from "react";

type Props = {
  onSave?: (password: string) => Promise<void> | void;
};

function EyeIcon({ open }: { open: boolean }) {
  return open ? (

    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 15.25A3.25 3.25 0 1 0 12 8.75a3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ) : (
    
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M10.6 5.2A9.7 9.7 0 0 1 12 5c6 0 9.5 7 9.5 7a18 18 0 0 1-3.1 4.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.2 6.2C3.6 8.2 2.5 12 2.5 12S6 19 12 19c1.6 0 3-.2 4.2-.7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.3 9.3A3.25 3.25 0 0 0 14.7 14.7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function CreateNewPasswordForm({ onSave }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const mismatch = useMemo(
    () => confirm.length > 0 && password !== confirm,
    [password, confirm]
  );

  const canSubmit = useMemo(
    () => password.length >= 6 && confirm.length >= 6 && !mismatch && !loading,
    [password, confirm, mismatch, loading]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      await onSave?.(password);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="mx-auto flex min-h-screen max-w-md items-start justify-center px-6 pt-24">
        <div className="w-full">
          <h4 className="text-dark">Create New Password</h4>

          <p className="mt-1  leading-5 text-text-hdd">
            Choose a strong password you haven&apos;t used before to keep your
            account secure.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block font-semibold text-dark">
                Password
              </label>

              <div className="mt-2 flex h-10 items-center rounded-md border border-accent0 bg-white px-3 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className="h-full w-full bg-transparent  text-dark outline-none placeholder:text-text-hdd/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="ml-2 text-text-hdd hover:text-dark"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-dark">
                Confirm Password
              </label>

              <div className="mt-2 flex h-10 items-center rounded-md border border-accent0 bg-white px-3 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  className="h-full w-full bg-transparent  text-dark outline-none placeholder:text-text-hdd/70"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="ml-2 text-text-hdd hover:text-dark"
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>

              {mismatch && (
                <p className="mt-2 text-xs text-orange">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-2 h-11 w-full rounded-full bg-secondary font-semibold text-white transition hover:bg-quaternary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}