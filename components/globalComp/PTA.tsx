
import Button from "../ui/Button"; 

export default function CTA() {
  return (
    <section className="bg-primary space-y-8 w-full">
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


      </div>
    </section>
  );
}