import Image from "next/image";
import { User } from "lucide-react";

type Person = {
  name: string;
  role?: string;
  image?: string;
};

// Real people already used elsewhere on the site (About page's leadership
// carousel) — reused here rather than duplicated with different data.
const STAFF: Person[] = [
  { name: "Arokoyo Olayemi", role: "Executive Director", image: "/Arokoyo.png" },
  // Photos in, roles still coming — role left unset so the card shows
  // "Role Coming Soon" instead of a guessed/wrong title.
  { name: "Halimah Muhammad", image: "/team/halimah-muhammad.jpg" },
  { name: "Celestina Ibekwe", image: "/team/celestina-ibekwe.jpg" },
  // Two more of the originally-shared photos are still pending: the woman
  // in the African-print top needs a name, and the man in the navy suit's
  // photo file hasn't been provided yet.
];

const ADVISORY_BOARD: Person[] = [
  { name: "Dr. Tolulope Oko-Igare", role: "Advisory Board", image: "/Tolulope.png" },
  { name: "Adetoro Okide", role: "Advisory Board", image: "/Adetoro.png" },
  { name: "Abisayo Busari Akinnadeju", role: "Advisory Board", image: "/Busari.png" },
];

// Reserved, clearly-labeled slots so the page reads as "more team members
// coming soon" rather than looking incomplete or broken. Swap these out for
// real Person entries (with a photo) as bios/headshots come in.
// Staff photos are in now — no more blank reserved slots needed.
const STAFF_PLACEHOLDER_COUNT = 0;
// Advisory board is complete at 3 members for now — no reserved slots.
const ADVISORY_PLACEHOLDER_COUNT = 0;

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="relative w-full aspect-square bg-primary">
        {person.image ? (
          <Image src={person.image} alt={person.name} fill className="object-cover" />
        ) : null}
      </div>
      <div className="p-5 text-center">
        <h3 className="font-cal-sans text-gray-900 text-lg">{person.name}</h3>
        {person.role ? (
          <p className="text-secondary text-sm font-semibold mt-1">{person.role}</p>
        ) : (
          <p className="text-gray-400 text-sm font-semibold italic mt-1">Role Coming Soon</p>
        )}
      </div>
    </div>
  );
}

function PlaceholderCard({ role }: { role: string }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-200 overflow-hidden">
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center">
        <User className="w-14 h-14 text-gray-300" strokeWidth={1.5} />
      </div>
      <div className="p-5 text-center">
        <h3 className="font-cal-sans text-gray-400 text-lg italic">Name Coming Soon</h3>
        <p className="text-gray-400 text-sm font-semibold mt-1">{role}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white font-dm-sans">
      {/* Hero */}
      <section className="bg-secondary py-20 px-6 text-center lg:mx-4 lg:rounded-2xl mt-6 md:mt-0">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white font-cal-sans text-4xl md:text-5xl uppercase mb-4">
            Our Team &amp; Advisory Board
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Meet the people driving ROTAGI&apos;s mission to equip African girls and young
            women with the skills, mentorship, and opportunities to thrive in tech.
          </p>
        </div>
      </section>

      {/* Staff */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cal-sans text-3xl md:text-4xl text-gray-900 mb-3">Our Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The staff leading ROTAGI&apos;s day-to-day work.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {STAFF.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
            {Array.from({ length: STAFF_PLACEHOLDER_COUNT }, (_, i) => (
              <PlaceholderCard key={`staff-placeholder-${i}`} role="Staff" />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cal-sans text-3xl md:text-4xl text-gray-900 mb-3">
              Advisory Board
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Experienced voices guiding ROTAGI&apos;s strategy and growth.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {ADVISORY_BOARD.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
            {Array.from({ length: ADVISORY_PLACEHOLDER_COUNT }, (_, i) => (
              <PlaceholderCard key={`advisory-placeholder-${i}`} role="Advisory Board" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
