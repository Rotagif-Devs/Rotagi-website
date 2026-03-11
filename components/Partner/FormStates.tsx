"use client";
import React from "react";
import { RefreshCw, Lock, Heart } from "lucide-react";

export const SubmittingState = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-5">
    <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-[400px] py-14 px-8 flex flex-col items-center text-center">
      <div className="relative mb-6 w-12 h-12 flex items-center justify-center">
        <RefreshCw
          className="w-12 h-12 text-[#D62D88] animate-spin"
          strokeWidth={1}
        />
        <Lock className="w-3 h-3 text-[#D62D88] absolute" strokeWidth={2.5} />
      </div>

      <h2 className="text-[1.35rem] font-bold text-black mb-3">
        Submitting...
      </h2>
      <p className="text-[#D62D88] text-[0.95rem]">
        Please do not refresh the page or close the browser.
      </p>
    </div>
  </div>
);

export const SuccessState = ({ onReset }: { onReset: () => void }) => (
  <section className="min-h-[85vh] w-full bg-[#FCE8F3] flex flex-col justify-center items-center text-center px-5 py-20 pb-32">
    <div className="relative mb-8 pt-10">
      <div className="bg-[#FACBE1] w-32 h-32 rounded-full flex items-center justify-center">
        <Heart className="w-10 h-10 text-[#D62D88] fill-[#D62D88]" />
      </div>
      <div className="absolute top-10 right-0 w-6 h-6 bg-[#D62D88] rounded-full translate-x-3 -translate-y-6"></div>
    </div>

    <h2 className="text-3xl md:text-[2.75rem] font-bold text-black mb-6 max-w-[35rem] leading-[1.2]">
      Thank You for Your Interest in Partnering With{" "}
      <span className="text-[#D62D88]">ROTAGI</span>
    </h2>
    <p className="text-gray-800 font-medium max-w-sm mb-12 text-sm leading-relaxed">
      Our partnerships team will review your submission and contact you shortly.
    </p>

    <button
      onClick={() => (window.location.href = "/")}
      className="px-10 py-[0.85rem] rounded-full bg-[#D62D88] hover:bg-pink-700 transition text-white font-bold text-[0.8rem] tracking-wide"
    >
      Return to Home Page
    </button>
  </section>
);

export const ErrorState = ({ onReset }: { onReset: () => void }) => (
  <section className="min-h-[85vh] w-full bg-[#FCE8F3] flex flex-col justify-center items-center text-center px-5 py-20 pb-32">
    <div className="mb-8 pt-10">
      <div className="bg-[#FACBE1] w-28 h-28 rounded-full flex items-center justify-center">
        <span className="text-[#D62D88] text-5xl font-light">!</span>
      </div>
    </div>

    <h2 className="text-3xl md:text-[2.2rem] font-bold text-black mb-3">
      We couldn't submit your request.
    </h2>
    <p className="text-gray-800 text-sm mb-10 font-medium">
      Something went wrong while sending your partnership inquiry.
    </p>

    <div className="bg-[#FACBE1] rounded-2xl p-6 text-left w-full max-w-[340px] mb-8">
      <h4 className="font-bold text-black text-[0.8rem] mb-3">Common issues</h4>
      <ul className="text-[0.75rem] border-0 border-transparent m-0 list-disc pl-5 text-black font-medium space-y-2">
        <li>Unstable network connection</li>
        <li>Temporary system error</li>
      </ul>
    </div>

    <button
      onClick={onReset}
      className="w-full max-w-[340px] py-[0.85rem] rounded-full bg-[#D62D88] hover:bg-pink-700 transition text-white font-bold mb-4 text-[0.8rem]"
    >
      Try Again
    </button>
    <button
      onClick={() => (window.location.href = "/contact")}
      className="text-[#D62D88] hover:text-pink-800 transition font-medium text-[0.8rem]"
    >
      Still having trouble? Contact Support
    </button>
  </section>
);
