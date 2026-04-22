import React from "react";

export default function ChildProtectionPolicy() {
  return (
    <div className="min-h-screen bg-[#FCE7F3]">
      {/* Hero Section */}
      <section className="relative bg-[#2D0F21] py-20 px-4 text-center text-white lg:mx-4 min-h-[400px] md:min-h-[300px] lg:rounded-2xl flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-cal-sans font-normal mb-4 lowercase">
            child protection policy
          </h1>
          <p className="text-pink-200 font-light text-lg">
            Safeguarding African girls and young women across all ROTAGI
            programmes and platforms
          </p>
          <p className="text-pink-200/60 text-sm mt-4 uppercase tracking-wider">
            Effective: April 2026 | Reviewed annually
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              1. our commitment
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ROTAGI is committed to protecting the safety, dignity, and
                wellbeing of every child in our community.
              </p>
              <p>
                We work with African girls from the age of 10. Every child who
                participates in our programmes—online or in person—has the right
                to be safe, respected, and free from harm, abuse, and
                exploitation.
              </p>
              <p>
                This policy follows a "do no harm" approach and is aligned with:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The Child Rights Act (Nigeria, 2003)</li>
                <li>The Nigeria Data Protection Act (NDPA, 2023)</li>
                <li>
                  The United Nations Convention on the Rights of the Child
                  (UNCRC)
                </li>
                <li>International safeguarding standards</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              2. who this policy applies to
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>This policy applies to everyone involved with ROTAGI:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Participants across all programmes</li>
                <li>Staff and volunteers</li>
                <li>Mentors and facilitators</li>
                <li>Board of Trustees</li>
                <li>Partners and sponsors</li>
                <li>Event attendees and platform users</li>
              </ul>
              <p className="mt-4 font-medium italic text-gray-900">
                A child is defined as any person under the age of 18.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              3. safeguarding leadership
            </h2>
            <p className="text-gray-700 mb-8">
              ROTAGI has designated safeguarding leads responsible for all child
              protection matters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100">
                <h4 className=" text-gray-900 mb-4 border-b pb-2">
                  Designated Safeguarding Lead
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p className="font-bold text-[#D81B7E]">Olayemi Arokoyo</p>
                  <p className="text-sm">Executive Director, ROTAGI</p>
                  <p className="text-sm italic text-gray-500">
                    Disclosure Scotland PVG Scheme (UK)
                  </p>
                  <a
                    href="mailto:Oarokoyo@rotagif.com"
                    className="text-[#D81B7E] hover:underline block pt-2"
                  >
                    Oarokoyo@rotagif.com
                  </a>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100">
                <h4 className=" text-gray-900 mb-4 border-b pb-2">
                  Deputy Designated Safeguarding Lead
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p className="font-bold text-[#D81B7E]">
                    Lola Inès Raïssa Agondogo
                  </p>
                  <p className="text-sm">Safeguarding Lead, ROTAGI</p>
                  <p className="text-sm italic text-gray-500">
                    DBS Certified — Disclosure and Barring Service (UK)
                  </p>
                  <a
                    href="mailto:lagondogo@rotagif.com"
                    className="text-[#D81B7E] hover:underline block pt-2"
                  >
                    lagondogo@rotagif.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              4. our safeguarding principles
            </h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-6 space-y-3">
                <li>
                  <span className="font-bold">Zero tolerance</span> — No form of
                  abuse or harm is accepted.
                </li>
                <li>
                  <span className="font-bold">Child-first approach</span> — The
                  best interests of the child come first.
                </li>
                <li>
                  <span className="font-bold">Empowerment</span> — African girls
                  are encouraged to speak up and be heard.
                </li>
                <li>
                  <span className="font-bold">Confidentiality</span> —
                  Information is handled responsibly and shared only when
                  necessary to protect a child.
                </li>
                <li>
                  <span className="font-bold">Accountability</span> — Everyone
                  connected to ROTAGI is responsible for safeguarding.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              5. keeping children safe
            </h2>
            <p className="text-gray-700 mb-6">
              ROTAGI takes active steps to protect children across all
              environments:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h4 className="text-gray-900 mb-4">Safe Recruitment</h4>
                <ul className="text-sm space-y-2 text-gray-600 list-disc ml-4">
                  <li>Identity checks and references</li>
                  <li>Background checks where applicable</li>
                  <li>Mandatory safeguarding training</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h4 className="text-gray-900 mb-4">Safe Programme Delivery</h4>
                <ul className="text-sm space-y-2 text-gray-600 list-disc ml-4">
                  <li>No private one-to-one interactions</li>
                  <li>Official platforms only</li>
                  <li>Adult supervision in all sessions</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h4 className="text-gray-900 mb-4">Online Safety</h4>
                <ul className="text-sm space-y-2 text-gray-600 list-disc ml-4">
                  <li>Platform monitoring</li>
                  <li>No private messaging with adults</li>
                  <li>Parental consent required</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              6. media and consent
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  No child is photographed or recorded without prior written
                  parental consent.
                </li>
                <li>Personal details are never shared publicly.</li>
                <li>
                  Images of children are used respectfully, in dignified and
                  empowering contexts only.
                </li>
                <li>Consent can be withdrawn at any time.</li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              7. reporting a concern
            </h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#D81B7E]/20 mb-8">
              <p className="text-gray-700 mb-6 font-medium italic">
                If you are concerned about a child's safety, however small the
                concern, please report it immediately. You do not need to be
                certain. If something feels wrong, tell us.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D81B7E] text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <p className="text-gray-700 pt-1">
                    Report immediately to the Designated Safeguarding Lead.
                    Email{" "}
                    <a
                      href="mailto:Oarokoyo@rotagif.com"
                      className="text-[#D81B7E] font-bold"
                    >
                      Oarokoyo@rotagif.com
                    </a>{" "}
                    or{" "}
                    <a
                      href="mailto:lagondogo@rotagif.com"
                      className="text-[#D81B7E] font-bold"
                    >
                      lagondogo@rotagif.com
                    </a>
                    . Do not delay.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D81B7E] text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <p className="text-gray-700 pt-1">
                    Do not investigate the situation yourself. Do not confront
                    the person involved.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D81B7E] text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-gray-700 pt-1">
                    Write down what you observed, heard, or were told, using the
                    child's own words where possible. Include the date, time,
                    and location.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D81B7E] text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <p className="text-gray-700 pt-1">
                    Send your written account to the Safeguarding Lead within 24
                    hours.
                  </p>
                </div>
              </div>
              <p className="mt-8 text-sm text-gray-600 italic">
                All reports are handled confidentially and acted upon promptly.
                ROTAGI will never penalise anyone who raises a concern in good
                faith.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              8. data protection and confidentiality
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ROTAGI protects all personal data in line with the Nigeria Data
                Protection Act (NDPA 2023). Safeguarding information is:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Stored securely with restricted access.</li>
                <li>Accessed only when necessary to protect a child.</li>
                <li>
                  Shared only with those who need it, including relevant
                  authorities where required by law.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div className="pt-8 border-t border-pink-200">
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6 lowercase">
              9. policy review
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This policy is reviewed annually or when required due to changes
                in Nigerian child protection law, a safeguarding incident, or
                changes to ROTAGI's programmes or platforms.
              </p>
              <p className="font-bold">
                This version is effective from April 2026 and will be reviewed
                by April 2027.
              </p>
            </div>
          </div>

          <div className="text-center pt-12 text-gray-500 text-sm">
            <p>© 2026 Reaching Out to African Girls Initiative (ROTAGI)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
