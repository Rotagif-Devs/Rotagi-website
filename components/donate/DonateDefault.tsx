"use client";

import Image from "next/image";

type Props = {
  onNext: () => void;
};

const DonateDefault = ({ onNext }: Props) => {
  const donateTransformData = [
    {
      title: "Skills for the Future",
      description:
        "Funds both on site and virtual hands on training in Artificial Intelligence and digital tools equipping girls with practical skills for real world problem solving.",
      img: "/future.svg", // Ensure this references your pink round icon
    },
    {
      title: "Mentorship & Leadership",
      description:
        "Connects African girls and young women with mentors who support their growth, career direction, and the confidence to lead.",
      img: "/mentorship.svg", // Ensure this references your pink round icon
    },
    {
      title: "Access to Tools & Resources",
      description:
        "Provides resources from laptops and internet access to Artificial Intelligence subscriptions and digital tools so that cost is never a barrier to learning.",
      img: "/resources.svg", // Ensure this references your pink round icon
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Main Section Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl  uppercase tracking-tight text-[#1A1A1A] mb-16 md:mb-20 font-cal-sans">
          How Your Donation Transforms Lives
        </h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 w-full max-w-6xl mb-16">
          {donateTransformData.map((data) => (
            <div
              className="flex flex-col items-center text-center px-4"
              key={data.title}
            >
              {/* Rounded White Icon Container with Subtle Shadow */}
              <div className="w-30 h-30 rounded-full bg-white  flex items-center justify-center mb-6 ">
                <Image
                  src={data.img}
                  alt={data.title}
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg md:text-xl text-[#1A1A1A] mb-4 font-cal-sans">
                {data.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 font-dm-sans text-sm md:text-base leading-relaxed max-w-sm">
                {data.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mid-text Footer Quote */}
        <p className="text-gray-500 font-dm-sans text-sm md:text-base mb-8">
          Back the African girl who will build the future.
        </p>

        {/* Action Button */}
        <button
          className="w-full sm:w-[280px] px-8 py-4 bg-[#D12B83] hover:bg-[#b82170] text-white font-semibold rounded-full transition-all shadow-md cursor-pointer text-sm md:text-base"
          onClick={onNext}
        >
          Donate Now
        </button>

      </div>
    </section>
  );
};

export default DonateDefault;