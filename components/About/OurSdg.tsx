"use client";
import React from "react";
import Image from "next/image";

const OurSdg = () => {
  const sdgData = [
    {
      title: "Quality Education",
      description:
        "Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities",
      icon: "/Qualityeducation.png",
      ringColor: "border-pink-200",
    },
    {
      title: "Gender Equality",
      description:
        "Achieving gender equality and empowering all women and girls in the technology sector",
      icon: "/Genderquality.png",
      ringColor: "border-orange-200",
    },
    {
      title: "Decent Work & Economic Growth",
      description:
        "Promoting sustained inclusive economic growth and productive employment for young women",
      icon: "/Decentwork.png",
      ringColor: "border-gray-200",
    },
    {
      title: "Partnerships for the Goals",
      description:
        "Building strategic alliances with organisations and institutions to advance digital inclusion and expand ROTAGI's reach across Africa.",
      icon: "/Partnership.png",
      ringColor: "border-gray-200",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2>Our SDG Impact</h2>
        <div className="h-1.5 w-24 bg-[#d6448d] mx-auto rounded-full"></div>
      </div>
  
      {/* Changed from grid to flex with wrap and centering */}
      <div className="flex flex-wrap justify-center gap-10">
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
  
            <h3 className="text-lg">{item.title}</h3>
  
            <p className="leading-relaxed max-w-xs">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default OurSdg;