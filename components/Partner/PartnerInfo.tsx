"use client";

import Image from "next/image";
import Button from "../ui/Button";
import VideoPlayer from "../globalComp/Videoplayer";


const images = [
  { src: '/Community.png', alt: 'Community gathering' },
  { src: '/Workgroup.png', alt: 'Students with signs' },
  { src: '/Workshop.png', alt: 'Workshop group' },
  { src: '/Healtheducation.png', alt: 'Health education' },
  { src: '/Distribution.png', alt: 'Distribution event' },
  { src: '/Youngwomen.png', alt: 'Young women workshop' },
];

const PartnerInfo = () => {
  return (
    <section className="bg-[#fce4ec] py-16 px-6 md:px-12 lg:px-24 text-center overflow-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Partner with ROTAGI?
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
        ROTAGI is on a mission to ensure that African girls and young women are not left behind as technology and AI reshape the global economy. A partnership with ROTAGI means investing directly in that mission and in the next generation of African women in atech, business, and leadership. 
        </p>
      </div>

      {/* Grid Container */}
      <div className="relative mt-20 max-w-5xl mx-auto">
        
        {/* Decorative Doodles (Matching your reference image) */}
        <span className="absolute -top-10 left-[20%] text-pink-400 text-5xl transform -rotate-12 opacity-60">✧</span>
        <span className="absolute top-[10%] -right-5 text-pink-400 text-5xl opacity-60">✧</span>
        <span className="absolute -bottom-5 -left-5 text-pink-400 text-5xl opacity-60">✧</span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-4xl shadow-lg transition-transform hover:scale-[1.03]
                ${index === 1 || index === 4 ? "lg:-mt-12" : ""} // Pushes the middle column images up
              `}
              style={{ aspectRatio: '207 / 240' }} // Forces the exact shape you requested
            >
              <Image
                src={img.src}
                alt={img.alt}
                
                height={1000}
                width={1500}
                className=""
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
    
    </section>
  );
};

export default PartnerInfo;