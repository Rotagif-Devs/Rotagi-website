import { features } from "@/lib/sheempower";
import Image from "next/image";
export default function AboutPage() {
  
  return (
    <section className="bg-[#F6DFEA] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Top Text */}
        <div className="text-center">
          <p className="mb-3 text-sm font-medium text-[#D62D88]">
            About SHE Empower
          </p>

          <h3 className="mx-auto font-medium max-w-2xl uppercase leading-tight text-black">
            More Than An Event <br /> A Movement
          </h3>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-600 ">
            This conference brings ROTAG vision to life creating a space where
            learning meets inspiration, and every African girl leaves knowing
            she belongs in the room.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {/* Pink Card */}
          <div className="rounded-3xl bg-gradient-to-r bg-[#D62D88] px-4 py-8 text-center text-white shadow-lg">
            <h3 className="font-medium uppercase">
              One Day Every Girl Limitless Possibility
            </h3>
          </div>

          {/* White Card */}
          <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm">
            <h3 className="font-medium text-black">
              More Than A Conference
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              From inspiring speakers and hands on sessions to games, wellness,
              and community moments, SHE Empower is a full experience where
              every African girl feels seen, supported, and inspired.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-28 text-center">
          <p className="text-sm font-medium text-[#D62D88]">
            What Happens In One Day
          </p>

          <h3 className="mx-auto font-medium mt-4 max-w-3xl uppercase leading-tight text-black">
            Empowering Every African Girl <br />
            No Matter Her Background
          </h3>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-6 backdrop-blur-sm"
            >
              {/* Icon */}
              <div className="flex bg-white items-center justify-center p-4 rounded-2xl">
              <Image
                src={item.img}
                alt={item.title}
                width={48}
                height={48}
                className="object-contain"
                
              />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-medium text-black">{item.title}</h3>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}