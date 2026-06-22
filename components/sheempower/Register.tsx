"use client";

import React from "react";

const benefits = [
  "Early access to tickets",
  "Speaker announcements",
  "Full event schedule and session details ",
  "Scholarship opportunities",
  "Exclusive ROTAGI updates",
];

export default function RegisterInterestSection() {
  const formUrl = "https://forms.office.com/r/i68BipKxqT?origin=lprLink";
  
  return (
    <section id="register" className="bg-white px-6 py-20 md:px-16 lg:px-24 border-t border-pink-100/30">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        {/* LEFT */}
        <div>
          <p className="mb-4 font-semibold tracking-wider text-[#D62D88]">
            Waitlist Form
          </p>

          <h2 className="uppercase leading-[1.1] text-black text-3xl md:text-4xl">
            Be the First to Know
          </h2>

          <p className="mt-5 text-base leading-relaxed text-[#5D677C]">
            SHE Empower 2026 is coming. Register your interest and we will notify you the moment tickets open, speakers are announced, and the full schedule drops.
          </p>

          {/* BENEFITS */}
          <div className="mt-10 max-w-sm rounded-2xl border border-pink-100 bg-white p-6 w-full">
            <h5 className="mb-5 text-base text-black tracking-wide">
              What you will receive:
            </h5>

            <ul className="space-y-3">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#5D677C] font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 text-[#D62D88]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT (Form via iframe + fallback) */}
        <div className="rounded-2xl bg-[#FFF6FB] border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] md:p-8 flex flex-col items-center">
          <div className="w-full h-[600px] md:h-[700px] mb-4 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <iframe
              src={formUrl}
              width="100%"
              height="100%"
              style={{ border: "none", minHeight: "600px" }}
              allowFullScreen
              title="SHE Empower 2026 Registration Form"
            />
          </div>
          
          <div className="text-center mt-4 w-full">
            <p className="text-sm text-[#5D677C] mb-3">
              Having trouble viewing the form?
            </p>
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-md bg-[#D62D88] tracking-wide text-white transition hover:opacity-90 shadow-sm"
            >
              Open Form in New Tab
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}