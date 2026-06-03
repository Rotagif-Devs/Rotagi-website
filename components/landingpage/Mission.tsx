import Image from "next/image";

const pillars = [
  {
    icon: "/mission-icon-1.svg",
    title: "Mindset",
    subtitle: "Confidence & Leadership",
    desc: "Building confidence, leadership, and life skills through mentorship and workshops.",
  },
  {
    icon: "/mission-icon-2.svg",
    title: "Skillset",
    subtitle: "Practical Digital Tech Training",
    desc: "Hands on programs in digital design, entrepreneurship, and real world problem solving.",
  },
  {
    icon: "/mission-icon-3.svg",
    title: "Future-Set",
    subtitle: "Artifical Intelligence Literacy",
    desc: "Equipping African girls and women with AI skills to innovate, lead, and thrive.",
  },
];

export default function Mission() {
  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="mx-auto flex flex-col items-center text-center lg:max-w-11/12">
        <div className="flex flex-col justify-center items-center gap-4 mb-16">
          <h2 className="text-black font-cal-sans font-normal text-4xl md:text-5xl uppercase">
            Our Integrated Mission
          </h2>
          <p className="lg:max-w-2xl text-gray-600 font-dm-sans font-normal text-lg md:text-xl leading-loose lg:leading-relaxed">
            ROTAGI equips African girls and women across Africa with AI literacy
            and digital skills to build solutions and lead the global economy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 w-full">
          {pillars.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-8 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-[0px_4px_28px_0px_rgba(0,0,0,0.05)] transition-transform group-hover:scale-110">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 p-2 px-8 w-fit mx-auto mb-2 bg-secondary/20 rounded-full">
                    <span className="text-secondary font-normal font-cal-sans">
                      {item.title}
                    </span>
                  </div>

                  <span className="text-black text-xl font-normal font-cal-sans">
                    {item.subtitle}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 font-inter font-normal text-base leading-8 max-w-[280px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
