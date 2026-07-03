
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
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">
            <div className="max-w-3xl flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 border border-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Upcoming Event
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-[64px] font-bold text-[#1A1A1A] mb-8 font-cal-sans leading-[1.05] tracking-tight">
                {event.title}
              </h1>
              <div className="bg-white/60 border-l-4 border-pink-500 p-6 rounded-r-2xl shadow-sm backdrop-blur-sm">
                <p className="text-[#3D1A2A] text-lg md:text-xl leading-[1.7] font-medium opacity-90">
                  {event.description}
                </p>
              </div>
            </div>
            
            {/* Event Meta Details Card */}
            <div className="flex flex-col gap-6 bg-white border border-pink-100/50 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(216,27,126,0.08)] lg:w-[380px] w-full shrink-0 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 transition-opacity group-hover:opacity-100" />
              
              <div className="flex items-start gap-5 text-[#1A1A1A] relative z-10">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-pink-50 rounded-2xl text-pink-600 shadow-inner border border-pink-100/60">
                  <Calendar size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-xs font-bold tracking-wider text-pink-500 uppercase">Date</span>
                  <p className="font-semibold text-lg text-gray-900">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 rounded-full relative z-10" />

              <div className="flex items-start gap-5 text-[#1A1A1A] relative z-10">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-pink-50 rounded-2xl text-pink-600 shadow-inner border border-pink-100/60">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-xs font-bold tracking-wider text-pink-500 uppercase">Location</span>
                  <p className="font-semibold text-lg text-gray-900 leading-tight">{event.location || "Location TBA"}</p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 rounded-full relative z-10" />

              <div className="flex items-start gap-5 text-[#1A1A1A] relative z-10">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-pink-50 rounded-2xl text-pink-600 shadow-inner border border-pink-100/60">
                  <Clock size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-xs font-bold tracking-wider text-pink-500 uppercase">Time</span>
                  <p className="font-semibold text-lg text-gray-900">{formatTime(event.time)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wide Banner Image */}
        <section className="max-w-[1260px] mx-auto px-5 md:px-10 mb-20">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] md:rounded-[48px] overflow-hidden border-[8px] border-white shadow-[0_20px_50px_rgba(216,27,126,0.1)] bg-white">
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
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-50">
              <div
                className="prose prose-pink prose-base lg:prose-lg max-w-none w-full break-words
                  prose-headings:font-cal-sans prose-headings:text-[#1A1A1A]
                  prose-p:mb-6 prose-p:text-gray-600 prose-p:leading-[1.8]
                  prose-strong:text-pink-600
                  prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-gray-100
                  prose-a:text-pink-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:text-gray-600 prose-blockquote:border-pink-500 prose-blockquote:bg-pink-50 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:rounded-r-2xl prose-blockquote:italic"
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
