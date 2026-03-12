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
              <div className="w-16 h-16 bg-[#F8D0E3] rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#D62D88]" />
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
              <div className="w-16 h-16 bg-[#F8D0E3] rounded-full flex items-center justify-center mb-6">
                <Handshake className="w-8 h-8 text-[#D62D88]" />
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
              <div className="w-16 h-16 bg-[#F8D0E3] rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#D62D88]" />
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
            <div className="bg-white p-8 rounded-[1.5rem] border border-[#FACBE1] text-left">
              <div className="w-12 h-12 bg-[#D62D88] rounded-full flex items-center justify-center mb-6">
                <Presentation className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[1.15rem] font-normal font-cal-sans mb-4 text-black">
                Financial Sponsorship
              </h3>
              <ul className="text-sm text-gray-700 space-y-3 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Support our core programs
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Fund scholarships and grants
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Sponsor tech bootcamps
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Invest in our infrastructure
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-[1.5rem] border border-[#FACBE1] text-left">
              <div className="w-12 h-12 bg-[#D62D88] rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[1.15rem] font-normal font-cal-sans mb-4 text-black">
                Technical Partnership
              </h3>
              <ul className="text-sm text-gray-700 space-y-3 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Provide essential digital tools
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Co-design curriculum content
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Host coding workshops
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Offer cloud resources
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-[1.5rem] border border-[#FACBE1] text-left">
              <div className="w-12 h-12 bg-[#D62D88] rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[1.15rem] font-normal font-cal-sans mb-4 text-black">
                Mentorship & Placement
              </h3>
              <ul className="text-sm text-gray-700 space-y-3 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Provide 1-on-1 mentorship
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Offer internship opportunities
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Facilitate career pathways
                </li>
                <li className="flex items-start">
                  <span className="text-[#D62D88] mr-2 text-lg leading-none">
                    •
                  </span>{" "}
                  Hire our top graduates
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
