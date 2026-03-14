"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "about", title: "About ROTAGI" },
  { id: "use", title: "Use of the Website" },
  { id: "programs", title: "Programs and Participation" },
  { id: "donations", title: "Donations" },
  { id: "partnership", title: "Partnership and Collaborations" },
  { id: "intellectual", title: "Intellectual Property" },
  { id: "external", title: "External Links" },
  { id: "limitation", title: "Limitation of Liability" },
  { id: "change", title: "Change of the Terms" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          if (
            element.offsetTop <= scrollPosition &&
            element.offsetTop + element.offsetHeight > scrollPosition
          ) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF2F8]">
      {/* Hero Section - Matching site standard */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:mx-4 lg:rounded-2xl overflow-hidden mt-4 lg:mt-0 lg:w-[calc(100%-2rem)]">
        <Image
          src="/hero.png"
          alt="Terms & Conditions"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#35022e]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal-sans tracking-wide">
              Terms & Conditions
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-16">
        {/* Sidebar / Contents */}
        <div className="md:w-1/4">
          <div className="sticky top-28 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-pink-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Contents
            </h2>
            <ul className="space-y-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left transition-all duration-200 text-sm font-medium ${
                      activeSection === section.id
                        ? "text-pink-600 scale-105 ml-1"
                        : "text-gray-500 hover:text-[#3D1A2A]"
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4 space-y-16 text-gray-700 leading-[1.8]">
          <section id="introduction" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Introduction
            </h2>
            <p className="mb-4">Welcome to ROTAGI.</p>
            <p>
              These Terms and Conditions ("Terms") govern your use of our
              website, services, and any interactions you have with ROTAGI (the
              "Organization," "we," "us," or "our"). By accessing or using our
              website, you agree to be bound by these Terms. If you do not agree
              to these Terms, please do not use our website.
            </p>
          </section>

          <section id="about" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              About ROTAGI
            </h2>
            <p>
              ROTAGI is a non-profit organization focused on empowering young
              girls in Africa through access to technology, mentorship, and
              leadership development. Our goal is to transform the lives of
              young girls and women by giving them the tools and resources they
              need to succeed in the digital age.
            </p>
            <p className="mt-4">
              Our mission is to close the gender gap in tech by providing
              high-quality digital training and opportunities for young women
              across Africa.
            </p>
          </section>

          <section id="use" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Use of the Website
            </h2>
            <p>
              By using this website, you agree to use it only for lawful
              purposes and in a way that does not infringe on the rights of
              others or restrict their use and enjoyment of the website.
            </p>
            <ul className="list-disc ml-6 mt-6 space-y-3">
              <li>You must be at least 13 years old to use this website.</li>
              <li>
                You agree to provide accurate and complete information when
                registering for our programs.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account information.
              </li>
              <li>
                You agree not to use the website to transmit any harmful code or
                content.
              </li>
            </ul>
            <p className="mt-6">
              ROTAGI reserves the right to terminate your access to the website
              at any time without notice for any reason.
            </p>
          </section>

          <section id="programs" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Programs and Participation
            </h2>
            <p>
              ROTAGI offers a variety of programs focused on digital skills
              training, mentorship, and professional development.
            </p>
            <p className="mt-4">
              Participation in our programs may be subject to additional terms
              and conditions that will be provided to you when you apply for or
              enroll in a specific program. By participating in a program, you
              agree to abide by all applicable rules and regulations.
            </p>
            <p className="mt-4">
              We reserve the right to modify or discontinue any of our programs
              at any time without notice.
            </p>
          </section>

          <section id="donations" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Donations
            </h2>
            <p>
              Donations made to ROTAGI through our website are used to support
              our programs and operations in accordance with our mission.
            </p>
            <div className="mt-6 space-y-4">
              <p>By making a donation, you agree that:</p>
              <ul className="list-disc ml-6 space-y-3">
                <li>
                  Your donation is made voluntarily and without any expectation
                  of return.
                </li>
                <li>
                  ROTAGI is not responsible for any issues related to
                  third-party payment processors.
                </li>
                <li>
                  Your donation may be eligible for tax deduction depending on
                  your local laws and regulations.
                </li>
              </ul>
            </div>
            <p className="mt-6">
              All donations are final and non-refundable, except in exceptional
              circumstances where required by law or our internal policies.
            </p>
          </section>

          <section id="partnership" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Partnership and Collaborations
            </h2>
            <p>
              ROTAGI works with various partners and collaborators to achieve
              its mission. Any agreements or collaborations are subject to
              separate contracts and terms.
            </p>
            <p className="mt-4">
              Mention of any third-party organizations or partners on our
              website does not imply an endorsement by ROTAGI, nor does it imply
              that we are responsible for their actions or content.
            </p>
          </section>

          <section id="intellectual" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Intellectual Property
            </h2>
            <p>
              All content on the ROTAGI website, including text, images, logos,
              and software, is the property of ROTAGI or its licensors and is
              protected by intellectual property laws.
            </p>
            <p className="mt-4">
              You may not use, reproduce, or distribute any content from our
              website without our prior written consent, except for personal,
              non-commercial use.
            </p>
            <p className="mt-4">
              The "ROTAGI" name and logo are trademarks of the Organization and
              may not be used without authorization.
            </p>
          </section>

          <section id="external" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              External Links
            </h2>
            <p>
              Our website may contain links to third-party websites that are not
              owned or controlled by ROTAGI. We are not responsible for the
              content, privacy policies, or practices of any third-party
              websites.
            </p>
            <p className="mt-4">
              You acknowledge and agree that ROTAGI shall not be responsible or
              liable, directly or indirectly, for any damage or loss caused or
              alleged to be caused by or in connection with the use of any such
              content, goods, or services available on or through any such
              websites.
            </p>
          </section>

          <section id="limitation" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Limitation of Liability
            </h2>
            <p>
              ROTAGI shall not be liable for any direct, indirect, incidental,
              special, or consequential damages resulting from the use or
              inability to use our website or services.
            </p>
            <p className="mt-4">
              Our website and content are provided on an "as is" and "as
              available" basis without any warranties of any kind, either
              express or implied.
            </p>
            <p className="mt-4">
              Some jurisdictions do not allow the limitation or exclusion of
              liability for incidental or consequential damages, so some of the
              above limitations may not apply to you.
            </p>
          </section>

          <section id="change" className="scroll-mt-32 pb-20">
            <h2 className="text-3xl font-bold text-[#3D1A2A] mb-6 font-cal-sans">
              Change of the Terms
            </h2>
            <p>
              ROTAGI reserves the right to update or change these Terms at any
              time. Any changes will be posted on this page, and your continued
              use of the website after such changes are posted will constitute
              your agreement to the new Terms.
            </p>
            <p className="mt-4">
              We recommend checking this page periodically to stay informed
              about any updates to our Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
