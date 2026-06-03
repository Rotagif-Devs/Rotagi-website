import Image from "next/image";

const WhoWeWelcome = () => {
  return (
    <section className="bg-white py-20 px-6 lg:px-16">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <p className="text-[#E63B87] text-sm font-medium mb-4">
            Who can Volunteer
          </p>

          <h2 className=" font-medium text-black mb-8">WHO WE WELCOME</h2>

          <div className="space-y-4 text-gray-700 leading-8">
            <p>
              You do not need a specific qualification or years of experience.
              <br></br>
              You need to believe in this mission and be willing to give your
              time consistently.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-gray-700">We welcome volunteers who:</p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-gray-700">
              <li>Are aged 18 and above</li>
              <li>Are based anywhere in the world</li>
              <li>Can commit a minimum of 2 to 4 hours per month</li>
              <li>Align with ROTAGI&apos;s values and Code of Conduct</li>
              <li>Complete a short onboarding process before beginning</li>
            </ul>
          </div>

          {/* Notice Box */}
          <div className="mt-10 max-w-xl rounded-2xl border-l-4 border-[#E63B87] bg-pink-100 p-5">
            <p className="text-sm font-medium text-[#E63B87]">
              All volunteers are required to review and agree to ROTAGI&apos;s
              Code of Conduct and Child Protection Policy before beginning any
              role involving participants.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/img2.png"
              alt="Volunteers"
              width={700}
              height={700}
              className="object-cover"
              //   priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWelcome;
