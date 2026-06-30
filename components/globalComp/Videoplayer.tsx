"use client"; // ← Required because we're using state + event handlers
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react"; // ← Import both icons from lucide-react

const VideoPlayer = () => {
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
    <div className="flex w-full justify-center">
      <div
        className="group relative w-full overflow-hidden rounded-3xl bg-white md:aspect-[1256/711] md:max-w-full md:rounded-[64px] aspect-[16/9] cursor-pointer"
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
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/10 ${
            isPlaying ? "md:opacity-0 md:group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/25 backdrop-blur-md transition-all duration-300 group-hover:scale-110 md:h-24 md:w-24 shadow-2xl">
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white md:h-10 md:w-10" />
            ) : (
              <Play className="h-5 w-5 text-white md:h-10 md:w-10 ml-1" />
            )}
          </div>
        </div>

        {/* Optional: hide native controls completely or show on hover */}
        <style jsx>{`
          video::-webkit-media-controls {
            display: none;
          }
        `}</style>

        {/* Optional: hide native controls completely or show on hover */}
        <style jsx>{`
          video::-webkit-media-controls {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default VideoPlayer;
