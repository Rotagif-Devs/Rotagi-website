"use client";

import React from 'react';
import Image from 'next/image';

const mergData = [
  {
    title: 'Measurable Social Impact',
    description: 'Delivering programmes with measurable outcomes across education, employment, entrepreneurship, and leadership for our graduates.',
    imageSrc: '/measurable.png',        // Desktop image
    mobileImageSrc: '/measurable.png', // Your smaller mobile image asset
    altText: 'Letter M graphic',
  },
  {
    title: 'Equitable Access & Inclusion',
    description: 'Removing barriers to ensure inclusive digital, AI, and life-skills education reaches every African girl.',
    imageSrc: '/Equitable.png',        // Desktop image
    mobileImageSrc: '/Equitable.png', // Your smaller mobile image asset
    altText: 'Letter E graphic',
  },
  {
    title: 'Responsible Innovation',
    description: 'Equipping girls with practical AI skills while promoting safe, responsible technology use.',
    imageSrc: '/Responsible.png',
    mobileImageSrc: '/Responsible.png',
    altText: 'Letter R graphic',
  },
  {
    title: 'Gender Equality & Confident Leadership',
    description: 'Strengthening leadership and empowerment to enable African girls and young women to lead in digital spaces.',
    imageSrc: '/Gender.png',
    mobileImageSrc: '/Gender.png',
    altText: 'Letter G graphic',
  },
];

const CoreValues = () => {
  return (
    <section className="bg-[#fce4ec] py-16 px-6 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl text-gray-900 mb-4 font-bold">
            THE MERG FRAMEWORK
          </h2>
        </div>

        {/* ==========================================
            DESKTOP VIEW (Your existing layout)
           ========================================== */}
        <div className="hidden md:flex flex-col gap-5 w-full">
          {mergData.map((item, index) => (
            <div 
              key={index} 
              className="flex bg-white rounded-[24px] overflow-hidden min-h-[140px] shadow-sm"
            >
              <div className="w-32 relative shrink-0">
                <Image 
                  src={item.imageSrc} 
                  alt={item.altText}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              
              <div className="p-6 flex flex-col justify-center flex-1">
                <h3 className="text-[20px] font-bold text-black mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ==========================================
            MOBILE VIEW (Matches your exact screenshot)
           ========================================== */}
        <div className="flex md:hidden flex-col gap-8 w-full max-w-sm mx-auto">
          {mergData.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center w-full relative"
            >
              {/* Mobile-specific Smaller Image Graphic */}
              <div className="w-[104px] h-[104px] relative shrink-0 z-10 ">
                <Image 
                  src={item.mobileImageSrc} 
                  alt={item.altText}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
              

              <div className="bg-white rounded-r-[40px] rounded-t-[40px] rounded-tl-none p-6 pt-7 pl-8 flex flex-col justify-center flex-1 min-h-[160px]">
                <h3 className="text-[18px] font-bold text-black mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#555555] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreValues;