"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Button from "@/components/ui/Button";

const faqs = [
  {
    question: "What is ROTAGI?",
    answer:
      "ROTAGI Reaching Out to African Girls Initiative is a registered Nigerian social impact organisation dedicated to empowering African girls and young women aged 10 to 40. We deliver structured program in artificial Intelligence, digital skills, and life skills to help African participate and lead in the digital economy.",
  },
  {
    question: "Where is ROTAGI based?",
    answer:
      "ROTAGI is headquartered in Abuja, Nigeria. Our Programs are delivered both and online and on site across Africa",
  },
  {
    question: "Does my daughter need my permission to join?",
    answer:
      "Yes. Participants under 18 require written parental or guardian consent before joining any ROTAGI Program.",
  },
  {
    question: "How do I volunteer with ROTAGI?",
    answer:
      "You can join the ROTAGI Ambassador Program.",
  },
  {
    question: "What is the SHE Empower Conference?",
    answer: (
      <>
        The SHE Empower Conference is ROTAGI's flagship annual one day event bringing together African girls and young women for leadership sessions, mentorship, digital skills workshops, scholarship announcements, and community celebration. The next conference is coming in 2026.
        <br />
        <br />
        Register your interest at <span className="text-secondary italic">/events/she-empower.</span>
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-16">
        <div className="text-center flex flex-col gap-5">
          <h2 className="text-gray-900 text-3xl md:text-4xl font-normal font-cal-sans leading-tight uppercase">
            Frequently asked questions
          </h2>
        </div>

        <div className="w-full flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-start gap-6 text-left group"
              >
                <span className="text-black text-lg font-medium font-dm-sans leading-8 group-hover:text-secondary transition-colors">
                  {faq.question}
                </span>
                <span className="shrink-0 mt-1.5 w-6 h-6 border-2 border-secondary rounded-full flex items-center justify-center">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-secondary" />
                  ) : (
                    <Plus className="w-4 h-4 text-secondary" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 text-gray-700 text-base font-normal font-dm-sans leading-7 animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:max-w-10/12 max-w-11/12 mt-12 m-auto bg-primary rounded-2xl p-8 py-16 md:p-16 flex flex-col items-center gap-8">
        <div className="text-center flex flex-col gap-3.5 max-w-3xl">
          <h3 className="text-black lg:text-3xl text-2xl uppercase font-cal-sans leading-8">
            Building a Just and Inclusive Digital Future for African Girls
          </h3>
          <p className="text-gray-600 lg:text-base text-sm font-normal font-dm-sans leading-6">
            We believe technology education is a right, not a privilege. ROTAGI
            removes barriers that keep girls out of AI and tech, and replaces
            them with skills, mentorship and community.
          </p>
        </div>
        <Button href="/contact" variant="primary" className="px-9 py-3.5">
          Contact Us
        </Button>
      </div>
    </section>
  );
}
