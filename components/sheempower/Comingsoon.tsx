"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";

const cards = [
  {
    title: "Event Date & Venue",
    text: "To be announced",
  },
  {
    title: "Speaker Lineup",
    text: "To be announced",
  },
  {
    title: "Full Schedule",
    text: "To be announced",
  },
  {
    title: "Tickets",
    text: "To be announced",
  },
  {
    title: "Scholarships",
    text: "To be announced",
  },
];

export default function ComingSoonSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 md:px-10 lg:px-16">
     
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-2 font-semibold tracking-wider text-[#D62D88]">SHE Empower 2026</p>

          <h2 className="uppercase tracking-tight text-black text-3xl md:text-5xl">
            Coming Soon
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="mt-15 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
              }}
              className="rounded-2xl border border-pink-100/30 bg-white px-6 py-8 text-center shadow-sm flex flex-col justify-center min-h-[140px]"
            >
              <h4 className="text-black text-lg tracking-tight">{card.title}</h4>

              <p className="mt-2 text-sm text-[#5D677C]">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <p className="mx-auto my-4 max-w-2xl text-center leading-relaxed text-[#5D677C]">
           We are building something incredible for 2026.  
Sign up below and we will notify you the moment details go live  before anyone else.
          </p>

          <Button
            href="#register"
            className="bg-[#D62D88] text-white hover:bg-[#D62D88]/90 rounded-full px-10 py-4 font-bold text-sm tracking-wide transition-all duration-300 shadow-md"
          >
            <span className="">Register your interest</span>
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Sponsor Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <h2 className="uppercase tracking-tight text-black text-3xl md:text-5xl">
            BECOME A SPONSOR
          </h2>

          <p className="mt-3 text-lg">
            Support the next generation of African girls in AI, technology, and leadership. 
          </p>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-[#373737]">
            Our sponsorship opportunities are designed to be accessible, with flexible packages that allow individuals, organisations, and partners to contribute meaningfully. Whether you want to support scholarships, workshops, or the overall event experience  there is a place for you. 
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              href="/partner"
              className="bg-[#D62D88] text-white hover:bg-[#D62D88]/90 rounded-full px-10 py-4 font-bold text-sm tracking-wide transition-all duration-300 shadow-md"
            >
Explore Sponsorship Opportunities → Coming Soon            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
