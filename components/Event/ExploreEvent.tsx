"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { publicService } from "@/lib/services/public.service";
import { events as EventType } from "@/types/event";

const ExploreEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await publicService.getEvents({ upcoming: true });
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
        <h4 className="py-4">Explore Events</h4>
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-pink-50">
          <p className="text-gray-500">No upcoming events found Check back later</p>
        </div>
      </section>
    );
  }

  return (
    <section className="lg:px-8 pb-4 pt-0 px-4">
      <h4 className="py-4">Explore Events</h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {events.map((event) => (
          <div
            key={event.slug}
            className="p-3 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            {event.image && (
              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={200}
                className="w-full h-64 object-cover rounded-2xl"
              />
            )}

            <div className="p-3">
              <h4 className="font-medium mb-2">{event.title}</h4>

              <p className="text-[#46455F] font-thin text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="text-sm mb-2">
                <div className="flex items-center gap-4 py-2">
                  <Image src="/date.png" alt="date" width={12} height={12} />
                  <p className="font-thin text-[#777777] text-sm">{event.date}</p>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <Image src="/clock.png" alt="time" width={12} height={12} />
                  <p className="font-thin text-[#777777] text-sm">{event.time}</p>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <Image src="/location.png" alt="location" width={12} height={12} />
                  <p className="font-thin text-[#777777] text-sm">{event.location}</p>
                </div>
              </div>

              <Link
                href={`/events/${event.slug}`}
                className="text-[#D62D88] font-medium text-base flex items-center gap-3 mt-4"
              >
                View Detail
                <Image
                  src="/lngarrw.png"
                  alt="arrow"
                  width={22}
                  height={25}
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