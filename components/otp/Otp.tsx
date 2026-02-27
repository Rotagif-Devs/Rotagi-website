"use client";
import React, { useMemo, useRef, useState } from "react";

type ConfirmOtpProps = {
  length?: number; // e.g. 4 or 6
  onVerify?: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
};

export default function ConfirmOtpCode({
  length = 4,
  onVerify,
  onResend,
}: ConfirmOtpProps) {
  const [digits, setDigits] = useState<string[]>(Array.from({ length }, () => ""));
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const otp = useMemo(() => digits.join(""), [digits]);
  const isComplete = useMemo(() => digits.every((d) => d.length === 1), [digits]);

  const focusIndex = (i: number) => inputsRef.current[i]?.focus();

  const setDigit = (index: number, value: string) => {
    const v = value.replace(/\D/g, ""); 
    const next = [...digits];

 
    if (v.length > 1) {
      const chunk = v.slice(0, length - index).split("");
      chunk.forEach((c, offset) => {
        next[index + offset] = c;
      });
      setDigits(next);
      const nextFocus = Math.min(index + chunk.length, length - 1);
      focusIndex(nextFocus);
      return;
    }

    next[index] = v.slice(-1) ?? "";
    setDigits(next);

    if (v) {
      if (index < length - 1) focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
     
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
   
        focusIndex(index - 1);
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) focusIndex(index - 1);
    if (e.key === "ArrowRight" && index < length - 1) focusIndex(index + 1);
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    setDigit(index, pasted);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    try {
      setVerifying(true);
      await onVerify?.(otp);
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      await onResend?.();
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="mx-auto flex min-h-screen max-w-3xl items-start justify-center px-6 pt-28">
        <div className="w-full max-w-md">
          <div className=" bg-primary/40 p-6">
            <h4 className="text-dark">Confirm OTP Code</h4>

            <p className="mt-1  leading-5 text-text-hdd">
              Kindly type in the one-time password that was sent to you.
            </p>

            <form onSubmit={handleVerify} className="mt-4">
              <div className="flex gap-3">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={length}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={(e) => handlePaste(i, e)}
                    className="
                      h-10 w-22 text-center font-semibold text-dark
                      bg-white outline-none
                      border border-accent0
                      focus:border-secondary focus:ring-2 focus:ring-secondary/20
                    "
                  />
                ))}
              </div>

              <div className="mt-3 text-text-hdd">
                Didn&apos;t get a code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="font-semibold text-secondary hover:underline disabled:opacity-60"
                >
                  {resending ? "Resending..." : "Resend"}
                </button>
              </div>

              <button
                type="submit"
                disabled={!isComplete || verifying}
                className="
                  mt-5 h-11 w-full rounded-full bg-secondary
                  font-semibold text-white
                  transition hover:bg-quaternary
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                {verifying ? "Verifying..." : "verify"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}