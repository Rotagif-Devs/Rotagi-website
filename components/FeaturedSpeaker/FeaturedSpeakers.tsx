"use client";
import Image from "next/image";
import { speakers } from "@/types/speaker";

const FeaturedSpeakers = () => {
  return (
    <section className=" py-12 ">
      <div className="w-full">
        <h3 className="text-lg font-medium mb-6">Featured Speakers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
            >
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={500}
                height={300}
                className="rounded-xl w-full object-contain"
              />

              <div className="mt-4">
                <h4 className="font-thin">{speaker.name}</h4>
                <p className=" text-[#4C4C4D] !font-medium !text-sm mt-1">
                  {speaker.description}
                </p>
  
                <div className="flex">
                <p className="mt-4 text-[#4C4C4D] py-2 px-3 font-thin border border-[#4C4C4D] rounded-xl text-base flex ">
                  {speaker.topics}
                </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpeakers;