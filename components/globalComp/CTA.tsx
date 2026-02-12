"use client"; // ← Required because we're using state + event handlers

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react"; // ← Import both icons from lucide-react

export default function CTA() {
  const [isPlaying, setIsPlaying] = useState(true); // Start with autoPlay → playing
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="bg-[var(--color-primary)] py-16 md:py-20 flex justify-center">
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + description + buttons area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="font-cal-sans text-[var(--color-dark)] text-4xl leading-tight tracking-tight md:max-w-[600px] md:text-[46px] md:leading-[110%]">
            Join Us in Empowering the Next Generation
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="font-dm-sans text-[var(--color-darkgray)] text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
              Whether through donations, mentorship, or partnerships — your
              support creates lasting change.
            </p>

            <div className="hidden md:flex gap-4">
              <button className="rounded-full bg-[var(--color-secondary)] px-8 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-white transition hover:bg-[var(--color-tertiary)] whitespace-nowrap">
                Donate Now
              </button>
              <button className="rounded-full border border-gray-200 bg-white px-8 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-[var(--color-dark)] transition hover:bg-gray-50 whitespace-nowrap">
                Explore Programs
              </button>
            </div>
          </div>
        </div>

        {/* Video / hero preview */}
        <div className="flex w-full justify-center">
          <div
            className="group relative w-full overflow-hidden rounded-3xl bg-white md:aspect-[1256/711] md:max-w-[1256px] md:rounded-[64px] aspect-[16/9] cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              // poster="/poster.jpg" // optional
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/Awareness.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay – becomes semi-transparent on hover, clickable to toggle */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/10">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-white/25 backdrop-blur-md transition-all duration-300 group-hover:scale-110 md:h-32 md:w-32 shadow-2xl">
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white md:h-14 md:w-14" />
                ) : (
                  <Play className="h-10 w-10 text-white md:h-14 md:w-14 ml-1" />
                )}
              </div>
            </div>

            {/* Optional: hide native controls completely or show on hover */}
            <style jsx>{`
              video::-webkit-media-controls {
                display: none;
              }
            `}</style>
          </div>
        </div>

        {/* Mobile buttons */}
        <div className="flex gap-4 justify-center md:hidden sm:flex-row">
          <button className="w-full rounded-full bg-[var(--color-secondary)] px-8 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-white transition hover:bg-[var(--color-tertiary)] sm:w-auto">
            Donate Now
          </button>
          <button className="w-full rounded-full border border-gray-200 bg-white px-4 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-[var(--color-dark)] transition hover:bg-gray-50 sm:w-auto">
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
}
