"use client";
import Link from "next/link";
import Image from "next/image";
import { events } from "@/types/event";

const ExploreEvent = () => {
  return (
    <section className="lg:px-8 pb-4 pt-0 px-4">
      <h4 className="py-4">Explore Events</h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {events.map((event) => (
          <div
            key={event.slug}
            className="p-3 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={400}
              height={200}
              className="w-full object-cover rounded-2xl"
            />

            <div className="p-3">
              <h4 className="font-medium mb-2">{event.title}</h4>

              <p className="text-[#46455F] font-thin text-sm mb-4">
                {event.description}
              </p>

              <div className="text-sm mb-2">
                {event.schedule?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-2"
                  >
                    <Image
                      src={item.image}
                      alt="icon"
                      width={12}
                      height={12}
                    />

                    <p className="font-thin text-[#777777] text-sm">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={`/events/${event.slug}`}
                className="text-[#D62D88] font-medium text-base flex items-center gap-3"
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