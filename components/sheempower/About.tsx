import { features } from "@/lib/sheempower";
import { Phone, Play, GraduationCap, Briefcase } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AboutPage() {
  // Map icons to the features array based on index or title
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Phone className="h-6 w-6 text-[#D62D88]" />;
      case 1:
        return <Play className="h-6 w-6 text-[#D62D88]" />;
      case 2:
        return <GraduationCap className="h-6 w-6 text-[#D62D88]" />;
      case 3:
        return <Briefcase className="h-6 w-6 text-[#D62D88]" />;
      default:
        return <Phone className="h-6 w-6 text-[#D62D88]" />;
    }
  };

  return (
    <section className="bg-primary px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Top Text */}
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-wider uppercase text-[#D62D88]">
            About SheEmpower
          </p>

          <h2 className="mx-auto font-black max-w-2xl uppercase leading-[1.1] text-black text-3xl md:text-5xl">
            MORE THAN AN EVENT <br /> A MOVEMENT
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#373737]">
            The SHE Empower Conference is more than just an event.  <br />

It is a transformative experience designed to inspire, equip, and connect African girls and young women . This conference brings ROTAGI vision to life creating a space where learning meets inspiration, and every African girl leaves knowing she belongs in the room.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {/* Pink Card */}
          <div className="rounded-3xl bg-[#D62D88] px-4 py-8 text-center text-white shadow-md">
            <h3 className="text-lg md:text-3xl uppercase tracking-wide">
One day | Every girl | Limitless possibility            </h3>
          </div>

          {/* White Card */}
          <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm border border-gray-100">
            <h3 className="text-3xl text-black">
More Than a Conference            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5D677C] md:text-base">
              From inspiring speakers and hands on sessions to games, wellness, and community moments . SHE Empower is designed as a full experience where every girl feels seen, supported, and inspired.
            </p>
          </div>
        </div>

        {/* Bottom Section / Targeted Focus */}
        <div className="mt-28 text-center">
          <p className="text-sm font-semibold tracking-wider uppercase text-[#D62D88]">
What Happens in One Day          </p>

          <h2 className="mx-auto mt-4 max-w-3xl uppercase leading-[1.1] text-black text-3xl md:text-5xl">
            EMPOWERING EVERY AFRICAN GIRL <br />
            NO MATTER HER BACKGROUND
          </h2>
        </div>

        {/* Features / Focus groups */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((item, index) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-6 rounded-2xl border border-pink-100/20 backdrop-blur-sm"
            >
              {/* Icon Container */}
             
                {item.img ? (
                  <img src={item.img} alt={item.title} className="h-14   w-14" />
                ) : (
                  getIcon(index)
                )}

              {/* Text */}
              <div>
                <h3 className="text-lg text-black tracking-wide">{item.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-[#5D677C]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button below targeted focus */}
        <div className="mt-16 flex justify-center">
          <Button
            href="#register"
            className="text-[#D62D88] bg-white hover:bg-[#D62D88] hover:text-white rounded-2xl px-12 py-5 font-bold text-lg tracking-wide uppercase transition-all duration-300"
          >
            One Day | Endless Inspiration | A Community That Believes in You
          </Button>
        </div>
      </div>
    </section>
  );
}
