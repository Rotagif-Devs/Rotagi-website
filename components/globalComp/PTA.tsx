
import Button from "../ui/Button"; 

export default function CTA() {
  return (
    <section className="bg-primary py-16 md:py-20 flex justify-center">
      <div className="flex w-full flex-col gap-10 px-8 md:px-15 md:gap-19">
        {/* Title + description + buttons area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="md:max-w-md ">
             Ready to Get Started?
          </h2>
          <div className="flex flex-col items-start gap-6 md:max-w-lg">
            <p className="text-darkgray text-left ">
              Join She Ignite and take the next step in your technology journey.
            </p>

            {/* Buttons visible only on desktop in top right */}
            <div className="flex gap-4">
              <Button href="/programs" variant="primary" className="">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>

        {/* Video / hero preview */}
        <div className="flex w-full justify-center">
          <div className="group relative w-full overflow-hidden rounded-3xl bg-white md:aspect-1256/711 md:max-w-314 md:rounded-[64px] aspect- ">
            {/* Placeholder background (replace with <video> or iframe when ready) */}
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 transition-colors group-hover:bg-black/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/30 backdrop-blur-md transition-transform group-hover:scale-110 md:h-32 md:w-32 shadow-xl">
                  <div className="ml-1 border-l-28 border-l-white border-t-14 border-t-transparent border-b-14 border-b-transparent md:ml-2 md:border-l-36 md:border-t-20 md:border-b-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}