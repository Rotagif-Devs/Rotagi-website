"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  {
    value: "30+",
    label: "African girls & Women Attended",
  },
  {
    value: "1",
    label: "Day of Inspiration ",
  },
  {
    value: "1",
    label: "City | Abuja, Nigeria",
  },
];

const galleryImages = [
  "/sheone.png",
  "/shetwo.png",
  "/shethree.png",
  "/shefour.png",
  "/shefive.png",
  "/shesix.png",
];

export default function HistorySection() {
  return (
    <section className="bg-primary px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-12 mt-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold tracking-wider uppercase text-[#D62D88]">
2021 | Our First Chapter           </p>

          <h2 className="text-3xl uppercase leading-[1.1] text-black md:text-5xl">
            Where It All Began
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#373737]">
            <p className="my-8">
             In 2021, ROTAGI hosted the first SHE Empower Conference in Abuja, bringing together 30 young African girls and women for a powerful day of learning, connection, and inspiration. </p>
            <p className="my-8">
From inspiring talks to hands on learning and unforgettable moments, our first conference showcased what happens when girls are given the tools, confidence, and community to thrive. In a room of 30 young African women in Abuja, Nigeria, something changed  and the ROTAGI movement took its first bold step forward.
</p>
            <p className="my-8">
We have seen the impact these moments create  and we are only just getting started.</p>
        
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
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
              className="rounded-[14px] bg-white border border-gray-100 px-6 py-8 text-center"
            >
              <h3 className="text-5xl text-black">
                {item.value}
              </h3>

              <p className="mt-2 text-sm text-[#5D677C]">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              viewport={{ once: true }}
              className="relative w-full h-[18rem] overflow-hidden rounded-2xl "
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                fill
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Featured Video / Main Banner image */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl shadow-sm"
        >
          <Image
            src="/wh.jpg"
            alt="Featured Event"
            width={1400}
            height={700}
            className="h-[260px] w-full object-cover md:h-[500px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
