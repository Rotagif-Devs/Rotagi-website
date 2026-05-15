"use client"; // ← Required because we're using state + event handlers

import Button from "../ui/Button";
import VideoPlayer from "./Videoplayer";

export default function CTA() {
  return (
    <section className="bg-primary py-16 md:py-16 flex justify-center">
      <div className="flex w-full max-w-10/12 flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + description + buttons area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="font-cal-sans text-dark text-3xl leading-tight tracking-tight md:max-w-[600px] md:text-[38px] md:leading-[110%]">
            Join Us in Empowering the <br className="hidden md:block" /> African
            girls today
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="font-dm-sans text-darkgray text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
              Support African girls and women to develop skills, confidence, and
              leadership through Artificial Intelligence
            </p>

            <div className="hidden md:flex gap-4">
              <Button href="/donate" variant="primary" className="">
                Donate Now
              </Button>
              <Button
                href="/programs"
                variant="secondary"
                className="px-9 py-3.5 bg-white border border-gray-300 rounded-full text-black text-center"
              >
                Explore Programs
              </Button>
            </div>

            {/* Mobile buttons */}
            <div className="flex flex-col gap-4 md:hidden w-full">
              <Button
                href="/donate"
                variant="primary"
                className="text-center text-sm w-full justify-center"
              >
                Donate Now
              </Button>
              <Button
                href="/programs"
                variant="secondary"
                className="text-center text-sm w-full border border-gray-300 justify-center"
              >
                Explore Programs
              </Button>
            </div>
          </div>
        </div>

        {/* Video / hero preview */}
        <div className="flex w-full justify-center">
          <VideoPlayer />
        </div>
      </div>
    </section>
  );
}
