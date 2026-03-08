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
  onSignInClick,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [modalConfig, setModalConfig] = useState({ isOpen: false, message: "" });
  
  const { mutate: handleSendCode, isPending: loading } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setModalConfig({ isOpen: true, message: data?.message || "OTP sent successfully. Please check your email." });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Failed to send code.";
      alert(message);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;

    handleSendCode({ email: value });
  }

  return (
    <>
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen items-start justify-center px-6 lg:pt-28 pt-10">
        <div className="w-full ">
         
          <h4 className="text-dark">Forgot Password?</h4>

         
          <p className="mt-2 leading-5 text-text-hdd">
            Please enter your email address below to receive a one-time password
            (OTP).
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block  font-semibold text-dark">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="eg. email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  mt-2 h-10 w-full rounded-md bg-white px-3  text-dark outline-none
                  border border-accent0
                  placeholder:text-text-hdd/70
                  focus:border-secondary focus:ring-2 focus:ring-secondary/20
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="
                h-11 w-full rounded-full bg-secondary  font-semibold text-white
                shadow-sm transition
                hover:bg-quaternary
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              {loading ? "Sending..." : "Send Code"}
            </button>

            <p className="text-center  text-text-hdd">
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

    <SuccessModal
      isOpen={modalConfig.isOpen}
      onClose={() => {
        setModalConfig({ isOpen: false, message: "" });
        if (onSendCode) onSendCode(email);
      }}
      message={modalConfig.message}
      title="OTP Sent!"
    />
    </>
  );
}