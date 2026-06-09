"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import Button from "../ui/Button";
import WaitlistModal from "../globalComp/WaitlistModal";

export default function ProgramsCTA() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <section className="bg-primary py-16 flex justify-center">
      <div className="flex w-full max-w-11/12 flex-col gap-10 md:px-0 md:gap-[76px]">
        {/* Title + description + buttons area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="font-cal-sans text-dark text-4xl leading-tight tracking-tight md:max-w-[600px] md:text-[46px] md:leading-[110%]">
            LOOKING FOR FLEXIBLE LEARNING?
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="font-dm-sans text-darkgray text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
     ROTAGI self paced courses in Artificial Intelligence, Digital Skills, and Life Skills are coming soon. 
            </p>

            <div className="hidden md:flex gap-4">
              <Button 
                variant="primary" 
                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>

        {/* Video / hero preview */}
        <div className="flex w-full justify-center">
          <div
            className="group relative w-full overflow-hidden rounded-3xl bg-white md:aspect-1256/711 md:rounded-[64px] aspect-video cursor-pointer"
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
          <Button
            variant="primary"
            className="text-center text-sm"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
          >
            Join Waitlist
          </Button>
        </div>
      </div>
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
