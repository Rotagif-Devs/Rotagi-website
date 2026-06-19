
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ChevronLeft } from "lucide-react";
import CTA from "@/components/globalComp/CTA";
import { publicService } from "@/lib/services/public.service";
import { notFound } from "next/navigation";

const fallbackAgenda = [
  { time: "9:00 - 10:00 AM", title: "Registration & Welcome Coffee" },
  { time: "10:00 - 11:30 AM", title: "Interactive Workshop: AI for Social Impact" },
  { time: "11:30 - 1:00 PM", title: "Keynote: The Future of AI in Africa" },
  { time: "1:00 - 2:00 PM", title: "Lightning Talks and Demos" },
  {
    time: "2:00 - 3:30 PM",
    title: "Panel Discussion: Women Leading AI Innovation",
  },
  {
    time: "3:30 - 4:30 PM",
    title: "Closing Remarks and Community Celebration",
  },
  { time: "4:30 - 6:00 PM", title: "Networking Lunch" },
];



export const dynamic = "force-dynamic";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await publicService.getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDF2F8] font-dm-sans overflow-x-hidden">
      {/* Header padding for fixed nav */}
      <div className="pt-24 lg:pt-32">
        {/* Back link */}
        <div className="max-w-[1260px] mx-auto px-5 md:px-10 mb-8">
          <Link
            href="/events"
            className="text-pink-600 flex items-center gap-1 font-medium group transition-colors hover:text-pink-700"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back to events</span>
          </Link>
        </div>

        {/* Hero Header Section */}
        <section className="max-w-[1260px] mx-auto px-5 md:px-10 pb-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-start">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-[#1A1A1A] mb-8 font-cal-sans leading-[1.05] tracking-tight">
                {event.title}
              </h1>
              <p className="text-[#3D1A2A] text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl">
                {event.description}
              </p>
            </div>
            
            {/* Event Meta Details */}
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex items-center gap-4 text-[#1A1A1A]">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-pink-600 shadow-[0_4px_20px_rgba(255,182,193,0.3)]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">{event.date || "Date TBA"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#1A1A1A]">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-pink-600 shadow-[0_4px_20px_rgba(255,182,193,0.3)]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">{event.location || "Location TBA"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#1A1A1A]">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-pink-600 shadow-[0_4px_20px_rgba(255,182,193,0.3)]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">{event.time || "Time TBA"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wide Banner Image */}
        <section className="max-w-[1260px] mx-auto px-5 md:px-10 mb-32">
          <div className="relative aspect-[21/9] rounded-[40px] md:rounded-[60px] overflow-hidden border-[12px] border-white shadow-[0_20px_50px_rgba(255,182,193,0.2)]">
            <Image
              src={event.image || "/wh.jpg"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Agenda Section */}
        <section className="py-24 md:py-32 px-5 md:px-10 bg-white">
          <div className="max-w-[1260px] mx-auto">
            <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] mb-16 font-cal-sans">
              Agenda
            </h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {fallbackAgenda.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FDF2F8] p-8 md:p-10 rounded-[32px] flex items-center justify-between transition-all hover:shadow-lg hover:shadow-pink-100/50"
                >
                  <h3 className="text-xl md:text-2xl font-normal text-[#1A1A1A] leading-tight font-cal-sans max-w-[70%]">
                    {item.title}
                  </h3>
                  <div className="bg-white text-pink-600 px-6 py-2.5 rounded-full text-sm font-bold shrink-0 shadow-sm">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Global CTA Section */}
        <CTA />


      </div>
    </div>
  );
}
