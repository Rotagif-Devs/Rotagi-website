"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProgramsCTA from "@/components/programs/ProgramsCTA";
import { CheckCircle } from "lucide-react";
import VolunteerHero from "@/components/Volunteer/VolunteerHero";

const HOW_TO_CONTRIBUTE = [
  {
    title: "Program Ambassador",
    description:
      "Join programme delivery teams to support facilitators, run workshops, and mentor participants through hands on sessions.",
  },
  {
    title: "Story Ambassador",
    description:
      "Collect and share participant stories, case studies and impact content to amplify our work and attract new supporters.",
  },
  {
    title: "Events Ambassador",
    description:
      "Support planning and running events like the SHE Empower conference — logistics, registration and onsite coordination.",
  },
  {
    title: "Community Ambassador",
    description:
      "Build local partnerships, engage community groups and help recruit participants from schools and youth hubs.",
  },
  {
    title: "Skills Ambassador",
    description:
      "Deliver practical sessions on digital skills, AI basics, and career readiness — no prior teaching qualification required.",
  },
  {
    title: "Research Ambassador",
    description:
      "Help monitor and evaluate our programmes, support surveys, data gathering and reporting on impact.",
  },
];

const WHY_BULLETS = [
  "You bring real-world experience that our participants need.",
  "Your time directly impacts the future of African women in technology.",
  "You become part of a passionate, values-driven community.",
  "Volunteering with ROTAGI looks great on your CV and portfolio.",
];

const WHAT_TO_EXPECT = [
  "A welcoming, inclusive, and professional environment.",
  "Clear guidance on your role and responsibilities.",
  "Regular communication and updates from the ROTAGI team.",
  "Recognition in our reports, newsletters, and social media.",
  "A certificate of volunteering upon completion of your commitment.",
];

const ROLES = [
  "Program Support",
  "Digital Ambassador",
  "Event Support",
  "Other",
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen ">
      {/* ── Hero ─────────────────────────────────────────── */}
      <VolunteerHero />

      {/* ── Who We Welcome ───────────────────────────── */}
      <section className="py-16 px-6 bg-[#FDF2F8]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-xl md:text-2xl font-cal-sans font-bold uppercase text-gray-950 mb-4">
              Who We Welcome
            </h3>
            <p className="text-gray-600 mb-4">
              We welcome anyone who wants to make a difference. You don't need a tech degree — just commitment, empathy, and a willingness to learn.
            </p>
            <ul className="space-y-3 text-gray-700 text-sm md:text-base">
              <li>People of all backgrounds and experience levels.</li>
              <li>Professionals who can donate a few hours or more.</li>
              <li>Students, educators, and community organisers.</li>
              <li>Anyone who can help mentor, teach or coordinate locally.</li>
            </ul>

            <div className="mt-6 bg-white border border-pink-100 rounded-2xl p-4 text-sm text-gray-700">
              <strong className="text-[#D81B7E]">Note:</strong> We provide orientation and support for all volunteers — you'll never be left on your own.
            </div>
          </div>

          <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden shadow-md">
            <Image src="/Workgroup.png" alt="Who we welcome" fill className="object-cover object-center" />
          </div>
        </div>
      </section>

      {/* ── Your Time Can Change Her Future ──────────────── */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-cal-sans font-bold uppercase text-gray-950 mb-5">
            Your Time Can Change Her Future
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Volunteering with ROTAGI is one of the most meaningful ways to contribute to gender equity in technology across Africa. Whether you have a few hours a week or can commit to a full programme cycle, there is a role for you. You do not need to be a tech expert — you just need to care.
          </p>
          <div className="mt-8 flex justify-center">
            <span className="inline-block bg-pink-50 border border-pink-100 text-[#D81B7E] px-6 py-3 rounded-full font-semibold text-sm">
              NO MATTER YOUR BACKGROUND, YOUR CONTRIBUTION MATTERS
            </span>
          </div>
        </div>
      </section>

      {/* ── How You Can Contribute ───────────────────────── */}
      <section className="py-16 px-6 bg-[#FDF2F8]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 text-center mb-10">
            How You Can Contribute
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_TO_CONTRIBUTE.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
              >
                <div className="bg-[#D81B7E] text-white px-5 py-3 font-bold text-sm font-cal-sans uppercase">
                  {item.title}
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We'd Love That ───────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 mb-6">
              Why We'd Love That
            </h2>
            <ul className="space-y-4">
              {WHY_BULLETS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#D81B7E] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button
                href="#apply"
                variant="primary"
                className="bg-[#D81B7E] hover:bg-pink-700 text-white rounded-full px-8 py-3 font-semibold text-sm transition-colors"
              >
                Apply Now
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/Workshop.png"
              alt="ROTAGI volunteers"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── What You Can Expect From Us ──────────────────── */}
      <section className="py-16 px-6 bg-[#FDF2F8]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/Community.png"
              alt="ROTAGI community"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 mb-6">
              What You Can Expect From Us
            </h2>
            <ul className="space-y-4">
              {WHAT_TO_EXPECT.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#D81B7E] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Apply to Volunteer ───────────────────────────── */}
      <section id="apply" className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 text-center mb-3">
            Apply to Volunteer
          </h2>
          <p className="text-gray-500 text-sm text-center mb-10">
            Fill in the form below and a member of our team will be in touch.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
              <CheckCircle size={48} className="text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">
                Application Received!
              </h3>
              <p className="text-gray-600 text-sm">
                Thank you for wanting to volunteer with ROTAGI. We will review your application and be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-xl transition-all text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-xl transition-all text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Volunteer Role
                </label>
                <select
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-xl transition-all text-sm text-gray-700"
                >
                  <option value="">Select a role</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D81B7E] hover:bg-pink-700 text-white rounded-full py-4 text-base font-bold shadow-lg shadow-pink-200 transition-all disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* ── Other Ways to Support ROTAGI ─────────────────── */}
      <ProgramsCTA />
    </div>
  );
}
