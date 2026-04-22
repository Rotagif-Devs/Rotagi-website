"use client";
import React from "react";
import { RefreshCw, Lock, Mail, CheckCircle2, AlertCircle } from "lucide-react";

export const SubmittingState = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-5">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[420px] py-16 px-10 flex flex-col items-center text-center border border-pink-100">
      <div className="relative mb-8 w-16 h-16 flex items-center justify-center">
        <RefreshCw
          className="w-16 h-16 text-[#D62D88] animate-spin-slow opacity-20"
          strokeWidth={1}
        />
        <RefreshCw
          className="w-10 h-10 text-[#D62D88] animate-spin absolute"
          strokeWidth={2}
        />
        <Mail className="w-4 h-4 text-[#D62D88] absolute" strokeWidth={2.5} />
      </div>

      <h2 className="text-2xl font-bold font-cal-sans text-gray-900 mb-3">
        Sending Message
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
        We're delivering your message to our team. Please wait a moment.
      </p>
    </div>
  </div>
);

type SuccessProps = {
  name: string;
  email: string;
  onReset: () => void;
};

export const SuccessState = ({ name, email, onReset }: SuccessProps) => (
  <section className="min-h-[80vh] w-full bg-[#FFF5F9] flex flex-col justify-center items-center text-center px-6 py-20 animate-in fade-in duration-700">
    <div className="relative mb-10 group">
      <div className="bg-white w-36 h-36 rounded-full flex items-center justify-center shadow-xl shadow-pink-200/50 relative z-10">
        <CheckCircle2 className="w-16 h-16 text-[#D62D88] fill-[#D62D88]/5" strokeWidth={1.5} />
      </div>
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-100 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-200 rounded-full animate-bounce"></div>
    </div>

    <h2 className="text-4xl md:text-5xl font-bold font-cal-sans text-gray-900 mb-6 max-w-2xl leading-tight">
      Thank you for your message
    </h2>
    
    <div className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl p-6 mb-10 max-w-md shadow-sm">
      <p className="text-gray-600 font-medium mb-3">
        Our team will be in touch as soon as possible.
      </p>
    </div>



    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() => (window.location.href = "/")}
        className="px-10 py-4 rounded-full bg-gray-900 hover:bg-gray-800 transition-all text-white font-bold text-sm tracking-wide shadow-lg shadow-gray-200"
      >
        Return Home
      </button>
      <button
        onClick={onReset}
        className="px-10 py-4 rounded-full bg-white border-2 border-gray-100 hover:bg-gray-50 transition-all text-gray-700 font-bold text-sm"
      >
        Send Another
      </button>
    </div>
  </section>
);

export const ErrorState = ({ onReset }: { onReset: () => void }) => (
  <section className="min-h-[80vh] w-full bg-[#FFF5F9] flex flex-col justify-center items-center text-center px-6 py-20 pb-32 animate-in slide-in-from-bottom duration-500">
    <div className="mb-10">
      <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center shadow-xl shadow-red-100/50">
        <AlertCircle className="w-14 h-14 text-red-500 opacity-80" strokeWidth={1.5} />
      </div>
    </div>

    <h2 className="text-3xl md:text-4xl font-bold font-cal-sans text-gray-900 mb-4">
      Delivery Failed
    </h2>
    <p className="text-gray-500 text-sm mb-12 font-medium max-w-xs mx-auto leading-relaxed">
      We encountered an issue while trying to send your message. Don't worry, your data is safe.
    </p>

    <div className="bg-white rounded-3xl p-8 text-left w-full max-w-sm mb-10 shadow-sm border border-red-50">
      <h4 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        What happened?
      </h4>
      <ul className="text-xs space-y-3 text-gray-500 font-medium">
        <li className="flex gap-3">
          <span className="text-red-400 font-bold">•</span>
          Unstable network connection detected.
        </li>
        <li className="flex gap-3">
          <span className="text-red-400 font-bold">•</span>
          Temporary server timeout.
        </li>
      </ul>
    </div>

    <button
      onClick={onReset}
      className="w-full max-w-sm py-4 rounded-full bg-[#D62D88] hover:bg-pink-700 transition-all text-white font-bold mb-4 shadow-lg shadow-pink-200 transform active:scale-95"
    >
      Try Sending Again
    </button>
    <button
      onClick={() => (window.location.href = "mailto:support@rotagif.com")}
      className="text-gray-500 hover:text-gray-800 transition font-bold text-xs uppercase tracking-widest"
    >
      Or Email Us Directly
    </button>
  </section>
);
