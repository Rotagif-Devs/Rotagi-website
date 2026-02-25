"use client";

import Image from "next/image";
import { programs } from "@/data/programs";
import { ProgramProvider, useProgram } from "@/context/ProgramContext";
import LoginForm from "@/components/Login/LoginForm";

function LeftPanel() {
  const { selectedProgram, setSelectedProgram } = useProgram();

  return (
    <div
      // 1. LOCKED LAYOUT
      // overflow-hidden ensures the page never moves or scrolls
      className="hidden lg:flex flex-col w-[47%] p-10 relative  overflow-x-hidden [&::-webkit-scrollbar]:hidden"
      style={{
        background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 60%, #ad1457 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20 bg-white pointer-events-none" />
      <div className="absolute top-20 -right-16 w-64 h-64 rounded-full opacity-10 bg-white pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10 shrink-0">
        <span className="text-white font-black text-xl tracking-widest uppercase">
          ROTAGI
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 mt-5 shrink-0">
        <h3 className="text-white text-3xl font-black w-[270px] leading-tight">
          Your Journey Starts with the Right Pathway
        </h3>
        <p className="text-pink-100 mt-4 text-sm leading-relaxed">
          Guiding African girls and women from curiosity to confidence through
          AI skills and leadership.
        </p>
      </div>

      {/* Program Cards */}
      <div className="relative z-10 mt-10 space-y-3 pb-10">
        {programs.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedProgram(p)}
            // CARD CONTAINER:
            // Grows from 88px to 500px.
            className={`group relative w-full text-left rounded-2xl bg-white shadow-sm overflow-hidden
                        transition-all duration-500 ease-in-out
                        max-h-[88px] hover:max-h-[500px]
                        ${
                          selectedProgram?.id === p.id
                            ? "border-2 border-pink-500 shadow-md"
                            : "border-2 border-transparent hover:border-pink-200"
                        }
                        hover:shadow-xl`}
          >
            {/* 
                1. STATIC IMAGE 
                This sits outside the animation groups.
                It is absolutely positioned and NEVER moves or fades.
            */}
            <div className="absolute top-[9px] left-5 z-20">
              <Image
                src={p.image}
                alt={p.name}
                width={70}
                height={70}
                className="rounded-full border border-gray-100 object-cover w-[70px] h-[70px]"
              />
            </div>

            {/* 
                2. COMPACT TEXT (Visible Default)
                Sits to the RIGHT of the image.
                Fades OUT on hover.
            */}
            <div className="absolute top-0 left-0 w-full h-[88px] flex items-center pl-[105px] pr-4
                            transition-opacity duration-300 ease-in-out
                            opacity-100 group-hover:opacity-0 pointer-events-none">
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-gray-900 leading-snug">
                  {p.name}{" "}
                  <span className="font-bold text-xs text-black">
                    ({p.ages})
                  </span>
                </h4>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {p.description}
                </p>
              </div>
            </div>

            {/* 
                3. EXPANDED TEXT (Visible Hover)
                Sits BELOW the image (using padding-top).
                Fades IN on hover.
            */}
            <div className="relative pt-[90px] px-6 pb-6
                            transition-all duration-500 ease-in-out
                            opacity-0 group-hover:opacity-100">
              <div className="w-full">
                {/* Title repeated here so it appears to 'move' down with the text */}
                <h4 className="font-bold text-base text-gray-900 mb-2">
                  {p.name}{" "}
                  <span className="font-bold text-sm text-black">
                    ({p.ages})
                  </span>
                </h4>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {p.description}
                </p>

                {/* Button */}
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-pink-600 group-hover:text-pink-700">
                  <span>Learn More</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

export default function loginPage() {
  return (
    <ProgramProvider>
      <div className="h-screen w-full flex overflow-hidden">
        <LeftPanel />
        <div className="flex-1 h-full overflow-y-auto bg-white">
            <LoginForm />
        </div>
      </div>
    </ProgramProvider>
  );
}