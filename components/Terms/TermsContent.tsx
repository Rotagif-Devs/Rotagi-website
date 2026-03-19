"use client";

import React, { useState, useEffect } from "react";
import { termsData } from "@/lib/terms";

const TermsContent = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -110;
    const y = el.offsetTop + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;

      let currentSectionId = termsData[0].id;

      for (let i = 0; i < termsData.length; i++) {
        const el = document.getElementById(termsData[i].id);
        if (!el) continue;

        const nextEl =
          i < termsData.length - 1
            ? document.getElementById(termsData[i + 1].id)
            : null;

        const top = el.offsetTop;
        const bottom = nextEl
          ? nextEl.offsetTop
          : document.body.scrollHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          currentSectionId = termsData[i].id;
          break;
        }
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      {/* MOBILE DROPDOWN */}
      <div className="block md:hidden px-4 py-3 relative">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 w-full text-left"
        >
          <span className="text-base font-medium">Contents</span>
          <span className="text-lg">{mobileMenuOpen ? "×" : "▾"}</span>
        </button>

        {mobileMenuOpen && (
          <div className="absolute left-0 top-full w-full bg-white z-50  mt-2 rounded-lg p-4 shadow-md">
            <div className="space-y-1">
              {termsData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left text-sm relative rounded-md transition-all ${
                    activeSection === item.id
                      ? "bg-pink-500 text-white px-2 py-3"
                      : "text-black/80 hover:bg-pink-100 px-2 py-3"
                  }`}
                >
                  {item.title}
                  {activeSection === item.id && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

   <div className="md:grid md:grid-cols-[20%_auto] gap-5 w-full">
        {/* Sidebar */}
        <div className="relative hidden md:block">
          <aside className="rounded-lg p-4 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
            <h3 className="text-base font-medium mb-4 tracking-wide">
              Contents
            </h3>
            <div className="space-y-1">
              {termsData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left text-sm relative rounded-md transition-all ${
                    activeSection === item.id
                      ? "bg-pink-500 text-white px-2 py-3"
                      : "text-black/80 hover:bg-pink-100 px-2 py-3"
                  }`}
                >
                  {item.title}
                  {activeSection === item.id && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r" />
                  )}
                </button>
              ))}
            </div>
          </aside>
        </div>

        {/* Main Content */}
       <main className="min-w-0 w-full h-[calc(100vh-80px)] overflow-y-auto relative">
          <div className="py-4 px-6">
            <div className="w-full mx-auto space-y-12">
              <section id="introduction">
                <h1 className="text-xl font-light text-black">Introduction</h1>
                <p className="text-sm text-black font-extralight leading-relaxed my-2">
                  Welcome to ROTAGI. These Terms and Conditions govern your use of the ROTAGI website and any services, programs, resources, or information provided through the platform. By accessing or using this website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.
                </p>
              </section>

              <section id="about" className="my-4">
                <h1 className="text-xl font-light text-black my-2">About ROTAGI</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  ROTAGI is an initiative dedicated to equipping young African girls and women with AI literacy, digital confidence, and leadership skills. Through educational programs, mentorship opportunities, partnerships, and community initiatives, ROTAGI aims to empower women to build solutions and lead in the digital economy. This website provides information about ROTAGI’s mission, programs, events, and opportunities for engagement including donations, partnerships, mentorship, and volunteering.
                </p>
              </section>

              <section id="use" className="my-4">
                <h1 className="text-xl font-light text-black my-2">Use of the Website</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  By using this website, you agree to use it responsibly and in accordance with applicable laws. You agree that you will not:
                </p>
                <ul className="mt-2 space-y-2 text-sm text-black font-extralight list-disc pl-5">
                  <li>Use the website for unlawful purposes</li>
                  <li>Attempt to gain unauthorized access to the website or its systems</li>
                  <li>Interfere with the website’s functionality or security</li>
                  <li>Misrepresent your identity when submitting forms or inquiries</li>
                  <li>Use the website to distribute harmful or malicious content</li>
                </ul>
                <p className="text-sm text-black font-extralight leading-relaxed my-2">
                  ROTAGI reserves the right to restrict or terminate access to users who violate these terms.
                </p>
              </section>

              <section id="programs" className="my-4">
                <h1 className="text-xl font-light text-black my-2">Programs and Participation</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  ROTAGI offers various educational and empowerment programs designed for girls and women across different age groups.
                </p>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  Participation in programs does not guarantee certification, employment, or other outcomes unless explicitly stated.
                </p>
              </section>

              <section id="donations" className="my-4">
                <h1 className="text-xl font-light my-2 text-black">Donations</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  Donations made through the ROTAGI website support educational programs, community initiatives, and organizational operations.
                </p>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  By making a donation, you agree that:
                </p>
                <ul className="mt-2 space-y-2 text-sm text-black font-extralight list-disc pl-5">
                  <li>The information you provide is accurate and complete</li>
                  <li>Payments are processed through secure third-party payment providers</li>
                  <li>Donations are voluntary and generally non-refundable unless otherwise required by law</li>
                </ul>
                <p className="text-sm text-black font-extralight leading-relaxed my-2">
                  ROTAGI will make reasonable efforts to ensure transparency in how donations support its mission and impact.
                </p>
              </section>

              <section id="partnerships" className="my-4">
                <h1 className="text-xl font-light text-black my-2">Partnership and Collaborations</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  Organizations or individuals may express interest in partnering with ROTAGI through the partnership inquiry form or other communication channels. Submission of a partnership request does not guarantee a formal partnership. All partnership opportunities are subject to review, evaluation, and agreement between ROTAGI and the interested party.
                </p>
              </section>

              <section id="ip" className="my-4">
                <h1 className="text-xl font-light text-black my-2">Intellectual Property</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  All content on this website including text, graphics, logos, images, program materials, and other resources is the property of ROTAGI unless otherwise stated. This content is protected by intellectual property laws and may not be copied, reproduced, distributed, or used for commercial purposes without prior written permission from ROTAGI. Users may share ROTAGI content for educational or awareness purposes provided that proper attribution is given.
                </p>
              </section>

              <section id="external-links" className="my-4">
                <h1 className="text-xl font-light text-black my-2">External Links</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  The ROTAGI website may contain links to external websites or resources for informational purposes. ROTAGI is not responsible for the content, policies, or practices of these third-party websites. Users should review the terms and privacy policies of any external sites they visit.
                </p>
              </section>

              <section id="liability" className="my-4">
                <h1 className="text-xl font-light text-black my-2">Limitation of Liability</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  ROTAGI makes reasonable efforts to ensure the accuracy and reliability of information on this website. However, the website and its content are provided “as is” without warranties of any kind. ROTAGI shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.
                </p>
              </section>

              <section id="changes" className="my-4">
                <h1 className="text-xl font-light text-black my-2">Changes to the Terms</h1>
                <p className="text-sm text-black font-extralight leading-relaxed">
                  ROTAGI reserves the right to update or modify these Terms and Conditions at any time to reflect changes in policies, services, or legal requirements. Updated terms will be posted on this page with a revised effective date. Continued use of the website after changes are made constitutes acceptance of the updated terms.
                </p>
              </section>

            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default TermsContent;