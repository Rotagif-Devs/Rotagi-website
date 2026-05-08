import Image from "next/image";
import { audience, expectations, values } from "@/lib/sheempower";
export default function SheEmpowerJourney() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-28">
        {/* SECTION 1 */}
        <div className="text-center">
          <p className=" font-medium text-[#D62D88]">Who This Is For</p>

          <h3 className="mt-3 font-medium uppercase text-black ">
            Everyone On The Journey
          </h3>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {audience.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-[#D62D88] p-8 text-left text-white"
              >
                <p className="font-medium">{item.title}</p>

                <h5 className="mt-2 font-medium">{item.subtitle}</h5>

                <ul className="mt-3 space-y-3 list-disc pl-5 text-sm leading-6 text-white/90">
                  {item.items.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="pt-15">
          <div className="text-center">
            <p className="font-medium text-[#D62D88]">What To Expect</p>

            <h3 className="mx-auto mt-3 max-w-2xl font-medium uppercase leading-tight text-black">
              A Full Day Of Learning Inspiration And Celebration
            </h3>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {expectations.map((item) => (
              <div key={item.title} className={`rounded-2xl p-6 ${item.bg}`}>
                <h5 className=" font-medium text-black">{item.title}</h5>

                <p className="mt-1 text-sm leading-7 text-gray-700">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className=" pt-15">
          <div className="text-center">
            <p className=" font-medium text-[#D62D88]">
              What Makes SHE Empower Different
            </p>
            <h3 className="mt-3 font-medium uppercase text-black ">
              Built On Values That Matter
            </h3>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {values.map((item) => (
              <div key={item.title} className="flex items-start gap-5">
                {/* ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgb(214,45,136)] text-white">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </div>

                {/* TEXT */}
                <div>
                  <h5 className="font-light text-[#1F2937]">{item.title}</h5>
                  <p className="text-sm! leading-5 text-gray-600">
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
