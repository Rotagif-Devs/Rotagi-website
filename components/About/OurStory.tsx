import React from 'react'
import Image from "next/image";


const OurStory = () => {


const items = [
    {
      titleTop: "The Beginning",
      titleMid: "Awesome Girls Club",
      body: "ROTAGI began as Awesome Girls Club — a safe haven where young African girls could discover their strength, raise their voices, and unlock their true potential. Through mentorship, training, and meaningful conversations, we help girls recognize their worth and grow into confident young leaders.",
      Icon: "/celebration-icon.svg",
    },
    {
      titleTop: "The Growth",
      titleMid: "Expanding Our Reach",
      body: "As the movement grew, we reached over 300 girls, partnering with non-profit organizations across communities to deliver transformative programs focused on confidence-building and personal development.",
      Icon: "/arrow.svg",
    },
    {
      titleTop: "The Evolution",
      titleMid: "ROTAGI",
      body: "In 2025, ROTAGI evolved to respond to the realities of the digital age. We expanded our mission to include Artificial Intelligence education, digital safety, and essential life skills—preparing African girls not just to succeed, but to lead the future.",
      Icon: "/Pin.svg",
    },
  ];
  return (
 <div className="mt-20 text-center px-4">
        <h2 className="text-4xl md:text-sm ">Our Story</h2>
        <div className="flex justify-center mb-8">
           <div className="mt-5 h-1.5 w-24 bg-[#d6448d] mx-auto rounded-full"></div>
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
                      <div className="relative lg:bottom-3 z-10 mx-auto -mt-3 md:-mt-5 grid h-14 w-14 place-items-center rounded-full border-2 border-pink-500 bg-pink-200 text-pink-500 shadow-[0_10px_24px_rgba(236,72,153,0.18)]">
                        <Image
                          src={Icon}
                          alt={titleMid}
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      </div>
        
                      <h4 className="mt-6 text-zinc-900">
                        {titleTop}
                      </h4>
                      <h3 className="mt-2 text-pink-600">
                        {titleMid}
                      </h3>
                      <p className="mx-auto mt-2 max-w-sm leading-7 text-zinc-700 px-2 md:px-0">
                        {body}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
      </div>
  )
}

export default OurStory