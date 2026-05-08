"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

const stats = [
  {
    value: "30+",
    label: "African Girls & Women Attended",
  },
  {
    value: "1",
    label: "Day of Inspiration",
  },
  {
    value: "Abuja",
    label: "Nigeria",
  },
];

const galleryImages = [
  "/gl1.png",
  "/gl2.png",
  "/gl3.png",
  "/gl4.png",
  "/gl5.png",
  "/gl6.png",
];

export default function HistorySection() {
  return (
    <section className="bg-[#f6dfe8] px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-medium text-pink-500">
            2021 | Our First Chapter
          </p>

          <h3 className="text-3xl font-semibold uppercase leading-tight text-black md:text-5xl">
            Where It All Began
          </h3>

          <p className="mt-6 leading-7 text-[#373737]">
            In 2021, we brought together 30+ incredible African girls and young
            women in Abuja for the very first SHE Empower Conference. It was a
            day filled with learning, laughter, and connection where dreams were
            shared and friendships were born. This first gathering showed us the
            power of creating space for African girls to rise together. Now, we
            are building on that foundation to create something even more
            transformative in 2026.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {stats.map((item, index) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-[14px] bg-white px-6 py-7 text-center shadow-sm"
            >
              <h3 className="text-4xl font-semibold text-gray-900">
                {item.value}
              </h3>

              <p className="mt-2 text-sm text-[#5D677C]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[14px]"
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                width={700}
                height={500}
                className="h-[190px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Featured Video */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mt-3 overflow-hidden rounded-[18px]"
        >
          <Image
            src="/video.png"
            alt="Featured Event"
            width={1400}
            height={700}
            className="h-[260px] w-full object-cover md:h-[520px]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Play Button */}
         {/* Play Button */}
<button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-sm transition duration-300 hover:scale-110">
  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
    <Play
      size={18}
      className="ml-0.5 text-white"
      fill="white"
    />
  </div>
</button>
        </motion.div>
      </div>
    </section>
  );
}