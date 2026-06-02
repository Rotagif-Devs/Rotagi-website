"use client";

import { useState } from "react";
import Button from "../ui/Button";
import VideoPlayer from "./Videoplayer";
import WaitlistModal from "./WaitlistModal";

export default function PTA({ slug }: { slug?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProgramName = (slug?: string) => {
    switch (slug) {
      case "she-ignite": return "She Ignite";
      case "she-blossom": return "She Blossom";
      case "she-blaze": return "She Blaze";
      case "she-ascend": return "She Ascend";
      default: return "";
    }
  };

  const programName = getProgramName(slug);

  return (
    <>
      <section className="bg-primary py-16 md:py-20 px-6 flex justify-center">
        <div className="flex w-full max-w-11/12 flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
          {/* Title + description + buttons area */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
            <h2 className="max-w-lg text-dark text-4xl leading-tight tracking-tight uppercase md:max-w-[600px] md:text-[46px] md:leading-[110%]">
              Be the First to Know
            </h2>

            <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
              <p className="font-dm-sans text-darkgray text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
                {programName || "Our"} our courses are coming soon. Sign up to be notified.
              </p>

              <div className="hidden md:flex gap-4">
                <Button 
                  variant="primary" 
                  className=""
                  onClick={() => setIsModalOpen(true)}
                >
                  Join the Waitlist
                </Button>
              </div>
            </div>
          </div>

          {/* Video / hero preview */}
          <div className="w-full">
            <VideoPlayer />
          </div>
        </div>
      </section>

      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        programName={programName}
      />
    </>
  );
}
