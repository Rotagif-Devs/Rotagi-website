"use client";

import {
  Users,
  Handshake,
  TrendingUp,
  Presentation,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

const PartnerInfo = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Why Partner Section */}
      <div className="bg-[#FCE8F3] py-20 md:py-28 px-5 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-[2.5rem] font-normal font-cal-sans mb-16 text-black">
            Why Partner with ROTAGI?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className=" h-16  flex items-center justify-center mb-6">
               <Image src="/circle.svg"alt="Partner with ROTAGI" width={32}
                        height={32} className="w-50 h-40 text-[#D62D88]" />
              </div>
              <h3 className="text-[1.1rem] font-normal font-cal-sans mb-4 text-black">
                Align with our Mission
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Directly support the empowerment of young African girls through
                AI and tech education. Help us shape the innovators of tomorrow.
              </p>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className=" h-16  flex items-center justify-center mb-6">
                 <Image src="/people.svg" alt="Partner with ROTAGI" width={32}
                        height={32} className="w-50 h-40 text-[#D62D88]" />
              </div>
              <h3 className="text-[1.1rem] font-normal font-cal-sans mb-4 text-black">
                Collaborate on Impacts
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Develop joint initiatives that create lasting change in local
                communities. Partner with us on transformative outreach
                programs.
              </p>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className=" h-16  flex items-center justify-center mb-6">
                 <Image src="/Arrow-2.svg" alt="Partner with ROTAGI" width={50}
                        height={50} className="w-50 h-40 text-[#D62D88]" />
              </div>
              <h3 className="text-[1.1rem] font-normal font-cal-sans mb-4 text-black">
                Access Diverse Talent
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Connect with a growing network of skilled and motivated young
                women leaders ready to thrive in the digital economy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ways we Collaborate Section */}
      <div className="bg-white py-20 md:py-28 px-5 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-[2.5rem] font-normal font-cal-sans mb-16 text-black">
            Ways we Collaborate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-[1.5rem] border border-[#FACBE1] text-left">
              <div className="w-25 h-12 flex items-center justify-center mb-6">
              <Image src="/love.svg" alt="Partner with ROTAGI" width={50}
                        height={50} className="w-70 h-70 mr-6 text-[#D62D88]" />
              </div>
              <h3 className="text-[1.15rem] font-normal font-cal-sans mb-4 text-black">
                Strategic Sponsorship
              </h3>
              <ul className="text-sm text-gray-700 space-y-3 list-none pl-0">
                <li className="flex items-start">
                  
                 Support our programs through financial contributions and receive recognition across our platforms.
                </li>
                <li className="flex items-start">
                  <span className="text-[#667085] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Brand visibility at events 
                </li>
                <li className="flex items-start">
                  <span className="text-[#667085] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Recognition in annual impact reports
                </li>
               
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-[1.5rem] border border-[#FACBE1] text-left">
              <div className="w-25 h-12  flex items-center justify-center mb-6">
            <Image src="/people-2.svg" alt="Partner with ROTAGI" width={50}
                        height={50} className="w-70 h-70 mr-6 text-[#D62D88]" />
              </div>
              <h3 className="text-[1.15rem] font-normal font-cal-sans mb-4 text-black">
                Technology Partnerships
              </h3>
              <ul className="text-sm text-gray-700 space-y-3 list-none pl-0">
                <li className="flex items-start">
               
                 Provide technology resources, tools, and platforms to enhance our program delivery
                </li>
                <li className="flex items-start">
                  <span className="text-[#667085] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                Learning platform access

                </li>
                <li className="flex items-start">
                  <span className="text-[#667085] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                 
Hardware and equipment donations
                </li>
                
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-[1.5rem] border border-[#FACBE1] text-left">
              <div className="w-25 h-12  flex items-center justify-center mb-6">
              <Image src="/Arrow-3.svg" alt="Partner with ROTAGI" width={50}
                        height={50} className="w-60 h-40 mr-6 text-[#D62D88]" />
              </div>
              <h3 className="text-[1.15rem] font-normal font-cal-sans mb-4 text-black">
                Talent Pipeline Development
              </h3>
              <ul className="text-sm text-gray-700 space-y-3 list-none pl-0">
                <li className="flex items-start">
                 
                 Connect with our graduates for internships, jobs, and career development opportunities
                </li>
                <li className="flex items-start">
                  <span className="text-[#667085] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                Early access to talented candidates

                </li>
                <li className="flex items-start">
                  <span className="text-[#667085] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
               Custom training programs
                </li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Let's Build Section */}
      <div className="bg-[#FCE8F3] py-20 px-5 w-full text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-[2.2rem] font-normal font-cal-sans mb-6 text-black tracking-tight">
          Let's Build the Future Together
        </h2>
        <p className="text-gray-800 font-normal mb-10 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
          We believe that when girls grow, communities thrive. Partner with us
          to scale our impact and reach more young innovators across Africa.
        </p>
        <Button
          variant="primary"
          href="/partner/inquiry"
          className="px-10 py-3 text-sm font-bold bg-[#D62D88] hover:bg-pink-700 text-white rounded-full transition-colors"
        >
          Partner With Us
        </Button>
      </div>
    </div>
  );
};

export default PartnerInfo;
