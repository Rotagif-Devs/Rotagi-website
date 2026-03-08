"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  onNext: () => void;
};

const DonateDefault = ({ onNext }: Props) => {
  const donateTransformData = [
    {
      title: "AI & Digital Skill Training",
      description:
        "Funds go directly into programs that equip girls with hands-on experience in AI and digital problem-solving.",
      img: "/icons2.png",
    },
    {
      title: "Mentorship & Leadership Development",
      description:
        "Your support allows young women to connect with mentors and leaders who guide them in career planning, personal growth, and leadership opportunities.",
      img: "/icons4.png",
    },
    {
      title: "Access to Tools & Resources",
      description:
        "Donation provides essential learning materials such as laptops, internet access, and digital toolkits.",
      img: "/icons3.png",
    },
  ];

  return (
    <div className="mb-20">
      <div className="flex flex-col justify-center items-center text-center bg-white py-15">
        <h2 className="text-3xl font-medium">
          How Your Donation Transforms Lives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-10">
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

        <button
          className="w-[50%] px-6 py-3 my-10 bg-[#D62D88] text-white rounded-full hover:bg-pink-600 transition cursor-pointer"
          onClick={onNext}
        >
          Donate Now
        </button>

        <div className="mb-5 flex flex-col md:flex-row items-center text-base">
          Looking to collaborate at large scale?
          <span className="text-[#D62D88] text-base flex items-center">
            <Image
              src="/fwdArrow.png"
              alt="forward-arrow"
              width={25}
              height={25}
              className="object-contain"
            />
            <Link href="/">Partner with us</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DonateDefault;