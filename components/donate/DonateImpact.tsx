import Image from "next/image";

const DonateImpact = () => {
  return (
    <section className="md:py-10 py-5">
      <div className="grid grid-col-1 md:grid-cols-2 mx-10 md:my-10 my-5 md:gap-10 gap-1">
        <div className="flex flex-col justify-center">
          <h2
            className="font-light md:!text-4xl !text-3xl text-black leading-tight"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Create Lasting Impact for African Girls and Young Women
          </h2>
          <p className="text-black my-8 font-thin">
            Too many African girls face limited access to technology, digital
            education, and career opportunities. Your donation helps close this
            gap by providing practical training in AI, digital skills, and
            leadership equipping girls to build confidence, earn income, and
            shape their future. Every contribution creates real opportunities
            and long-term impact.
          </p>
        </div>
        <div className="relative  w-full h-full">
          <Image
            src="/success.png"
            alt="success img"
            fill
            className="object-contain "
          />
        </div>
      </div>
    </section>
  );
};

export default DonateImpact;
