import Image from "next/image";

const DonateImpact = () => {
  return (
    <section className="py-10">
      <div className="grid grid-col-1 md:grid-cols-2 m-10 my-10 gap-10">
        <div className="flex flex-col justify-center">
          <h2 className="font-light text-black leading-tight text-4xl" style={{fontFamily: "var(--font-cal-sans)"}}>
            Make a Lasting Impact on African Girls and Women Digital Future
          </h2>
          <p className="text-black my-8 font-thin">
            Many young African girls and women face barriers to education and
            technology access. Your support directly addresses these gaps,
            providing structured programs that teach AI, coding and digital
            literacy. Donations helps fund safe learning spaces, mentorship
            initiative, and practical projects that empower girls to apply what
            they learn in real world scenarios. Each contribution is a step
            toward gender equality in the tech industry and an investment in
            talented young minds who will shape Africa’s digital economy.
          </p>
        </div>
        <div className="relative  w-full h-full">
             <Image src="/success.png" alt="success img" fill className="object-contain " />
        </div>
      </div>
    </section>
  );
};

export default DonateImpact;
