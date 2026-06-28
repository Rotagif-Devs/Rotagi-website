
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, MapPin } from "lucide-react";
import PTA from "@/components/globalComp/PTA";
import { publicService } from "@/lib/services/public.service";
import { notFound } from "next/navigation";





export const dynamic = "force-dynamic";

const formatTime = (timeStr: string) => {
  if (!timeStr) return "Time TBA";
  try {
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(timeStr)) {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    }
  } catch(e) {}
  return timeStr;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "Date TBA";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

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
                  <p className="font-bold text-base">{formatDate(event.date)}</p>
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
                  <p className="font-bold text-base">{formatTime(event.time)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wide Banner Image */}
        <section className="max-w-[1260px] mx-auto px-5 md:px-10 mb-20">
          <div className="relative aspect-[21/9] rounded-[40px] md:rounded-[60px] overflow-hidden border-[12px] border-white shadow-[0_20px_50px_rgba(255,182,193,0.2)] bg-white">
            <Image
              src={event.image || "/wh.jpg"}
              alt={event.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* Content Section */}
        {((event as any).content || (event as any).body) && (
          <section className="max-w-[1260px] mx-auto px-5 md:px-10 mb-32">
            <div className="max-w-4xl">
              <div
                className="prose prose-pink prose-base lg:prose-lg max-w-none w-full break-words
                  prose-headings:font-cal-sans prose-headings:text-[#1A1A1A]
                  prose-p:mb-5 prose-p:text-[#3D1A2A] prose-p:leading-relaxed
                  prose-strong:text-pink-700
                  prose-img:rounded-2xl prose-img:shadow-md
                  prose-a:text-pink-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: (event as any).content || (event as any).body }}
              />
            </div>
          </section>
        )}





        {/* Global CTA Section */}
        <div className="bg-white border-t border-gray-100">
          <PTA />
        </div>


      </div>
    </div>
  );
}
