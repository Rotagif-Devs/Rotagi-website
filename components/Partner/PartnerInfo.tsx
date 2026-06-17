"use client";

import Image from "next/image";

const PartnerInfo = () => {
  return (
    <section className="bg-[#FCE7F1] py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        

        <h2 className="text-3xl md:text-6xl text-black mb-6 font-cal-sans uppercase tracking-tight leading-tight">
          Why Partner with ROTAGI?
        </h2>
        
       
        <p className="text-gray-800 font-dm-sans leading-relaxed max-w-2xl mx-auto mb-16 md:mb-24">
          ROTAGI is on a mission to ensure that African girls and young women are not left 
          behind as technology and AI reshape the global economy. A partnership with ROTAGI 
          means investing directly in that mission — and in the next generation of African women 
          in tech, business, and leadership.
        </p>


        <div className="relative w-full max-w-4xl flex justify-center items-center gap-4 md:gap-6 pt-6 pb-12">
          
      
          <div className="relative w-[180px] sm:w-[220px] aspect-3/4 rounded-3xl translate-y-6 shrink-0">
            <Image
              src="/FourPeople.png" 
              alt="ROTAGI field operations"
              fill
              sizes="(max-w-640px) 180px, 220px"
              className="object-contain"
              priority
            />
          </div>

       
          <div className="relative w-[180px] sm:w-[220px] aspect-3/4 rounded-3xl transform -translate-y-8 z-10 shrink-0">
            <Image
              src="/WritingGirl.png" 
              alt="Girl writing down notes"
              fill
              sizes="(max-w-640px) 180px, 220px"
              className="object-contain"
              priority
            />
          </div>

      
          <div className="relative w-[180px] sm:w-[207px] aspect-3/4 rounded-3xl    translate-y-6 shrink-0">
            <Image
              src="/KeyBoardgirls.png" 
              alt="Students in AI computer training lab"
              fill
              sizes="(max-w-640px) 200px, 207px"
              className="object-contain"
              priority
            />
          </div>

  
          <div className="absolute right-[12%] bottom-2 w-8 h-8 opacity-80 pointer-events-none hidden sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#E05397]">
              <path d="M12 2L14.8 8.4L21.8 9L16.5 13.6L18.1 20.5L12 16.8L5.9 20.5L7.5 13.6L2.2 9L9.2 8.4L12 2Z" />
            </svg>
          </div>
          <div className="absolute left-[66%] top-[-10px] w-10 h-10 opacity-80 pointer-events-none hidden sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#E05397]">
              <path d="M12 2L14.8 8.4L21.8 9L16.5 13.6L18.1 20.5L12 16.8L5.9 20.5L7.5 13.6L2.2 9L9.2 8.4L12 2Z" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerInfo;