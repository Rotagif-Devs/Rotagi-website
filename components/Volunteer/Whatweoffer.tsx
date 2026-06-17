import Image from "next/image";
import WhoWeWelcome from "./Whowewelcome";

const WhatWeOffer = () => {
  return (
    <section className="bg-white py-9 px-6 lg:px-16">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="flex justify-center lg:justify-end">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/img3.png"
              alt="Volunteers"
              width={700}
              height={700}
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
        <div>
          <p className="text-[#E63B87] text-sm font-medium mb-4">
            What ROTAGI Offers Volunteer
          </p>

          <h2 className="text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 mb-6">What You Can Expect from Us</h2>

          <div className="mt-8">
            <p className="text-gray-700">
              As a ROTAGI Ambassador, you will receive:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-gray-700  !text-base">
              <li>A clear onboarding into your ambassador role</li>
              <li>A named point of contact within the ROTAGI team</li>
              <li>Access to ROTAGI&apos;s community and events</li>
              <li>A reference for meaningful contributions</li>
            </ul>
          </div>

          {/* Notice Box */}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
