import React from "react";
import Image from "next/image";
const OurSdg = () => {
  const sdgData = [
    {
      title: "Quality Education",
      description:
        "Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities.",
      icon: "/SDG4.svg",
      ringColor: "border-pink-200",
    },
    {
      title: "Gender Equality",
      description:
        "Achieving gender equality and empowering all women and girls in the technology sector.",
      icon: "/SDG5.svg",

      ringColor: "border-orange-200",
    },
    {
      title: "Decent Work & Growth",
      description:
        "Promoting sustained, inclusive economic growth and productive employment for young women.",
      icon: "/SDG8.svg",

      ringColor: "border-gray-200",
    },
  ];
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-black mb-2">Our SDG Impact</h2>

          <div className="h-1.5 w-24 bg-[#d6448d] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {sdgData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`mb-6 `}>
                <div className="rounded-full overflow-hidden w-24 h-24 relative">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed max-w-xs">
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
