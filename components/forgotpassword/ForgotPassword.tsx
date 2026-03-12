"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/services/auth.service";
import SuccessModal from "../SuccessModal";

type ForgotPasswordProps = {
  onSendCode?: (email: string) => Promise<void> | void;
  onSignInClick?: () => void;
};

export default function ForgotPassword({
  onSendCode,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    message: "",
  });

  const { mutate: handleSendCode, isPending: loading } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data: any) => {
      setModalConfig({
        isOpen: true,
        message:
          data?.message ||
          "OTP sent successfully. Please check your email.",
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "Failed to send code.";
      setError(message);
    },
  });

  const validateEmail = (value: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = email.trim();

    if (!value) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    handleSendCode({ email: value });
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto flex min-h-screen items-start justify-center px-6 pt-10 lg:pt-28">
          <div className="w-full">

            <h4 className="text-dark">Forgot Password?</h4>

            <p className="mt-2 leading-5 text-text-hdd">
              Please enter your email address below to receive a one-time
              password (OTP).
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">

              {/* EMAIL INPUT */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-dark"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="eg. email@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  className="
                    mt-2 h-10 w-full rounded-md bg-white px-3 text-dark outline-none
                    border border-accent0
                    placeholder:text-text-hdd/70
                    focus:border-secondary focus:ring-2 focus:ring-secondary/20
                  "
                />

                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  h-11 w-full rounded-full bg-secondary font-semibold text-white
                  shadow-sm transition hover:bg-quaternary
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                {loading ? "Sending..." : "Send Code"}
              </button>

              {/* SIGN IN LINK */}
              <p className="text-center text-text-hdd">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-pink-500 font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <SuccessModal
        isOpen={modalConfig.isOpen}
        onClose={() => {
          setModalConfig({ isOpen: false, message: "" });

          if (onSendCode) {
            onSendCode(email);
          }
        }}
        message={modalConfig.message}
        title="OTP Sent!"
      />
    </>
  );
}