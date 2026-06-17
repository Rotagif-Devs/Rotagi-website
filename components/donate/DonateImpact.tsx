import Image from "next/image";

const DonateImpact = () => {
  return (
    <section className="bg-[#F9E6EE] py-4 md:py-20 lg:py-24">
      <div className="max-w-11/12 mx-auto px-6 md:px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
        
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center order-1 md:order-2">
          <h2
            className="font-cal-sans  text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-[1.15] uppercase tracking-tight"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Create Lasting Impact for African Girls and Young Women
          </h2>
          
          <div className="mt-6 md:mt-8 space-y-4 text-[#333333] font-dm-sans text-sm md:text-base leading-relaxed max-w-xl">
            <p>
              Too many African girls face limited access to technology, digital
              education, and career opportunities.
            </p>
            <p>
              Your donation helps close this gap funding training that builds
              confidence, skills, and futures for girls and young women across Africa
            </p>
            <p>
              Every contribution creates real opportunities and long term impact.
            </p>
          </div>
        </div>

        {/* Right: Image Wrapper */}
        <div className="order-2 md:order-1 w-full aspect-[4/3] md:aspect-square relative rounded-[2rem] md:rounded-[3rem] overflow-hidden">
          <Image
            src="/successful-woman.png"
            alt="Young women learning"
            fill
            className="object-cover"
            sizes="(max-w-768px) 100vw, 50vw"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default DonateImpact;