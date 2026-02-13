import Image from "next/image";

const pillars = [
  {
    icon: "/mission-icon-1.svg",
    title: "Mindset",
    subtitle: "Confidence & Leadership",
    desc: "Building self-belief and leadership skills through mentorship and workshops.",
  },
  {
    icon: "/mission-icon-2.svg",
    title: "Skillset",
    subtitle: "Practical Digital Tech Training",
    desc: "Hands-on programs in digital design, entrepreneurship, and real-world problem-solving.",
  },
  {
    icon: "/mission-icon-3.svg",
    title: "Future-Set",
    subtitle: "Essential AI Literacy",
    desc: "Equipping African girls with AI skills to innovate, lead, and thrive globally.",
  },
];

export default function Mission() {
  return (
    <section className="py-24 bg-primary px-10 lg:px-8">
      <div className="mx-auto flex flex-col items-center text-center lg:max-w-6xl">
        <h2 className="mb-6 text-black font-cal-sans lowercase">
          Our Integrated Mission
        </h2>
        <p className="max-w-3xl text-gray-700 mb-20 text-lg md:text-xl font-dm-sans leading-loose text-center">
          ROTAGI equips African girls and women across Africa with AI literacy
          and digital confidence to build solutions and lead the global economy.
        </p>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 w-full">
          {pillars.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-8 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="mb-4">
                <h3 className="font-cal-sans text-black mb-2 lowercase">
                  {item.title}
                </h3>
                <h4 className="text-gray-600 font-dm-sans text-sm md:text-base tracking-wide uppercase">
                  {item.subtitle}
                </h4>
              </div>
              <p className="text-gray-600 leading-loose font-dm-sans lg:p-0 px-8">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
