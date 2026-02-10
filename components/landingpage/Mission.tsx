import Image from "next/image";

const pillars = [
  {
    icon: "/ic-1.png",
    title: "Mindset",
    subtitle: "Confidence & Leadership",
    desc: "Building self-belief and leadership skills through mentorship and workshops.",
  },
  {
    icon: "/ic-2.png",
    title: "Skillset",
    subtitle: "Practical Digital Tech Training",
    desc: "Hands-on programs in digital design, entrepreneurship, and real-world problem-solving.",
  },
  {
    icon: "/ic-3.png",
    title: "Future-Set",
    subtitle: "Essential AI Literacy",
    desc: "Equipping African girls with AI skills to innovate, lead, and thrive globally.",
  },
];

export default function Mission() {
  return (
    <section className="py-24 ">
      <div className="mx-auto px-6 lg:px-8 flex flex-col items-center text-center max-w-6xl">
        <h2 className="mb-6">
          Our Integrated Mission
        </h2>
        <p className=" max-w-2xl mb-20">
          ROTAGI equips African girls and women across Africa with AI literacy and digital confidence to build solutions and lead the global economy.
        </p>
        <div className="grid md:grid-cols-3 gap-14 w-full">
          {pillars.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-6 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                <Image 
                  src={item.icon} 
                  alt={item.title} 
                  width={400} 
                  height={400} 
                  className={`${i === 0 ? "w-20 h-20" : "w-10 h-10"} object-contain`}
                />
              </div>              
              <div className="mb-4">
                <h4 className="font-inter text-center">{item.title}</h4>
                <h4 className="text-center">{item.subtitle}</h4>
              </div>
              <p className="text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}