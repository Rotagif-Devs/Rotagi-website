"use client";

import Image from "next/image";
import { programs } from "@/data/programs";
import { useProgram } from "@/context/ProgramContext";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function LeftPanel() {
  const { selectedProgram, setSelectedProgram } = useProgram();

  return (
    <div
      className="lg:flex flex-col lg:w-[47%] h-157 w-full mt-10 lg:mt-0 p-10 relative overflow-x-hidden lg:overflow-y-scroll overflow-hidden [&::-webkit-scrollbar]:hidden"
      style={{
        background:
          "linear-gradient(135deg, #e91e8c 0%, #c2185b 60%, #ad1457 100%)",
      }}
    >
     
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20 bg-white pointer-events-none" />
      <div className="absolute top-20 -right-16 w-64 h-64 rounded-full opacity-10 bg-white pointer-events-none" />


      <div className="relative z-10 shrink-0">
        <h3 className="text-white tracking-widest uppercase">ROTAGI</h3>
      </div>

      <div className="relative z-10 mt-5 shrink-0">
        <h3 className="text-white w-67.5">
          Your Journey Starts with the Right Pathway
        </h3>
        <p className="text-pink-100 mt-4">
          Guiding African girls and women from curiosity to confidence through AI skills and leadership.
        </p>
      </div>

      {/* ---------------- MOBILE SWIPER ---------------- */}
      <div className="lg:hidden relative z-10 mt-10">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".program-prev",
            nextEl: ".program-next",
          }}
          slidesPerView={1}
          spaceBetween={16}
          className="pb-10"
        >
          {programs.map((p) => (
            <SwiperSlide key={p.id}>
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 h-64"> {/* fixed height */}
  {/* Header */}
  <div className="flex items-center gap-3">
    <Image
      src={p.image}
      alt={p.name}
      width={50}
      height={50}
      className="rounded-full w-20 h-20"
    />
    <div>
      <h4 className="font-bold text-gray-900 text-sm">{p.name}</h4>
      <p className="text-gray-500 text-xs">{p.ages}</p>
    </div>
  </div>

  {/* Half description */}
  <p className="text-gray-500 text-sm line-clamp-3"> {/* limits text to 3 lines */}
    {p.description.slice(0, Math.ceil(p.description.length / 2))}...
  </p>

  {/* Learn More button */}
  <Link
    href={`/programs/${p.slug}`}
    className="mt-2 self-start text-secondary px-4 py-2 text-sm font-semibold hover:bg-pink-600 transition"
  >
    Learn More &rarr;
  </Link>
</div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="mt-4 flex justify-end gap-4">
          <button className="program-prev rounded-full bg-[#D62D882E] p-3 text-white border border-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="program-next rounded-full bg-[#D62D882E] p-3 text-white border border-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden lg:block relative z-10 mt-10 space-y-3 pb-10">
        {programs.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedProgram(p)}
            className={`group relative w-full text-left rounded-2xl bg-white shadow-sm overflow-hidden
                        transition-all duration-500 ease-in-out
                        max-h-22 hover:max-h-125
                        ${
                          selectedProgram?.id === p.id
                            ? "border-2 border-pink-500 shadow-md"
                            : "border-2 border-transparent hover:border-pink-200"
                        }
                        hover:shadow-xl`}
          >
            {/* Image */}
            <div className="absolute top-2.25 left-5 z-20">
              <Image
                src={p.image}
                alt={p.name}
                width={70}
                height={70}
                className="rounded-full border border-gray-100 object-cover w-17.5 h-17.5"
              />
            </div>

            {/* Collapsed View */}
            <div
              className="absolute top-0 left-0 w-full h-22 flex items-center pl-26.25 pr-4
                            transition-opacity duration-300 ease-in-out
                            opacity-100 group-hover:opacity-0 pointer-events-none"
            >
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 leading-snug">
                  {p.name} <span className="font-bold text-black">({p.ages})</span>
                </h4>
                <p className="text-gray-500 truncate mt-0.5">{p.description}</p>
              </div>
            </div>

            {/* Expanded View */}
            <div
              className="relative pt-22.5 px-6 pb-6
                            transition-all duration-500 ease-in-out
                            opacity-0 group-hover:opacity-100"
            >
              <div className="w-full">
                <h4 className="font-bold text-gray-900 mb-2">
                  {p.name} <span className="font-bold text-black">({p.ages})</span>
                </h4>
                <p className="text-gray-600 leading-relaxed">{p.description}</p>
                <div className="mt-4 flex items-center gap-2 font-semibold text-pink-600 group-hover:text-pink-700">
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}