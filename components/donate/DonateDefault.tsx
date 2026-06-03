"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  onNext: () => void;
};

const DonateDefault = ({ onNext }: Props) => {
  const donateTransformData = [
    {
      title: "AI & Digital Skills Training",
      description:
        "Your support funds both on-site and virtual hands-on training that equips girls with practical AI and digital skills for real world problem solving.",
      img: "/Video.png",
    },
    {
      title: "Mentorship & Leadership Development",
      description:
        "Connects African girls and women with mentors and role models who support their personal growth, career direction, and leadership confidence.",
      img: "/Community.png",
    },
    {
      title: "Access to Tools & Resources",
      description:
        "Provides learning resources such as laptops, internet access, and digital tools needed to participate and succeed.",
      img: "/Workshop.png",
    },
  ];

  return (
    <div className="mb-20">
      <div className="flex flex-col justify-center items-center text-center bg-white py-16 lg:py-20 rounded-2xl">
        <h2 className="text-4xl md:text-5xl font-cal-sans font-bold">
          How Your Donation Transforms Lives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8 md:m-12 w-full">
          {donateTransformData.map((data) => (
            <div
              className="flex flex-col items-center text-center space-y-4"
              key={data.title}
            >
              <Image
                src={data.img}
                alt={data.title}
                width={90}
                height={90}
                className="object-contain"
              />

              <h4 className="!font-medium">{data.title}</h4>

              <p className="text-gray-600 max-w-sm">{data.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 max-w-2xl text-center font-dm-sans text-gray-700 px-6">
          Unlock opportunities for African girls through AI literacy, digital skills, and mentorship. Your gift creates long-term change.
        </div>

        <button
          className="w-full md:w-[320px] px-6 py-3 mb-10 bg-[#D81B7E] text-white rounded-full hover:bg-pink-700 transition cursor-pointer"
          onClick={onNext}
        >
          Donate Now
        </button>

        <div className="mb-5 flex flex-col md:flex-row items-center text-base gap-2">
          Looking to partner or sponsor at scale?
          <span className="text-[#D81B7E] text-base flex items-center">
            <Link href="/partner">Partner with us</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DonateDefault;
