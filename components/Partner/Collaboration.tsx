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
  "Tech Industry Leaders",
  "AI Ethics Experts",
  "Educational Institutions",
  "Corporate Partners",
  "NGOs And Social Impact Organisations",
  "Government And Development Agencies",
];

const benefits = [
  "Build Real Digital Products And Solutions",
  "Master AI Tools And Technology Skills",
  "Build Confidence And Leadership",
  "Access Career Pathways And Economic Opportunities",
  "Create Sustainable Impact In Their Communities",
];

const Collaboration = () => {
  return (
    <>
      {/* Network of Collaboration */}
      <section className="py-20 px-6 bg-[#FDF2F8] text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-cal-sans uppercase text-gray-950 mb-4">
            We Are Building a Powerful Network of Collaboration
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
            ROTAGI works with a wide range of organisations, institutions, and individuals who share our commitment to digital inclusion and gender equality in technology.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {/* Collaborators Card */}
            <div className="p-8 border border-pink-100 rounded-2xl shadow-sm bg-white">
              <h3 className="text-base md:text-lg font-bold text-gray-950 mb-5">We collaborate with:</h3>
              <ul className="space-y-3 text-gray-700 text-sm md:text-base">
                {collaborators.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D81B7E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Card */}
            <div className="p-8 border border-pink-100 rounded-2xl shadow-sm bg-white">
              <h3 className="text-base md:text-lg font-bold text-gray-950 mb-5">
                Through our partnerships, African girls and young women are able to:
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm md:text-base">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D81B7E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ways We Can Work Together */}
      <section className="py-20 px-6 bg-white">
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