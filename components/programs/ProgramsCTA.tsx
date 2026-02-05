"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProgramsCTA() {
  return (
    <section className="bg-pink-50 py-16 sm:py-24 mx-4 rounded-xl mb-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Looking for Flexible Learning?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            We offer self-paced modules and weekend workshops for those who need
            a more adaptable schedule.
          </p>

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

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DB2777] px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#BE185D]"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
