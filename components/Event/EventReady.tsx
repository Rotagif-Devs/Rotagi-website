import Button from "@/components/ui/Button";

const EventReady = () => {
  return (
    <div className="flex py-15 md:px-8 px-4 flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
      <h2 className="font-cal-sans text-dark leading-tight md:leading-[110%] md:w-[30%] w-full">
        Ready to Get Started?
      </h2>
      
      <div className="flex flex-col items-start gap-6 md:max-w-[580px]">
        <p className="font-dm-sans text-darkgray text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
         Join She Ignite and take the next step in your technology journey
        </p>

        <div className="hidden md:flex gap-4">
          <Button href="/programs" variant="primary" className="">
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EventReady;
