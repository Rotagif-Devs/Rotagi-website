"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is ROTAGI?",
    answer:
      "ROTAGI Reaching Out to African Girls Initiative is a registered Nigerian social impact organisation dedicated to empowering African girls and young women aged 10 to 40. We deliver free, structured Programs in Artificial Intelligence, digital skills, and life skills to help them participate and lead in the digital economy.",
  },
  {
    question: "Where is ROTAGI based?",
    answer:
      "ROTAGI is based in Abuja, Nigeria, but our impact reaches across various communities in Africa through our programs and digital initiatives.",
  },
  {
    question: "Who can join ROTAGI Programs?",
    answer:
      "Our programs are designed for African girls and women aged 10 to 40, with age-appropriate learning pathways for different stages of their journey.",
  },
  {
    question: "When can I start?",
    answer:
      "Applications for our various programs open at different times throughout the year. Follow our social media channels or subscribe to our newsletter for the latest updates.",
  },
  {
    question: "What is the SHE Empower Conference?",
    answer:
      "The SHE Empower Conference is our annual flagship event featuring workshops, mentorship sessions, and inspiring talks from industry leaders to empower and connect our community.",
  },
  {
    question: "Does my daughter need my permission to join?",
    answer:
      "Yes, for participants under 18, parental or guardian consent is required to participate in our programs and events.",
  },
  {
    question: "How do I become a ROTAGI mentor?",
    answer:
      "We are always looking for passionate professionals to mentor our girls. You can apply through our 'Become a Mentor' page on the website.",
  },
  {
    question: "How do I volunteer with ROTAGI?",
    answer:
      "Volunteering opportunities are announced periodically. You can express your interest by contacting us through our volunteer form.",
  },
  {
    question: "What does my donation fund?",
    answer:
      "Donations go directly towards providing free training materials, venue costs, internet access, and supporting the logistics of our empowerment programs.",
  },
  {
    question: "Can I sponsor a specific Program or event?",
    answer:
      "Yes, we welcome corporate and individual sponsorships for specific programs or events. Please reach out to our partnership team for more details.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[450px] lg:mx-4 lg:rounded-2xl overflow-hidden mt-5 lg:mt-0 lg:w-[calc(100%-2rem)]">
        <Image
          src="/programs-hero.jpg"
          alt="Partner with ROTAGI"
          width={1800}
          height={1800}
          priority
          className="object-cover h-[400px] lg:h-[600px]"
        />
        <div className="absolute inset-0 bg-[#35022e]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl flex flex-col items-center"
          >
            <div>
              <h3 className="text-4xl md:text-7xl lg:text-7xl font-normal font-cal-sans lg:mt-10 ">
                Frequently asked <span>Questions</span>
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-start gap-6 text-left group"
                >
                  <span className="text-black text-lg md:text-xl font-medium font-dm-sans leading-8 group-hover:text-secondary transition-colors">
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
                  <div className="mt-4 text-gray-700 text-base md:text-lg font-normal font-dm-sans leading-7 animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="pb-16 md:pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-primary rounded-3xl p-8 md:p-16 flex flex-col items-center gap-8 text-center">
          <div className="flex -space-x-4 mb-2">
            {["/Amara.png", "/Fatima.png", "/Lola.png"].map((src, i) => (
              <div
                key={i}
                className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white overflow-hidden"
              >
                <Image src={src} alt="Team" fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-black text-2xl md:text-3xl font-bold font-dm-sans">
              Still Have a Question?
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-normal font-dm-sans">
              We are happy to help. Send us a message and our team will respond
              as soon as possible.
            </p>
          </div>

          <Button
            href="/contact"
            variant="primary"
            className="px-10 py-4 rounded-full"
          >
            Contact Us
          </Button>
        </div>
      </section>
    </main>
  );
}
