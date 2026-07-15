import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, MapPin, Share2 } from "lucide-react";
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
    <div className="min-h-screen bg-[#FAFAFA] font-dm-sans overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      
      {/* Cinematic Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px] flex items-end pb-12 md:pb-24 pt-32">
        <Image
          src={event.image || "/wh.jpg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}
        
        <div className="relative z-10 max-w-[1260px] mx-auto w-full px-5 md:px-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/20"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to all events
          </Link>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-pink-500/30">
              Upcoming Event
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-cal-sans leading-[1.1] tracking-tight drop-shadow-lg">
              {event.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-md">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Sidebar */}
      <section className="max-w-[1260px] mx-auto px-5 md:px-10 py-16 md:py-24 relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Rich Text Content */}
          <div className="flex-1 min-w-0 w-full">
            {((event as any).content || (event as any).body) ? (
              <div
                className="prose prose-lg md:prose-xl max-w-none prose-headings:font-cal-sans prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-[1.8] prose-a:text-pink-600 hover:prose-a:text-pink-700 prose-img:rounded-3xl prose-img:shadow-2xl prose-strong:text-gray-900 prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: (event as any).content || (event as any).body }}
              />
            ) : (
              <div className="text-gray-500 italic text-lg">No additional details provided.</div>
            )}
          </div>

          {/* Right Column: Sticky Details Card */}
          <div className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-32">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 p-8 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-8 relative overflow-hidden">
              {/* Subtle top glare */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
              
              <h3 className="font-cal-sans text-2xl font-bold text-gray-900">Event Details</h3>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 border border-gray-100 transition-colors group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-100">
                    <Calendar size={22} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Date</span>
                    <p className="font-semibold text-lg text-gray-900">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 border border-gray-100 transition-colors group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-100">
                    <Clock size={22} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Time</span>
                    <p className="font-semibold text-lg text-gray-900">{formatTime(event.time)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 border border-gray-100 transition-colors group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-100">
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Location</span>
                    <p className="font-semibold text-lg text-gray-900 leading-tight">{event.location || "Location TBA"}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
                <Link
                  href="/donate"
                  className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-bold text-center transition-all shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Support our cause
                </Link>
                
                <button
                  className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl font-semibold text-center transition-colors border border-gray-200 flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Share Event
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Global CTA Section */}
      <div className="bg-white border-t border-gray-100">
        <PTA />
      </div>

    </div>
  );
}
