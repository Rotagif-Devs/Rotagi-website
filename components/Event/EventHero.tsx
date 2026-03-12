const EventsHero = () => {
  return (
    <section className="w-full py-14 lg:py-12 px-0 lg:px-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-center w-full">
        {/* Left Content */}
        <div className="order-2 lg:order-1 z-10 w-full">
          <p className="text-sm text-gray-600 mb-3">
            Programs Page <span className="mx-2">/</span> Event
          </p>
          <h3 className="font-semibold text-black py-4">
            Upcoming Workshops
          </h3>
          <p className="text-[#46455F] font-medium text-sm leading-relaxed py-4 w-full">
            Join us for workshops, conferences, networking events, and community gatherings.
            Connect with fellow tech enthusiasts and expand your skills.
          </p>
        </div>

        {/* Right Huge Text */}
        <div className="order-1 lg:order-2 flex justify-end lg:py-0 py-5 ">
          <h1 className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-extrabold text-black leading-none">
            Events
          </h1>
        </div>

      </div>
    </section>
  );
};

export default EventsHero;