"use client";

import React from "react";
import ProgramsCTA from "@/components/programs/ProgramsCTA";

const partnershipOptions = [
  {
    title: "Strategic Sponsorship",
    description:
      "Support our programmes through financial contributions and receive meaningful recognition across our platforms.",
    bullets: [
      "Brand visibility at the SHE Empower Conference and ROTAGI events",
      "Recognition in our annual impact reports",
      "Dedicated acknowledgement on the ROTAGI website and social media",
    ],
  },
  {
    title: "Technology Partnerships",
    description:
      "Provide technology resources, tools, and platforms that enhance our programme delivery and participant experience.",
    bullets: [
      "Learning platform access and integrations",
      "Hardware, equipment, and device donations",
      "Software licences, AI subscriptions, and digital tools",
    ],
  },
  {
    title: "Talent Pipeline Development",
    description:
      "Connect your organisation with our trained, motivated graduates for internships, employment, and career development.",
    bullets: [
      "Early access to talented, trained candidates",
      "Custom training programmes aligned to your hiring needs",
      "Participation in ROTAGI recruitment and careers events",
    ],
  },
  {
    title: "Programme Co-Development",
    description:
      "Work with ROTAGI to design and deliver training content, workshops, or bootcamps that reflect your industry's needs and our community's goals.",
    bullets: [],
  },
];

const collaborators = [
  "Tech industry leaders",
  "AI ethics experts",
  "Educational institutions",
  "Corporate partners",
  "NGOs and social impact organisations",
  "Government and development agencies",
];

const benefits = [
  "Build real digital products and solutions",
  "Master AI tools and technology skills",
  "Build confidence and leadership",
  "Access career pathways and economic opportunities",
  "Create sustainable impact in their communities",
];

const PremiumCheckIcon = () => (
  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FCE7F3] shrink-0">
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      className="w-3 h-3 text-[#E05397]"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const Collaboration = () => {
  return (
    <>
      {/* Network of Collaboration Section */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-[40px] font-bold font-cal-sans tracking-tight text-gray-950 mb-6 max-w-4xl mx-auto leading-tight uppercase">
            We Are Building a Powerful Network of Collaboration
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-sm md:text-base font-normal leading-relaxed">
            ROTAGI works with a wide range of organisations, institutions, and individuals who share our commitment to digital inclusion and gender equality in technology.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
            {/* Collaborators Card */}
            <div className="p-8 md:p-10 border border-gray-100/80 rounded-[24px] shadow-xl shadow-gray-100/60 bg-white">
              <h3 className="text-lg md:text-xl  text-gray-950 mb-6 tracking-tight">
                We collaborate with:
              </h3>
              <ul className="space-y-4 text-gray-500 text-sm md:text-base font-medium">
                {collaborators.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <PremiumCheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 md:p-10 border border-gray-100/80 rounded-[24px] shadow-xl shadow-gray-100/60 bg-white">
              <h3 className="text-lg md:text-xl  text-gray-950 mb-6 tracking-tight leading-snug">
                Through our partnerships, African girls and young women are able to:
              </h3>
              <ul className="space-y-4 text-gray-500 text-sm md:text-base font-medium">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <PremiumCheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ways We Can Work Together */}
      <section className="py-20 px-6 bg-white border-t border-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-cal-sans uppercase text-gray-950 text-center mb-12">
            Ways We Can Work Together
          </h2>

          <div className="space-y-4">
            {partnershipOptions.map((item, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-pink-100 shadow-sm">
                {/* Pink header bar */}
                <div className="bg-[#D81B7E] text-white px-6 py-4 font-bold text-sm md:text-base font-cal-sans uppercase">
                  {item.title}
                </div>
                {/* Body */}
                <div className="bg-white px-6 py-5">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {item.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-700 text-sm md:text-base"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B7E] shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reuse the existing CTA with video */}
      <ProgramsCTA />
    </>
  );
};

export default Collaboration;