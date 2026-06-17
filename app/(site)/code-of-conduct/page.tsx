import React from "react";
import { Check } from "lucide-react";

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#2D0F21] py-20 px-4 text-center text-white lg:mx-4 min-h-[400px] md:min-h-[300px] lg:rounded-2xl flex flex-col justify-center overflow-hidden mt-6">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-cal-sans font-normal mb-4 uppercase">
            Code of Conduct
          </h1>
          <p className="text-pink-100 font-light text-sm md:text-base">
            Safe, Inclusive, and Responsible Engagement Across All ROTAGI
            Platforms and Programs
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <p className="text-[#D81B7E]   text-sm mb-12">
          Effective Date: April 2026
        </p>

        <div className="space-y-16">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              1. Our Commitment
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                ROTAGI is committed to creating safe, inclusive, respectful, and
                empowering environments for African girls and young women across
                all our Programs, platforms, and events.
              </p>
              <p>
                This Code of Conduct sets out the standards of behaviour
                expected from everyone engaging with ROTAGI. By participating in
                any ROTAGI activity, you agree to uphold these standards.
              </p>
              <p>ROTAGI operates in accordance with:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> The Child Rights Act (Nigeria, 2003)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> The Nigeria Data Protection Act (NDPA, 2023)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> The Companies and Allied Matters Act (CAMA)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> International safeguarding and child protection standards
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              2. Scope
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base">
              <p>This Code applies to:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> All Program participants: She Ignite, She Blossom, She Blaze, She Ascend
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Mentors, facilitators, and instructors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> ROTAGI staff and volunteers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Board of Trustees
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Partners and sponsors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Event attendees and guests
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> All users of the ROTAGI website and learning platform
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              3. Our Core Values
            </h2>
            <p className="text-gray-700 mb-8 text-sm md:text-base">
              All behaviour within ROTAGI is guided by the MERG Framework, our
              four core values that shape everything we do.
            </p>
            <div className="flex flex-col gap-4">
              {/* M */}
              <div className="flex bg-white rounded-r-2xl rounded-l-2xl overflow-hidden shadow-sm border border-pink-100 items-stretch">
                <div className="bg-[#0052CC] w-16 md:w-24 shrink-0 flex items-center justify-center">
                  <span className="text-white text-3xl md:text-4xl   font-cal-sans">M</span>
                </div>
                <div className="p-4 md:p-6 flex flex-col justify-center">
                  <h4 className="text-gray-950   mb-1 text-base md:text-lg">Measurable Impact</h4>
                  <p className="text-gray-600 text-sm">
                    We act with purpose and contribute meaningfully to learning
                    and development.
                  </p>
                </div>
              </div>
              {/* E */}
              <div className="flex bg-white rounded-r-2xl rounded-l-2xl overflow-hidden shadow-sm border border-pink-100 items-stretch">
                <div className="bg-[#1C7A3E] w-16 md:w-24 shrink-0 flex items-center justify-center">
                  <span className="text-white text-3xl md:text-4xl   font-cal-sans">E</span>
                </div>
                <div className="p-4 md:p-6 flex flex-col justify-center">
                  <h4 className="text-gray-950   mb-1 text-base md:text-lg">Equitable Access</h4>
                  <p className="text-gray-600 text-sm">
                    We promote inclusion and remove barriers to participation.
                  </p>
                </div>
              </div>
              {/* R */}
              <div className="flex bg-white rounded-r-2xl rounded-l-2xl overflow-hidden shadow-sm border border-pink-100 items-stretch">
                <div className="bg-[#592683] w-16 md:w-24 shrink-0 flex items-center justify-center">
                  <span className="text-white text-3xl md:text-4xl   font-cal-sans">R</span>
                </div>
                <div className="p-4 md:p-6 flex flex-col justify-center">
                  <h4 className="text-gray-950   mb-1 text-base md:text-lg">Responsible Innovation</h4>
                  <p className="text-gray-600 text-sm">
                    We use technology, including AI, ethically and safely.
                  </p>
                </div>
              </div>
              {/* G */}
              <div className="flex bg-white rounded-r-2xl rounded-l-2xl overflow-hidden shadow-sm border border-pink-100 items-stretch">
                <div className="bg-[#D81B7E] w-16 md:w-24 shrink-0 flex items-center justify-center">
                  <span className="text-white text-3xl md:text-4xl   font-cal-sans">G</span>
                </div>
                <div className="p-4 md:p-6 flex flex-col justify-center">
                  <h4 className="text-gray-950   mb-1 text-base md:text-lg">Gender Leadership</h4>
                  <p className="text-gray-600 text-sm">
                    We actively support the growth, voice, and leadership of
                    African girls and women.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              4. Expected Behaviour
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base">
              <p>All individuals must:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Treat others with dignity, respect, and fairness.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Use inclusive, non-discriminatory language.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Maintain professionalism in all interactions.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Respect privacy, boundaries, and personal data.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Provide constructive and respectful feedback.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Give proper credit and respect intellectual property.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Act in a way that reflects ROTAGI's mission and values.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Comply with all safeguarding and child protection requirements.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              5. Unacceptable Behaviour
            </h2>
            <p className="text-gray-700 mb-6 text-sm md:text-base">ROTAGI has zero tolerance for:</p>
            <div className="flex flex-col gap-4">
              {/* Full width cards */}
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
                <h4 className="  text-gray-950 mb-4 text-base md:text-lg">Harassment and abuse</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                    <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    Bullying, intimidation, or hostile behaviour.
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                    <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    Verbal, emotional, physical, or sexual abuse.
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                    <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    Any inappropriate or unwanted advances.
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
                <h4 className="  text-gray-950 mb-4 text-base md:text-lg">Discrimination</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                    <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    Discrimination based on gender, age, religion, ethnicity, or background.
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                    <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    Exclusion or marginalisation of participants.
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
                <h4 className="  text-gray-950 mb-4 text-base md:text-lg">Privacy violations</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                        <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                          <Check size={14} strokeWidth={3} />
                        </div>
                    Sharing personal information without consent.
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                        <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                          <Check size={14} strokeWidth={3} />
                        </div>
                    Recording or distributing content without permission.
                  </li>
                </ul>
              </div>

              {/* Side by side cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
                  <h4 className=" text-gray-950 mb-4 text-base md:text-lg">Misuse of Technology</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                        <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      Using AI tools to harm, deceive, or manipulate.
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                      <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      Plagiarism or misrepresentation of work.
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                      <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      Attempting to hack or disrupt ROTAGI systems.
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
                  <h4 className="  text-gray-950 mb-4 text-base md:text-lg">Misuse of Position</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                      <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      Abuse of authority or influence.
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                      <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      Misrepresentation of identity or affiliation.
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                      <div className="mt-0.5 bg-[#FFD6E8] rounded-full p-0.5 text-[#D81B7E] shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      Actions that damage ROTAGI's reputation.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              6. Safeguarding and Protection of Children
            </h2>
            <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                ROTAGI works with participants from the age of 10. The safety of
                all participants under 18 is a priority.
              </p>
              <div className="space-y-4">
                <p>All adults must:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-black   mt-1">-</span> Maintain strict professional boundaries with minors.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black   mt-1">-</span> Communicate only through official ROTAGI platforms.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black   mt-1">-</span> Avoid one-to-one private interactions with minors.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black   mt-1">-</span> Never request personal contact details from minors.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black   mt-1">-</span> Report any safeguarding concern immediately.
                  </li>
                </ul>
              </div>
              <div className="bg-[#FF66B2] text-white p-4 rounded-xl font-medium mt-6">
                Failure to comply with safeguarding standards may result in immediate removal and referral to relevant authorities.
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              7. Safeguarding Contacts
            </h2>
            <p className="text-gray-700 mb-8 text-sm md:text-base">
              ROTAGI maintains designated safeguarding leadership with
              internationally recognised qualifications. All safeguarding
              concerns must be reported immediately.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-pink-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-gray-950   mb-4 text-base md:text-lg border-b border-pink-100 pb-2">
                    Designated Safeguarding Lead
                  </h4>
                  <p className="  text-gray-900 text-base md:text-lg mb-1">Olayemi Arokoyo</p>
                  <p className="text-gray-500 text-sm mb-6">Executive Director, ROTAGI</p>
                </div>
                <div className="bg-[#FDF2F8] p-4 rounded-xl space-y-1">
                  <p className="text-xs text-gray-500">Issuer: Disclosure Scotland</p>
                  <p className="text-sm font-semibold text-gray-900">Document: PVG Scheme (UK)</p>
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-pink-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-gray-950   mb-4 text-base md:text-lg border-b border-pink-100 pb-2">
                    Deputy Designated Safeguarding Lead
                  </h4>
                  <p className="  text-gray-900 text-base md:text-lg mb-1">
                    Lola Inès Raïssa Agondogo
                  </p>
                  <p className="text-gray-500 text-sm mb-6">Safeguarding Lead, ROTAGI</p>
                </div>
                <div className="bg-[#FDF2F8] p-4 rounded-xl space-y-1">
                  <p className="text-xs text-gray-500">Issuer: gov.uk / DBS</p>
                  <p className="text-sm font-semibold text-gray-900">Document: DBS Certified (Disclosure and Barring Service UK)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              8. Digital and Platform Conduct
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base">
              <p>When using ROTAGI platforms:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Do not share harmful, offensive, or misleading content.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Do not spam or disrupt community spaces.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Respect the confidentiality of discussions and materials.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Do not attempt unauthorised access to systems.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Use your real identity when required.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              9. Responsible Use of AI
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base">
              <p>All participants must:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Use AI tools responsibly and ethically.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Disclose the use of AI in submitted work.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Avoid generating harmful, biased, or misleading content.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black   mt-1">-</span> Respect intellectual property when using AI generated outputs.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              10. Reporting Violations
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                If you experience or witness a violation of this Code of
                Conduct, please report it.
              </p>
              <p>
                All reports are handled confidentially and investigated
                promptly.
              </p>
              <p>
                ROTAGI does not tolerate retaliation against anyone reporting in
                good faith.
              </p>
              
              <div className="bg-[#FF66B2] text-white p-6 rounded-2xl mt-8">
                <p className="  mb-3 text-base md:text-lg">How to report</p>
                <p className="mb-2">Email: <a href="mailto:privacy@rotagif.com" className="underline font-medium">privacy@rotagif.com</a></p>
                <p>Or contact the safeguarding leads directly (see section 7)</p>
              </div>
            </div>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              11. Appeals and Grievance Process
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                ROTAGI is committed to fairness and due process. Any individual subject to disciplinary action under this Code has the right to appeal the decision.
              </p>
              <p>
                Appeals must be submitted in writing to the Board of Trustees within 14 days of the decision. The Board's decision on appeals is final.
              </p>
            </div>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              12. Consequences of Violations
            </h2>
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              Depending on severity actions may include:
            </p>
            <div className="overflow-x-auto bg-white rounded-xl border border-pink-100 p-2 md:p-4 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4   text-gray-950 border-b border-pink-100 text-sm md:text-base">Severity</th>
                    <th className="p-4   text-gray-950 border-b border-pink-100 text-sm md:text-base">Consequence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 text-sm md:text-base text-gray-700">
                  <tr>
                    <td className="p-4 font-semibold text-gray-900 w-1/3">
                      Minor violation
                    </td>
                    <td className="p-4">
                      Verbal or written guidance.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-gray-900">
                      Repeated or moderate
                    </td>
                    <td className="p-4">
                      Formal warning. Temporary suspension from Programs or
                      platforms.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-gray-900">
                      Serious violation
                    </td>
                    <td className="p-4">
                      Permanent removal from all ROTAGI activities and
                      termination of role or partnership.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-gray-900">
                      Harm to a child
                    </td>
                    <td className="p-4">
                      Immediate removal and referral to relevant Nigerian child
                      protection authorities.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-gray-900">
                      Extreme cases
                    </td>
                    <td className="p-4">
                      Legal action, including referral to law enforcement where
                      required.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-xl md:text-2xl font-cal-sans   text-gray-950 mb-6 uppercase">
              13. Updates and Agreement
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                ROTAGI may update this Code of Conduct periodically to reflect
                changes in our Programs, platforms, or community standards.
                Updated versions will be published on our website at{" "}
                <a
                  href="https://www.rotagif.com"
                  className="text-[#D81B7E] hover:underline font-medium"
                >
                  www.rotagif.com
                </a>
                .
              </p>
              <p>
                By engaging with ROTAGI, you confirm that you have read,
                understood, and agreed to comply with this Code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
