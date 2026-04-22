import React from 'react';

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-[#FCE7F3]">
      {/* Hero Section */}
      <section className="relative bg-[#2D0F21] py-20 px-4 text-center text-white lg:mx-4 min-h-[400px] md:min-h-[300px] lg:rounded-2xl flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-cal-sans font-normal mb-4">Code of Conduct</h1>
          <p className="text-pink-200 font-light text-lg">
            Safe, Inclusive, and Responsible Engagement Across All ROTAGI Platforms and Programmes
          </p>
          <p className="text-pink-200/60 text-sm mt-4">Effective Date: April 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="space-y-12">
          
          {/* Section 1 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">1. Our Commitment</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>ROTAGI is committed to creating safe, inclusive, respectful, and empowering environments for African girls and young women across all our programmes, platforms, and events.</p>
              <p>This Code of Conduct sets out the standards of behaviour expected from everyone engaging with ROTAGI. By participating in any ROTAGI activity, you agree to uphold these standards.</p>
              <p>ROTAGI operates in accordance with:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The Child Rights Act (Nigeria, 2003)</li>
                <li>The Nigeria Data Protection Act (NDPA, 2023)</li>
                <li>The Companies and Allied Matters Act (CAMA)</li>
                <li>International safeguarding and child protection standards</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">2. Scope</h2>
            <div className="space-y-4 text-gray-700">
              <p>This Code applies to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>All programme participants: She Ignite, She Blossom, She Blaze, She Ascend</li>
                <li>Mentors, facilitators, and instructors</li>
                <li>ROTAGI staff and volunteers</li>
                <li>Board of Trustees</li>
                <li>Partners and sponsors</li>
                <li>Event attendees and guests</li>
                <li>All users of the ROTAGI website and learning platform</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">3. Our Core Values</h2>
            <p className="text-gray-700 mb-8">All behaviour within ROTAGI is guided by the MERG Framework, our four core values that shape everything we do.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <div className="text-3xl font-bold text-[#D81B7E] mb-2">M</div>
                <h4 className="font-semibold text-gray-900 mb-2">Measurable Impact</h4>
                <p className="text-gray-600 text-sm">We act with purpose and contribute meaningfully to learning and development.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <div className="text-3xl font-bold text-[#D81B7E] mb-2">E</div>
                <h4 className="font-semibold text-gray-900 mb-2">Equitable Access</h4>
                <p className="text-gray-600 text-sm">We promote inclusion and remove barriers to participation.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <div className="text-3xl font-bold text-[#D81B7E] mb-2">R</div>
                <h4 className="font-semibold text-gray-900 mb-2">Responsible Innovation</h4>
                <p className="text-gray-600 text-sm">We use technology, including AI, ethically and safely.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <div className="text-3xl font-bold text-[#D81B7E] mb-2">G</div>
                <h4 className="font-semibold text-gray-900 mb-2">Gender Leadership</h4>
                <p className="text-gray-600 text-sm">We actively support the growth, voice, and leadership of African girls and women.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">4. Expected Behaviour</h2>
            <div className="space-y-4 text-gray-700">
              <p>All individuals must:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Treat others with dignity, respect, and fairness.</li>
                <li>Use inclusive, non-discriminatory language.</li>
                <li>Maintain professionalism in all interactions.</li>
                <li>Respect privacy, boundaries, and personal data.</li>
                <li>Provide constructive and respectful feedback.</li>
                <li>Give proper credit and respect intellectual property.</li>
                <li>Act in a way that reflects ROTAGI's mission and values.</li>
                <li>Comply with all safeguarding and child protection requirements.</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">5. Unacceptable Behaviour</h2>
            <p className="text-gray-700 mb-6">ROTAGI has zero tolerance for:</p>
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold text-[#D81B7E] mb-3">Harassment and Abuse</h4>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Bullying, intimidation, or threatening behaviour.</li>
                  <li>Verbal, emotional, physical, or sexual abuse.</li>
                  <li>Any inappropriate or unwanted advances.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#D81B7E] mb-3">Discrimination</h4>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Discrimination based on gender, age, religion, ethnicity, disability, or background.</li>
                  <li>Exclusion or marginalisation of participants.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#D81B7E] mb-3">Privacy Violations</h4>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Sharing personal information without consent.</li>
                  <li>Recording or distributing content without permission.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#D81B7E] mb-3">Misuse of Technology</h4>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Using AI or digital tools to harm, deceive, or manipulate.</li>
                  <li>Plagiarism or misrepresentation of work.</li>
                  <li>Attempting to hack or disrupt ROTAGI systems.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#D81B7E] mb-3">Misuse of Position</h4>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Abuse of authority or influence.</li>
                  <li>Misrepresentation of identity or affiliation.</li>
                  <li>Actions that damage ROTAGI's reputation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">6. Safeguarding and Protection of Children</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>ROTAGI works with participants from the age of 10. The safety of all participants under 18 is a priority.</p>
              <p>All adults must:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Maintain strict professional boundaries with minors.</li>
                <li>Communicate only through official ROTAGI platforms.</li>
                <li>Avoid one-to-one private interactions with minors.</li>
                <li>Never request personal contact details from minors.</li>
                <li>Report any safeguarding concern immediately.</li>
              </ul>
              <p className="font-medium text-red-600 mt-4 italic">Failure to comply with safeguarding standards may result in immediate removal and referral to relevant authorities.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">7. Safeguarding Contacts</h2>
            <p className="text-gray-700 mb-8">ROTAGI maintains designated safeguarding leadership with internationally recognised qualifications. All safeguarding concerns must be reported immediately.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100">
                <h4 className="font-semibold text-gray-900 mb-4 border-b pb-2">Designated Safeguarding Lead</h4>
                <div className="space-y-2 text-gray-700">
                  <p className="font-bold text-[#D81B7E]">Olayemi Arokoyo</p>
                  <p className="text-sm">Executive Director, ROTAGI</p>
                  <p className="text-sm italic text-gray-500">Disclosure Scotland PVG Scheme (UK)</p>
                  <a href="mailto:Oarokoyo@rotagif.com" className="text-[#D81B7E] hover:underline block pt-2">Oarokoyo@rotagif.com</a>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100">
                <h4 className="font-semibold text-gray-900 mb-4 border-b pb-2">Deputy Designated Safeguarding Lead</h4>
                <div className="space-y-2 text-gray-700">
                  <p className="font-bold text-[#D81B7E]">Lola Inès Raïssa Agondogo</p>
                  <p className="text-sm">Safeguarding Lead, ROTAGI</p>
                  <p className="text-sm italic text-gray-500">DBS Certified Disclosure and Barring Service (UK)</p>
                  <a href="mailto:lagondogo@rotagif.com" className="text-[#D81B7E] hover:underline block pt-2">lagondogo@rotagif.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">8. Digital and Platform Conduct</h2>
            <div className="space-y-4 text-gray-700">
              <p>When using ROTAGI platforms:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Do not share harmful, offensive, or misleading content.</li>
                <li>Do not spam or disrupt community spaces.</li>
                <li>Respect the confidentiality of discussions and materials.</li>
                <li>Do not attempt unauthorised access to systems.</li>
                <li>Use your real identity when required.</li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">9. Responsible Use of AI</h2>
            <div className="space-y-4 text-gray-700">
              <p>All participants must:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Use AI tools responsibly and ethically.</li>
                <li>Disclose the use of AI in submitted work.</li>
                <li>Avoid generating harmful, biased, or misleading content.</li>
                <li>Respect intellectual property when using AI generated outputs.</li>
              </ul>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">10. Reporting Violations</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>If you experience or witness a violation of this Code of Conduct, please report it.</p>
              <p>All reports are handled confidentially and investigated promptly.</p>
              <p>ROTAGI does not tolerate retaliation against anyone reporting in good faith.</p>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#D81B7E] mt-4">
                <p className="font-bold mb-2">How to report:</p>
                <p>Email: <a href="mailto:privacy@rotagif.com" className="text-[#D81B7E] hover:underline">privacy@rotagif.com</a>. Or contact the safeguarding leads directly (see Section 7).</p>
              </div>
            </div>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">11. Consequences of Violations</h2>
            <p className="text-gray-700 mb-6">Depending on severity actions may include:</p>
            <div className="overflow-x-auto rounded-2xl border border-pink-100 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#2D0F21] text-white">
                    <th className="px-6 py-4 font-bold">Severity</th>
                    <th className="px-6 py-4 font-bold">Consequence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50">
                  <tr>
                    <td className="px-6 py-4 font-bold text-gray-900">Minor violation</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Verbal or written guidance</td>
                  </tr>
                  <tr className="bg-pink-50/30">
                    <td className="px-6 py-4 font-bold text-gray-900">Repeated or moderate</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Formal warning. Temporary suspension from programmes or platforms.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-gray-900">Serious violation</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Permanent removal from all ROTAGI activities and termination of role or partnership.</td>
                  </tr>
                  <tr className="bg-pink-50/30">
                    <td className="px-6 py-4 font-bold text-gray-900">Harm to a child</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Immediate removal and referral to relevant Nigerian child protection authorities.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-gray-900">Extreme cases</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Legal action, including referral to law enforcement where required.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 12 */}
          <div className="pt-8 border-t border-pink-200">
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-6">12. Updates and Agreement</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>ROTAGI may update this Code of Conduct periodically to reflect changes in our programmes, platforms, or community standards. Updated versions will be published on our website at <a href="https://www.rotagif.com" className="text-[#D81B7E] hover:underline">www.rotagif.com</a>.</p>
              <p>By engaging with ROTAGI, you confirm that you have read, understood, and agreed to comply with this Code.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
