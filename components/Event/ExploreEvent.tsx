"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { publicService } from "@/lib/services/public.service";
import { events as EventType } from "@/types/event";

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

const ExploreEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await publicService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="lg:px-8 pb-4 pt-0 px-4 min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D62D88]"></div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="lg:px-8 pb-10 pt-0 px-4">
        <h4 className="py-4 font-cal-sans text-2xl text-black">Explore Events</h4>
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-pink-50">
          <p className="text-gray-500">No upcoming events found Check back later</p>
        </div>
      </section>
    );
  }

  return (
    <section className="lg:px-8 pb-10 pt-0 px-4 max-w-7xl mx-auto">
      <h4 className="py-6 font-cal-sans text-3xl md:text-4xl text-black">Explore Events</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.slug}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative overflow-hidden h-[220px]">
              {event.image && (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex flex-col p-6 gap-4 flex-1">
              <h3 className="text-black font-cal-sans text-xl capitalize leading-8 line-clamp-2">
                {event.title}
              </h3>

              <p className="text-gray-600 font-dm-sans text-sm leading-relaxed line-clamp-2">
                {event.description}
              </p>

              <div className="text-sm mt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <Image src="/date.png" alt="date" width={16} height={16} />
                  <p className="font-thin text-[#777777] text-sm">{formatDate(event.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="/clock.png" alt="time" width={16} height={16} />
                  <p className="font-thin text-[#777777] text-sm">{formatTime(event.time)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="/location.png" alt="location" width={16} height={16} />
                  <p className="font-thin text-[#777777] text-sm truncate">{event.location}</p>
                </div>
              </div>

              <Link
                href={`/events/${event.slug}`}
                className="mt-auto pt-4 flex items-center gap-4 text-[#D62D88] font-semibold font-dm-sans group-hover:gap-6 transition-all"
              >
                View Detail
                <Image
                  src="/lngarrw.png"
                  alt="arrow"
                  width={22}
                  height={25}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreEvent;