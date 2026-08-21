"use client";

import { Bell } from "lucide-react";
import Button from "../ui/Button";

export default function PTA({ slug }: { slug?: string }) {
  const getProgramName = (slug?: string) => {
    if (!slug) return "";

    const knownPrograms: Record<string, string> = {
      "she-ignite": "She Ignite",
      "she-blossom": "She Blossom",
      "she-blaze": "She Blaze",
      "she-ascend": "She Ascend",
    };

    if (knownPrograms[slug]) {
      return knownPrograms[slug];
    }

    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const programName = getProgramName(slug);
  const Programssage = programName
    ? `${programName} course is coming soon. Sign up to be notified.`
    : "Stay updated on new programs, events, and opportunities.";

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28 px-6">
      {/* Decorative depth — soft, blurred glows, never intercepts clicks */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-tertiary/20 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center md:gap-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-secondary shadow-sm">
          <Bell size={14} />
          Stay in the Loop
        </span>

        <h2 className="max-w-2xl text-dark text-4xl leading-tight tracking-tight uppercase md:text-[46px] md:leading-[110%]">
          Be the First to Know
        </h2>

        <p className="font-dm-sans text-darkgray max-w-lg text-base leading-relaxed md:text-[16px] md:leading-[160%]">
          {Programssage}
        </p>

        <Button
          variant="primary"
          size="lg"
          withArrow
          href="https://forms.office.com/r/EEBttdeyFE?origin=lprLink"
          target="_blank"
          className="group shadow-xl shadow-secondary/20"
        >
          Join the Waitlist
        </Button>
      </div>
    </section>
  );
}
