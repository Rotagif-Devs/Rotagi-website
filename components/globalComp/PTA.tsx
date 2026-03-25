"use client";
import Button from "../ui/Button";
import VideoPlayer from "./Videoplayer";
export default function PTA() {
  return (
    <section className="bg-primary py-16 md:py-20 px-6 md:px-15 flex justify-center">
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + description + buttons area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="max-w-lg text-dark text-4xl leading-tight tracking-tight md:max-w-[600px] md:text-[46px] md:leading-[110%]">
            Ready to Get Started?
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="font-dm-sans text-darkgray text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
              Join She Ignite and take the next step in your technology journey.
            </p>

            <div className="hidden md:flex gap-4">
              <Button href="/login" variant="primary" className="">
                Get Started Now
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
  );
}
