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

        {/* RIGHT (Form Link) */}
        <div className="rounded-2xl bg-[#FFF6FB] border border-gray-100 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] md:p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
          <div className="max-w-md">
            <h3 className="text-2xl md:text-3xl font-cal-sans text-gray-900 mb-4">
              Secure Your Spot
            </h3>
            <p className="text-base md:text-lg text-[#5D677C] mb-8 leading-relaxed">
              Click the button below to access the SHE Empower 2026 waitlist registration form. It only takes a few minutes to join!
            </p>
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-[#D62D88] font-semibold tracking-wide text-white transition hover:opacity-90 hover:-translate-y-1 shadow-md"
            >
              Open Registration Form
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}