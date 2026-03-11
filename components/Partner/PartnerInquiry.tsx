"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PartnerForm from "./PartnerForm";
import { SubmittingState, SuccessState, ErrorState } from "./FormStates";

const PartnerInquiry = () => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (submissionStatus === "submitting") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [submissionStatus]);

  if (submissionStatus === "success") {
    return <SuccessState onReset={() => setSubmissionStatus("idle")} />;
  }

  if (submissionStatus === "error") {
    return <ErrorState onReset={() => setSubmissionStatus("idle")} />;
  }

  return (
    <div className="flex flex-col bg-[#FDE7F3] min-h-screen pb-24">
      {/* Partnership Inquiry Hero */}
      <div className="relative w-full h-[250px] md:h-[300px] lg:h-[400px] lg:mx-4 lg:rounded-2xl overflow-hidden mt-4 lg:mt-0 lg:w-[calc(100%-2rem)]">
        <Image
          src="/Threegirls.jpg"
          alt="Partnership Inquiry Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2a0036]/60 flex items-center justify-center text-center text-white px-5">
          <div className="mt-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal-sans tracking-wide">
              Partnership Inquiry
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-200">
              Build the future of African female tech talent with us.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="px-5 py-16 md:py-24 relative z-10 w-full flex justify-center">
        <PartnerForm
          onSubmitStart={() => setSubmissionStatus("submitting")}
          onSubmitSuccess={() => setSubmissionStatus("success")}
          onSubmitError={() => setSubmissionStatus("error")}
        />
      </div>

      {/* Loading Modal Overlay */}
      {submissionStatus === "submitting" && <SubmittingState />}
    </div>
  );
};

export default PartnerInquiry;
