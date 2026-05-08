"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { ArrowRight } from "lucide-react";

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
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-[6px] w-full " />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-2 font-medium text-pink-500">SHE Empower 2026</p>

          <h2 className=" font-medium  uppercase tracking-tight text-black">
            Coming Soon
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="mt-15 grid gap-5 md:grid-cols-3">
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
              className="rounded-2xl border border-gray-100 bg-white px-6 py-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <h4 className=" font-medium text-[#1F2937]">{card.title}</h4>

              <p className="mt-3 text-sm text-[#5D677C]">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <button className="group inline-flex items-center gap-2 rounded-full bg-pink-600 px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-pink-700 hover:shadow-lg">
            Register Your Interest
            <ArrowDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </motion.div>

        {/* Sponsor Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          {/* Avatars */}
          <div className="mb-8 flex justify-center">
            <div className="flex -space-x-3">
              <Image
                src="/A1.png"
                alt="avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border-4 border-white object-cover"
              />

              <Image
                src="/A3.png"
                alt="avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border-4 border-white object-cover"
              />

              <Image
                src="/A2.png"
                alt="avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          <h3 className="text-4xl font-black uppercase tracking-tight text-black md:text-5xl">
            Become A Sponsor
          </h3>

          <div className="mt-8">
            <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-pink-700 hover:shadow-xl">
              Explore Sponsorship Opportunities 
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
              coming soon
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
