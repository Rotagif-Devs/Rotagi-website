"use client";

import Image from "next/image";

const PartnerInfo = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-6 font-cal-sans uppercase">
            Why Partner with ROTAGI?
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            ROTAGI is on a mission to ensure that African girls and young women are not left behind as technology and AI reshape the global economy. A partnership with ROTAGI means investing directly in that mission — and in the next generation of African women in tech, business, and leadership.
          </p>
        </div>

        {/* Image side */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/Workgroup.png"
            alt="Women collaborating at ROTAGI"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default PartnerInfo;