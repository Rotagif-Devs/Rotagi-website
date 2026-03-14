"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/globalComp/CTA";

const agenda = [
  { time: "9:00 - 10:00 AM", title: "Registration & Welcome Coffee" },
  { time: "10:00 - 11:30 AM", title: "Keynote: The Future of AI in Africa" },
  {
    time: "11:30 - 1:00 PM",
    title: "Panel Discussion: Women Leading AI Innovation",
  },
  { time: "1:00 - 2:00 PM", title: "Networking Lunch" },
  {
    time: "2:00 - 3:30 PM",
    title: "Interactive Workshop: AI for Social Impact",
  },
  { time: "3:30 - 4:30 PM", title: "Lightning Talks and Demos" },
  {
    time: "4:30 - 6:00 PM",
    title: "Closing Remarks and Community Celebration",
  },
];

const speakers = [
  {
    name: "Dr. Amina Okoye",
    role: "AI Ethics Specialist",
    bio: "Leading research on natural language processing for African languages with 10+ years of experience in AI ethics.",
    image: "/speaker1.png",
  },
  {
    name: "Engr. Sarah Mensah",
    role: "Machine Learning Engineer",
    bio: "Focusing on building scalable AI solutions for healthcare in rural areas. Expert in deep learning models.",
    image: "/speaker2.png",
  },
  {
    name: "Dr. Fatima Zahra",
    role: "Data Scientist",
    bio: "Specializing in predictive analytics for agricultural productivity in West Africa. Passionate about data for good.",
    image: "/speaker4.png",
  },
  {
    name: "Lola Adeyemi",
    role: "Tech Entrepreneur",
    bio: "Founder of multiple tech startups and advocate for young women in STEM globally.",
    image: "/speaker3.png",
  },
];

export default function EventPage({ params }: { params: { slug: string } }) {
  const eventTitle = "AI Futures Summit 2026";

  return (
    <div className="min-h-screen bg-white">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-10">
        <Link
          href="/events"
          className="text-pink-600 flex items-center gap-2 font-medium"
        >
          ← Back to events
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-normal text-[#3D1A2A] mb-6 font-cal-sans leading-[1.1]">
              {eventTitle}
            </h1>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-dm-sans">
              Join us for our annual summit in West Africa. The AI Futures
              Summit brings together industry leaders, practitioners, and
              students to explore the latest advances in AI and their impact on
              our world. Experience hands-on workshops, keynote speakers, and
              networking opportunities.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-700">
                <span className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full text-pink-600 text-lg">
                  📅
                </span>
                <span className="font-medium text-base">
                  June 15 - 20, 2026
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <span className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full text-pink-600 text-lg">
                  📍
                </span>
                <span className="font-medium text-base">
                  Lagos, Nigeria (Hybrid Event)
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <span className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full text-pink-600 text-lg">
                  ⏰
                </span>
                <span className="font-medium text-base">9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[550px] rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="/Threegirls.jpg"
              alt="Hero image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="bg-[#FDF2F8] py-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-normal text-[#3D1A2A] mb-16 font-cal-sans">
            Agenda
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {agenda.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl flex items-center justify-between shadow-sm border border-pink-50 transition-transform hover:scale-[1.02]"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 leading-tight">
                    {item.title}
                  </h3>
                </div>
                <div className="bg-pink-100 text-pink-600 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-normal text-[#3D1A2A] mb-16 font-cal-sans">
            Featured Speakers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="bg-white rounded-[32px] overflow-hidden shadow-lg shadow-pink-100/20 border border-gray-100 h-full flex flex-col"
              >
                <div className="relative h-72">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#3D1A2A] mb-2 leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-pink-600 font-semibold text-sm mb-4">
                    {speaker.role}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed font-dm-sans">
                    {speaker.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA Section */}
      <CTA />
    </div>
  );
}
