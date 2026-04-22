"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { subscribeNewsletter } from "@/lib/services/newsletter.service";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName?: string;
}

export default function WaitlistModal({ isOpen, onClose, programName }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus("success");
        setMessage(res.data?.message || `Successfully joined the ${programName || ""} waitlist!`);
        setEmail("");
        // Keep the modal open for a moment to show success, then close
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setMessage("");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(res.message || "Failed to join. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Join the Waitlist"
      showCloseButton={false}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-gray-600">
            Be the first to know when {programName ? <span className="font-bold text-secondary">{programName}</span> : "our programs"} launch. 
            Sign up with your email below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all disabled:opacity-70"
            />
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl animate-in fade-in slide-in-from-top-1">
              <CheckCircle size={20} />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={20} />
              <span className="font-medium">{message}</span>
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full justify-center py-4 text-lg rounded-2xl shadow-xl shadow-pink-100"
          >
            {status === "loading" ? (
              <Loader2 className="animate-spin mr-2" />
            ) : status === "success" ? (
              "Added to Waitlist"
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>

        <p className="text-xs text-center text-gray-400">
          By joining, you agree to our Privacy Policy and will receive periodic updates about ROTAGI.
        </p>
      </div>
    </Modal>
  );
}
