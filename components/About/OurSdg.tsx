"use client";
import React from "react";
import Image from "next/image";

const OurSdg = () => {
  const sdgData = [
    {
      title: "Quality Education",
      icon: "/Qualityeducation.png",
      ringColor: "border-pink-200",
    },
    {
      title: "Gender Equality",
 
      icon: "/Genderquality.png",
      ringColor: "border-orange-200",
    },
    {
      title: "Decent Work & Economic Growth",
    
      icon: "/Decentwork.png",
      ringColor: "border-gray-200",
    },
    {
      title: "Partnerships for the Goals",
      icon: "/Partnership.png",
      ringColor: "border-gray-200",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2>OUR SDG IMPACT</h2>

      </div>
  
      <div className="flex flex-col md:flex-row justify-center gap-10">
        {sdgData.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center basis-full md:basis-[calc(33.333%-2.5rem)]"
          >
            <div className="mb-6">
              <div className="overflow-hidden lg:w-24 lg:h-24 w-20 h-20 relative">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
  
            <h3 className="text-sm">{item.title}</h3>
  
            
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default OurSdg;