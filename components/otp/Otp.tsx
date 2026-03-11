"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyResetCode, forgotPassword } from "@/lib/services/auth.service";
import SuccessModal from "../SuccessModal";

type ConfirmOtpProps = {
  length?: number; // e.g. 4 or 6
  email?: string; // Needed for API calls
  onVerify?: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
};

export default function ConfirmOtpCode({
  length = 5,
  email: propEmail,
  onVerify,
  onResend,
}: ConfirmOtpProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  
  // Use prop email if provided, otherwise fall back to URL email
  const email = propEmail || emailFromUrl;
  
  const [digits, setDigits] = useState<string[]>(Array.from({ length }, () => ""));
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean; 
    message: string; 
    title: string; 
    action: "VERIFY" | "RESEND" | null
  }>({ 
    isOpen: false, 
    message: "", 
    title: "", 
    action: null 
  });

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const otp = useMemo(() => digits.join(""), [digits]);
  const isComplete = useMemo(() => digits.every((d) => d.length === 1), [digits]);

  // Auto-focus first input on mount
  useEffect(() => {
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
  }, []);

  const focusIndex = (i: number) => {
    if (i >= 0 && i < length) {
      inputsRef.current[i]?.focus();
    }
  };

  const setDigit = (index: number, value: string) => {
    const v = value.replace(/\D/g, ""); 
    const next = [...digits];

    // Handle paste of multiple digits
    if (v.length > 1) {
      const chunk = v.slice(0, length - index).split("");
      chunk.forEach((c, offset) => {
        if (index + offset < length) {
          next[index + offset] = c;
        }
      });
      setDigits(next);
      
      // Focus next empty input or last input
      const nextEmptyIndex = next.findIndex((d, i) => i > index && !d);
      if (nextEmptyIndex !== -1) {
        focusIndex(nextEmptyIndex);
      } else {
        focusIndex(Math.min(index + chunk.length, length - 1));
      }
      return;
    }

    // Handle single digit
    if (v) {
      next[index] = v.slice(-1);
      setDigits(next);
      if (index < length - 1) focusIndex(index + 1);
    } else {
      next[index] = "";
      setDigits(next);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
        focusIndex(index - 1);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusIndex(index - 1);
    }
    
    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    setDigit(index, pasted);
  };

  const { mutate: handleVerifyOtp, isPending: verifying } = useMutation({
    mutationFn: verifyResetCode,
    onSuccess: (data) => {
      const token = (data as any)?.token;
      if (typeof token === "string" && token.length > 0) {
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("resetToken", token);
      }

      setModalConfig({
        isOpen: true,
        message: data?.message || "OTP verified successfully.",
        title: "Verified!",
        action: "VERIFY"
      });
    },
    onError: (err) => {
      alert(err instanceof Error ? err.message : "Verification failed.");
    },
  });

  const { mutate: handleResendOtp, isPending: resending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setModalConfig({
        isOpen: true,
        message: data?.message || "OTP resent successfully.",
        title: "OTP Sent!",
        action: "RESEND"
      });
      // Clear OTP inputs for new code
      setDigits(Array.from({ length }, () => ""));
      setTimeout(() => focusIndex(0), 100);
    },
    onError: (err) => {
      alert(err instanceof Error ? err.message : "Failed to resend OTP.");
    },
  });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    if (!email) return alert("Email is required to verify OTP. Please go back and enter your email.");

    // If onVerify prop is provided, use that
    if (onVerify) {
      await onVerify(otp);
      return;
    }
    
    // Otherwise use the default mutation
    handleVerifyOtp({ email, code: otp });
  };

  const handleResend = async () => {
    if (!email) return alert("Email is required to resend OTP.");
    
    // If onResend prop is provided, use that
    if (onResend) {
      await onResend();
      return;
    }
    
    // Otherwise use the default mutation
    handleResendOtp({ email });
  };

  return (
    <>
    <div className="min-h-screen bg-primary">
      {/* Mobile-optimized container */}
      <div className="mx-auto flex min-h-screen items-center justify-center px-4 py-6">
        <div className="w-full max-w-sm">
          <div className="bg-primary/40 p-6 rounded-lg">
            <h4 className="text-dark text-lg font-semibold">Confirm OTP Code</h4>

            <p className="mt-1 text-sm leading-5 text-text-hdd">
              Kindly type in the one-time password that was sent to {email || "your email"}.
            </p>

            <form onSubmit={handleVerify} className="mt-4">
              {/* OTP Input Container */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={(e) => handlePaste(i, e)}
                    className="
                      h-14 w-14 sm:h-15 sm:w-22 text-center font-semibold text-dark
                      bg-white outline-none
                      border border-accent0
                      focus:border-secondary focus:ring-2 focus:ring-secondary/20
                      rounded-md
                    "
                    style={{ 
                      fontSize: '20px',
                      WebkitAppearance: 'none',
                      MozAppearance: 'textfield'
                    }}
                  />
                ))}
              </div>

              <div className="mt-3 text-sm text-text-hdd text-center sm:text-left">
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
                  mt-5 h-12 w-full rounded-full bg-secondary
                  font-semibold text-white text-base
                  transition hover:bg-quaternary
                  disabled:cursor-not-allowed disabled:opacity-60
                  active:scale-[0.98] transform
                "
              >
                {verifying ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <SuccessModal
      isOpen={modalConfig.isOpen}
      onClose={async () => {
        const action = modalConfig.action;
        setModalConfig({ ...modalConfig, isOpen: false });
        
        if (action === "VERIFY") {
          if (onVerify) {
            await onVerify(otp);
          } else {
            router.push("/resetpassword");
          }
        } else if (action === "RESEND") {
          if (onResend) {
            await onResend();
          }
        }
      }}
      message={modalConfig.message}
      title={modalConfig.title}
    />
    </>
  );
}

// Usage example - you can keep this as a separate page component
export function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
 
  const handleVerify = async (code: string) => {
    if (!email) {
      alert("Missing email. Please go back and request a new code.");
      return;
    }

    try {
      const json: any = await verifyResetCode({ email, code });
      const token = json?.token ?? json?.data?.token;
      
      if (typeof token === "string" && token.length > 0) {
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("resetToken", token);
        router.push("/resetpassword");
        return;
      }
      
      alert("Code verified, but no reset token was returned.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Verification failed");
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("Missing email. Please go back and request a new code.");
      return;
    }
    
    try {
      await forgotPassword({ email });
      alert("A new code has been sent to your email.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to resend code");
    }
  };
 
  return (
    <ConfirmOtpCode
      length={5}
      email={email}
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
}