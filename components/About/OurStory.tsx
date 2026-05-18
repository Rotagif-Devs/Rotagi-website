"use client";
import Image from "next/image";

const OurStory = () => {
  const items = [
    {
      titleTop: "The Beginning",
      titleMid: "Awesome Girls Club",
      body: "ROTAGI began as the Awesome Girls Club a safe haven where young African girls discover their strength, build confidence, and unlock their true potential. Through mentorship, training in self esteem and self confidence, we help girls and young women grow into confident.",
      Icon: "/areo.png",
    },
    {
      titleTop: "The Growth",
      titleMid: "Expanding Our Reach",
      body: "As the movement grew, we have reached 1,000 girls and young women, working with organisations across communities to deliver transformative programmes focused on confidence, life skills, and personal development.",
      Icon: "/growth.png",
    },
    {
      titleTop: "The Evolution",
      titleMid: "ROTAGI",
      body: "In 2025, ROTAGI evolved to respond to the growing realities of the digital age. We expanded our programmes to include Artificial Intelligence education, digital skills, and essential life skills, equipping African girls and young women not just to succeed, but to lead.",
      Icon: "/bulb.png",
    },
  ];

  return (
    <div id="OurStory" className="mt-20 text-center px-4">
      <h2>OUR STORY</h2>
      <p>From Awesome Girls Club to ROTAGI</p>
      <div className="flex justify-center mb-8">
        
      </div>

      <section className="px-4 md:px-5 py-11">
        <div
          className="
            relative mx-auto
            pt-6 md:pt-8
            flex flex-col gap-10
            md:flex-row md:gap-12 md:justify-between
            before:hidden md:before:block
          "
        >
          {items.map(({ titleTop, titleMid, body, Icon }, idx) => (
            <article key={idx} className="flex-1 text-center">
              <div className="relative lg:bottom-10 bottom-10 z-10 mx-auto -mt-3  md:-mt-5 grid h-14 w-36 place-items-center rounded-full ">
                <Image
                  src={Icon}
                  alt={titleMid}
                  width={1000}
                  height={1000}
                  className="object-contain"
                />
              </div>

              <h4 className="mt-6 text-sm">{titleTop}</h4>
              <h3 className="mt-2 text-lg text-pink-600">{titleMid}</h3>
              <p className="mx-auto mt-2 text-[#667085] max-w-sm leading-7 px-2 md:px-0">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurStory;