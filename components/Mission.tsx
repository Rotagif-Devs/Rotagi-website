import Button from "@/components/ui/Button";
import { Brain, Laptop, Rocket } from "lucide-react";

const pillars = [
  {
    icon: <Brain className="w-12 h-12 text-pink-500" />,
    title: "Mindset & Leadership",
    desc: "Building self-belief and leadership skills through mentorship and workshops.",
  },
  {
    icon: <Laptop className="w-12 h-12 text-pink-500" />,
    title: "Skillset",
    desc: "Hands-on programs in digital design, entrepreneurship, coding basics, and problem-solving.",
  },
  {
    icon: <Rocket className="w-12 h-12 text-pink-500" />,
    title: "Future-Set",
    desc: "Essential AI Literacy — equipping girls with skills to innovate, lead, and thrive globally.",
  },
];

export default function Mission() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold tracking-widest text-pink-600 uppercase mb-3">What We Do</h2>
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-6">
          Our Integrated Mission
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-20 leading-relaxed">
          ROTAGIF equips African girls and women across Africa with AI and digital confidence to build solutions and lead the global economy.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((item, i) => (
            <div key={i} className="group bg-white p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] transition-all duration-300 border border-gray-100 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              
              <div className="relative z-10 mb-8 bg-pink-50 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                {/* Clone element to pass className if needed, or just rely on parent color for SVG stroke */}
                <div className="group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
              
              <h3 className="relative z-10 text-2xl font-bold text-purple-900 mb-4">{item.title}</h3>
              <p className="relative z-10 text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}