export default function CTA() {
  return (
    <section className="bg-[var(--color-primary)] py-16 md:py-20 flex justify-center">
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-5 md:px-0 md:gap-[76px]">
        {/* Title + description + buttons area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="font-[var(--font-cal-sans)] text-[var(--color-dark)] text-4xl font-semibold leading-tight tracking-tight md:max-w-[600px] md:text-[46px] md:leading-[110%]">
            Join Us in Empowering the Next Generation
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
            <p className="font-[var(--font-dm-sans)] text-[var(--color-darkgray)] text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
              Whether through donations, mentorship, or partnerships — your support creates lasting change.
            </p>

            {/* Buttons visible only on desktop in top right */}
            <div className="hidden md:flex gap-4">
              <button className="rounded-full bg-[var(--color-secondary)] px-8 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-white transition hover:bg-[var(--color-tertiary)] whitespace-nowrap">
                Donate Now
              </button>
              <button className="rounded-full border border-gray-200 bg-white px-8 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-[var(--color-dark)] transition hover:bg-gray-50 whitespace-nowrap">
                Explore Programs
              </button>
            </div>
          </div>
        </div>

        {/* Video / hero preview */}
        <div className="flex w-full justify-center">
          <div className="group relative w-full overflow-hidden rounded-3xl bg-white md:aspect-[1256/711] md:max-w-[1256px] md:rounded-[64px] aspect-[16/9]">
            {/* Placeholder background (replace with <video> or iframe when ready) */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 transition-colors group-hover:bg-black/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/30 backdrop-blur-md transition-transform group-hover:scale-110 md:h-32 md:w-32 shadow-xl">
                  <div className="ml-1 border-l-[28px] border-l-white border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent md:ml-2 md:border-l-[36px] md:border-t-[20px] md:border-b-[20px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons below video on mobile */}
        <div className="flex gap-4 justify-center md:hidden sm:flex-row">
          <button className="w-full rounded-full bg-[var(--color-secondary)] px-8 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-white transition hover:bg-[var(--color-tertiary)] sm:w-auto">
            Donate Now
          </button>
          <button className="w-full rounded-full border border-gray-200 bg-white md:px-8 px-4 py-3.5 font-[var(--font-dm-sans)] text-base font-semibold text-[var(--color-dark)] transition hover:bg-gray-50 sm:w-auto">
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
}