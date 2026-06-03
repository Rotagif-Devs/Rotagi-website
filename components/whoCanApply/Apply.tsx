"use client";
import Image from "next/image";
import React, { useRef, useState } from 'react';
import { Pause, Play, User } from 'lucide-react';
import Button from '../ui/Button';

const categories = [
  {
    title: "Educators",
    description: "Teachers, professors, and trainers with expertise in technology and education.",
    side: "left"
  },
  {
    title: "Technical Professionals",
    description: "Software engineers, data scientists, AI researchers, product managers, and other tech professionals with 2+ years of experience.",
    side: "left"
  },
  {
    title: "Industry Veterans",
    description: "Experienced professionals looking to give back and shape the next generation.",
    side: "right"
  },
  {
    title: "Entrepreneurs",
    description: "Tech founders and business leaders who can share insights on innovation and entrepreneurship.",
    side: "right"
  }
];

export default function WhoCanApply() {
  const leftCards = categories.filter(c => c.side === 'left');
  const rightCards = categories.filter(c => c.side === 'right');

  const [isPlaying, setIsPlaying] = useState(true);
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
    <section className=" py-20 px-6">
      <div className="max-w-6xl mx-auto">
    
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Can Apply</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Open to professionals and educators passionate about mentoring and empowering others.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-24">
          
      
          <div className="space-y-6">
            {leftCards.map((card, i) => (
              <CategoryCard key={`left-${i}`} {...card} />
            ))}
          </div>

          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/head-phone.png"
              alt="Empowering African girls to lead in the digital world"
              fill
              priority
              sizes="100vw, 1400px"
              className="object-cover object-center"
            />
          </div>

        
          <div className="space-y-6">
            {rightCards.map((card, i) => (
              <CategoryCard key={`right-${i}`} {...card} />
            ))}
          </div>
        </div>

     
        
        <div className="flex flex-col md:flex-row justify-between  gap-8">
   
          <div className="max-w-md">
            <h2 className="text-4xl  mb-3 text-gray-900 leading-tight normal-case">
              Ready to Make a <br /> Difference?
            </h2>
          </div>

       
          <div className="flex flex-col items-start md:items-end text-left md:text-left">
            <p className="text-gray-600  md:w-[670px]">
              Join our community of mentors and help shape the future of African women in technology.
            </p>
            <Button
              variant="primary"
              className="mt-3 bg-[#D81B7E] hover:bg-pink-700 text-white px-8 py-3 rounded-full"
            >
              Apply to Mentor
            </Button>
          </div>
        </div>
      </div>

     
        <div className="flex w-full justify-center mt-24">
          <div
            className="group relative w-full overflow-hidden rounded-3xl bg-white md:aspect-1256/711 md:max-w-[1256px] md:rounded-[64px] aspect-video cursor-pointer"
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

            
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/10">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-white/25 backdrop-blur-md transition-all duration-300 group-hover:scale-110 md:h-32 md:w-32 shadow-2xl">
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white md:h-14 md:w-14" />
                ) : (
                  <Play className="h-10 w-10 text-white md:h-14 md:w-14 ml-1" />
                )}
              </div>
            </div>

            <style jsx>{`
              video::-webkit-media-controls {
                display: none;
              }
            `}</style>
          </div>
        </div>

    </section>
  );
}

function CategoryCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-[#D81B7E] rounded-lg flex items-center justify-center mb-6">
        <User className="text-white w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
