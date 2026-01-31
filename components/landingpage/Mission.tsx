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
    <section className="py-24 bg-[var(--color-primary)]">
      <div className="mx-auto px-6 lg:px-8 flex flex-col items-center text-center max-w-[1181px]">
        <h2 className="font-[var(--font-cal-sans)] text-[46px] leading-[100%] tracking-normal text-[var(--color-dark)] mb-6 font-semibold">
          Our Integrated Mission
        </h2>
        <p className="font-[var(--font-dm-sans)] text-[18px] leading-[35px] tracking-[-0.01em] text-[var(--color-gray)] max-w-[662px] mb-20">
          ROTAGI equips African girls and women across Africa with AI literacy and digital confidence to build solutions and lead the global economy.
        </p>

        <div className="grid md:grid-cols-3 gap-[52px] w-full">
          {pillars.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-6 bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-sm">
                <Image 
                  src={item.icon} 
                  alt={item.title} 
                  width={i === 0 ? 80 : 40} 
                  height={i === 0 ? 80 : 40} 
                  className={`${i === 0 ? "w-20 h-20" : "w-10 h-10"} object-contain`}
                />
              </div>
              
              <div className="mb-4">
                <h3 className="text-[18px] font-semibold text-[var(--color-light-mode-test)] font-inter leading-[32px] tracking-[-0.5px] text-center">{item.title}</h3>
                <h3 className="text-[18px] font-semibold text-[var(--color-light-mode-test)] font-inter leading-[32px] tracking-[-0.5px] text-center">{item.subtitle}</h3>
              </div>
              <p className="w-[274px] h-[90px] text-[16px] font-normal text-[var(--color-text-hdd)] font-inter leading-[30px] tracking-normal text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}