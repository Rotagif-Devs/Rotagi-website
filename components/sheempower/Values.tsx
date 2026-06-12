import { Check, Users, BookOpen, Wifi, Globe } from "lucide-react";
import { audience, expectations, values } from "@/lib/sheempower";

export default function SheEmpowerJourney() {
  const getValueIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="h-5 w-5 stroke-[2.5]" />;
      case 1:
        return <BookOpen className="h-5 w-5 stroke-[2.5]" />;
      case 2:
        return <Wifi className="h-5 w-5 stroke-[2.5]" />;
      case 3:
        return <Globe className="h-5 w-5 stroke-[2.5]" />;
      default:
        return <Check className="h-5 w-5 stroke-[2.5]" />;
    }
  };

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl flex flex-col gap-40">
        {/* SECTION 1: Who This Is For */}
        <div className="text-center py-10">
          

          <h2 className="mx-auto max-w-4xl uppercase leading-[1.1] text-black text-3xl md:text-5xl">
            Who This Is For
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed">
ROTAGI supports African girls and women aged 10 to 40. <br />SHE Empower welcomes everyone across our full learning pathway.             </p>

          <div className="my-12 grid gap-6 md:grid-cols-2">
            {audience.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 text-left shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-2xl tracking-tight">
                    {item.title}
                  </h4>

                  <h5 className="mt-1 text-black text-lg">
                    {item.subtitle}
                  </h5>

                  <ul className="mt-6 space-y-4">
                    {item.items.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-[#5D677C] leading-relaxed">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-100 text-[#D62D88] mt-0.5">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl leading-relaxed text-[#5D677C]">
           This event supports our full pipeline approach from a girl's first spark of curiosity at age 10 to her career breakthrough at 40. 
          </p>
        </div>

        {/* SECTION 2: What To Expect */}
        <div className="py-10">
          <div className="text-center flex-col flex gap-6">
            <h2 className="mx-auto max-w-4xl uppercase leading-[1.1] text-black text-3xl md:text-5xl">
             What To Expect
            </h2>
          <p className="max-w-2xl mx-auto leading-relaxed text-[#5D677C]">
            A full day of learning, inspiration, connection, and celebration designed around every African girl.
          </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expectations.map((item) => (
              <div
                key={item.title}
                className={`rounded-xl p-6 transition-transform hover:-translate-y-1 duration-300 ${item.bg}`}
              >
                <h4 className="text-black text-xl tracking-tight">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#373737]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: What Makes SheEmpower Different */}
        <div className="pt-5">
          <div className="text-center mb-4">
            <h2 className="uppercase tracking-tight text-black text-3xl md:text-5xl">
              WHAT MAKES SHEEMPOWER DIFFERENT
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {values.map((item, index) => (
              <div key={item.title} className="flex items-start gap-4">
                {/* ICON */}
               
                 {item.img ? (
                  <img src={item.img} alt={item.title} className="h-14 w-14" />
                ) : (
                  getValueIcon(index)
                )}

                {/* TEXT */}
                <div className="flex flex-col gap-3">
                  <p className="text-xl font-bold mr-1">{item.title}</p>
                  <p className="text-base leading-relaxed text-[#373737]">
                    
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

