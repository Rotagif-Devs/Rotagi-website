import Empower from "@/components/About/Empower";
import OurMission from "@/components/About/OurMission";
import OurSdg from "@/components/About/OurSdg";
import OurStory from "@/components/About/OurStory";
import OurValue from "@/components/About/OurValue";

import Image from "next/image";

const About = () => {
  const teamData = [
    {
      name: "Amara K.",
      role: "Founder",
      image: "/Amara.png",
    },
    {
      name: "Fatima D.",
      role: "Co. Founder",
      image: "/Fatima.png",
    },
    {
      name: "Lola Jay",
      role: "Outreach",
      image: "/Lola.png",
    },
    {
      name: "Zara David",
      role: "Outreach",
      image: "/zara.png",
    },
  ];

  return (
    <section className="w-full mx-auto py-8">
      <Empower />
      <OurStory />
      <OurMission />
      <OurValue />
      <OurSdg />

      <section className="bg-[#d6448d] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">
              The Visionaries
            </h2>

            <div className="h-1.5 w-24 bg-white mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl py-10 px-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-pink-300">
              {teamData.map((member, index) => (
                <div key={index} className="flex flex-col items-center p-4">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={1500}
                      height={1000}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
