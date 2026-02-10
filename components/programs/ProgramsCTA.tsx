"use client";

import Button from "../ui/Button";

export default function ProgramsCTA() {
  return (
    <section className="bg-pink-50 py-16 sm:py-24 mx-4 rounded-xl mb-12">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="lg:flex justify-between ">
            <div className="max-w-xl">
              <h2 className="mb-6 text-gray-900">
                Looking for Flexible Learning?
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="mb-8 text-gray-600">
                We offer self-paced modules and weekend workshops for those who
                need a more adaptable schedule.
              </p>
              <div className="">
                <Button
                  variant="primary"
                  withArrow
                  href="/contact"
                  className=""
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mb-12 flex aspect-video max-w-3xl items-center justify-center rounded-2xl bg-white shadow-xl overflow-hidden">
            {/* Placeholder for video content */}
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-gray-400">
                  VIDEO PLACEHOLDER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
