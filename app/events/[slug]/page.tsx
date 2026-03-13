"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { events } from "@/types/event";
import FeaturedSpeakers from "@/components/FeaturedSpeaker/FeaturedSpeakers";
import CTA from "@/components/globalComp/CTA";

export default function EventDetails() {
  const { slug } = useParams<{ slug: string }>();

  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return <div className="p-10 text-center">Event not found</div>;
  }

  return (
    <main className="min-h-screen bg-[#e8d6db] py-10 sm:py-14 lg:py-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="text-sm text-[#121212] inline-block mb-8"
        >
          ← Back to events
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Back */}
          <div>
            <h1 className="mg!text-8xl font-bold leading-tight mb-6 md:w-[70%] w-full">
              {event.title}
            </h1>
            <p className="text-[#121212] !text-sm font-thin leading-relaxed">
              Join us for the premier AI conference in West Africa. The AI
              Futures Summit brings together thought leaders, practitioners, and
              students to explore how artificial intelligence is shaping the
              future of our continent. Experience inspiring keynotes,
              interactive workshops, and meaningful connections with the African
              AI community.
            </p>
          </div>

          {/* Hero */}
          <div className="flex justify-start lg:flex w-full lg:justify-end ">
            {/* EVENT INFO */}
            <div className="text-sm mb-2">
              {event.schedule?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-2">
                  <Image src={item.image} alt="icon" width={12} height={12} />

                  <p className="font-thin text-[#777777] text-sm">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EVENT IMAGE */}
        {event.image && (
          <div className="mt-10 sm:mt-12 lg:mt-16">
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[450px] lg:h-[500px]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        )}

        {/* SPEAKERS */}
        <div className="">
          <FeaturedSpeakers />
        </div>

        {/* CTA */}
        <div className="">
          <CTA />
        </div>
      </div>
    </main>
  );
}
