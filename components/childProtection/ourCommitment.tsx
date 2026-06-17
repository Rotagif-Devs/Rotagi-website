"use client";

const SafeguardingPolicy = () => {
  return (
    <div className="bg-[#fae8f0] min-h-screen text-gray-800 font-sans">
      <section className="max-w-6xl mx-auto py-16 px-6 space-y-16">
        
        {/* Header Metadata */}
        <div className="text-sm font-medium text-[#D62D88] mb-8">
          Effective: <span className="text-[#46455F]">May 2026 | Reviewed annually</span> 
        </div>

        {/* 1. OUR COMMITMENT */}
        <div>
          <h2 className="text-3xl  text-gray-900 mb-6 uppercase tracking-wide">
            1. OUR COMMITMENT
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-base">
            <p>
              ROTAGI is committed to protecting the safety, dignity, and wellbeing of every child in our community.
            </p>
            <p>
              We work with African girls from the age of 10. Every child who participates in our Programs online or in person has the right to be safe, respected, and free from harm, abuse, and exploitation.
            </p>
            <p>
              This policy follows a "do no harm" approach and is aligned with:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>The Child Rights Act (Nigeria, 2003)</li>
              <li>The Nigeria Data Protection Act (NDPA, 2023)</li>
              <li>The United Nations Convention on the Rights of the Child (UNCRC)</li>
              <li>International safeguarding standards</li>
            </ul>
          </div>
        </div>

        {/* 2. WHO THIS POLICY APPLIES TO */}
        <div>
          <h2 className="text-3xl  text-gray-900 mb-6 uppercase tracking-wide">
            2. WHO THIS POLICY APPLIES TO
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>This policy applies to everyone involved with ROTAGI:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Participants across all Programs</li>
              <li>Staff and volunteers</li>
              <li>Mentors and facilitators</li>
              <li>Board of Trustees</li>
              <li>Partners and sponsors</li>
              <li>Event attendees and platform users</li>
            </ul>
            
            {/* Highlight Banner */}
            <div className="mt-6 bg-[#ff94da] text-gray-900 py-3 px-4 rounded-xl font-medium">
              A child is defined as any person under the age of 18.
            </div>
          </div>
        </div>

        {/* 3. SAFEGUARDING LEADERSHIP */}
       <div>
  <h2 className="text-3xl  text-gray-900 mb-6 uppercase tracking-wide">
    3. SAFEGUARDING LEADERSHIP
  </h2>
  <p className="text-gray-700 mb-6">
    ROTAGI has designated safeguarding leads responsible for all child protection matters.
  </p>
  
  {/* Leadership Cards Grid */}
  <div className="grid md:grid-cols-2 gap-6">
    {/* Lead 1 */}
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D62D881F]">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Designated Safeguarding Lead</h3>
      <div className="font-semibold text-gray-800">Olayemi Arokayo</div>
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <span>Oarokayo@rotagilf.com</span>
        <button 
          onClick={() => navigator.clipboard.writeText('Oarokayo@rotagilf.com')}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
          title="Copy email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <div className="bg-[#fae8f0] p-3 rounded-xl text-xs text-gray-700 space-y-1">
        <div>Executive Director, ROTAGI</div>
        <div>Disclosure Scotland PVG Scheme (UK)</div>
      </div>
    </div>

    {/* Lead 2 */}
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D62D881F]">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Deputy Designated Safeguarding Lead</h3>
      <div className="font-semibold text-gray-800">Lola Inès Raïssa Agondogo</div>
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <span>lagondogo@rotagilf.com</span>
        <button 
          onClick={() => navigator.clipboard.writeText('lagondogo@rotagilf.com')}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
          title="Copy email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <div className="bg-[#fae8f0] p-3 rounded-xl text-xs text-gray-700 space-y-1">
        <div>Safeguarding Lead, ROTAGI</div>
        <div>DBS Certified, Disclosure and Barring Service (UK)</div>
      </div>
    </div>
  </div>
</div>
        {/* 4. OUR SAFEGUARDING PRINCIPLES */}
        <div>
          <h2 className="text-3xl  text-gray-900 mb-6 uppercase tracking-wide">
            4. OUR SAFEGUARDING PRINCIPLES
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>ROTAGI operates under the following principles:</p>
            <ul className="list-disc ml-6 space-y-3">
              <li><strong>Zero tolerance:</strong> No form of abuse or harm is accepted</li>
              <li><strong>Child first approach:</strong> The best interests of the child come first</li>
              <li><strong>Empowerment:</strong> African girls are encouraged to speak up and be heard</li>
              <li><strong>Confidentiality:</strong> Information is handled responsibly and shared only when necessary to protect a child</li>
              <li><strong>Accountability:</strong> Everyone connected to ROTAGI is responsible for safeguarding</li>
            </ul>
            <p className="pt-4 text-sm font-medium">
              4Rs framework: ROTAGI applies the Recognise, Respond, Report, and Record framework across safeguarding practice.
            </p>
          </div>
        </div>

        {/* 5. KEEPING CHILDREN SAFE */}
<div className="bg-[#fae8f0] py-12 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl  text-gray-900 mb-2 uppercase tracking-wide">
      5 . KEEPING CHILDREN SAFE
    </h2>
    <p className="text-xs text-gray-500 mb-8">
      ROTAGI takes active steps to protect children across all environments:
    </p>

    {/* Three Column Grid - items-end aligns them to the bottom like the image layout */}
    <div className="grid md:grid-cols-3 gap-6 items-end">
      
      {/* Card 1: Safe Recruitment - 228px */}
      <div className="bg-white p-8 lg:mb-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[200px] flex flex-col justify-start">
        <h3 className="text-base font-bold text-gray-900 mb-4">Safe Recruitment</h3>
        <ul className="space-y-3 text-xs text-slate-500 font-normal tracking-wide">
          <li className="flex items-center gap-3">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center">
              ✓
            </span>
            <span>Identity checks and references</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center">
              ✓
            </span>
            <span>Background checks where applicable</span>
          </li>
          <li className="flex items-start gap-3 leading-tight">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>Mandatory safeguarding agreement and training before any work begins</span>
          </li>
        </ul>
      </div>

      {/* Card 2: Safe Program Delivery - 252px */}
      <div className="bg-white lg:mb-5 p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[220px] flex flex-col justify-start">
        <h3 className="text-base font-bold text-gray-900 mb-4">Safe Program Delivery</h3>
        <ul className="space-y-3 text-xs text-slate-500 font-normal tracking-wide">
          <li className="flex items-center gap-3">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center">
              ✓
            </span>
            <span>No private one to one interactions</span>
          </li>
          <li className="flex items-start gap-3 leading-tight">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>All communication through official ROTAGI platforms only</span>
          </li>
          <li className="flex items-start gap-3 leading-tight">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>Adult supervision in all physical and virtual sessions</span>
          </li>
        </ul>
      </div>

      {/* Card 3: Online Safety - 276px */}
      <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[240px] flex flex-col justify-start">
        <h3 className="text-base font-bold text-gray-900 mb-4">Online Safety</h3>
        <ul className="space-y-3 text-xs text-slate-500 font-normal tracking-wide">
          <li className="flex items-start gap-3 leading-tight">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>Regular monitoring of the ROTAGI learning platform</span>
          </li>
          <li className="flex items-start gap-3 leading-tight">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>No private messaging between adults and minors</span>
          </li>
          <li className="flex items-start gap-3 leading-tight">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbcfe8] text-[#db2777] font-semibold text-[11px] flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>Parental consent required before any participant under 18 may access the platform</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</div>

        {/* 6. MEDIA AND CONSENT */}
        <div>
          <h2 className="text-3xl  text-gray-900 mb-6 uppercase tracking-wide">
            6. MEDIA AND CONSENT
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>No child is photographed or recorded without prior written parental consent</li>
            <li>Personal details are never shared publicly</li>
            <li>Images of children are used respectfully, in dignified and empowering contexts only</li>
            <li>Consent can be withdrawn at any time</li>
          </ul>
        </div>

        {/* 7. REPORTING A CONCERN */}
        <div>
          <h2 className="text-3xl  text-gray-900 mb-6 uppercase tracking-wide">
            7. REPORTING A CONCERN
          </h2>
          <p className="text-gray-700 mb-2">
            If you are concerned about a child's safety however small the concern please report it immediately.
          </p>
          <p className="text-gray-700 mb-6 font-medium">
            You do not need to be certain. If something feels wrong, tell us.
          </p>

          {/* Workflow Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex bg-white rounded-2xl overflow-hidden shadow-sm items-stretch">
              <div className="bg-gray-600 text-white font-bold text-3xl w-16 md:w-24 flex items-center justify-center">1</div>
              <div className="p-4 md:p-6 flex flex-col justify-center">
                <div className="font-bold text-gray-900">Report immediately to the Designated Safeguarding Lead.</div>
                <div className="text-xs text-gray-500 mt-1">Email Oarokayo@rotagilf.com or lagondogo@rotagilf.com. Do not delay.</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex bg-white rounded-2xl overflow-hidden shadow-sm items-stretch">
              <div className="bg-gray-600 text-white font-bold text-3xl w-16 md:w-24 flex items-center justify-center">2</div>
              <div className="p-4 md:p-6 flex flex-col justify-center">
                <div className="font-bold text-gray-900">Do not investigate the situation yourself.</div>
                <div className="text-xs text-gray-500 mt-1">Do not confront the person involved.</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex bg-white rounded-2xl overflow-hidden shadow-sm items-stretch">
              <div className="bg-gray-600 text-white font-bold text-3xl w-16 md:w-24 flex items-center justify-center">3</div>
              <div className="p-4 md:p-6 flex flex-col justify-center">
                <div className="font-bold text-gray-900">Write down what you observed, heard, or were told using the child's own words where possible.</div>
                <div className="text-xs text-gray-500 mt-1">Include the date, time, and location.</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex bg-white rounded-2xl overflow-hidden shadow-sm items-stretch">
              <div className="bg-gray-600 text-white font-bold text-3xl w-16 md:w-24 flex items-center justify-center">4</div>
              <div className="p-4 md:p-6 flex flex-col justify-center">
                <div className="font-bold text-gray-900">Send your written account to the Safeguarding Lead within 24 hours.</div>
              </div>
            </div>
          </div>

          {/* Confidentiality Warning Footer Box */}
          <div className="mt-6 bg-[#ff94da] text-gray-900 p-4 rounded-xl space-y-1 text-sm font-medium">
            <div>All reports are handled confidentially and acted upon promptly.</div>
            <div>ROTAGI will never penalise anyone who raises a concern in good faith.</div>
          </div>
        </div>

        {/* 8. CHILD HARM RESPONSE PROTOCOL (ZERO TOLERANCE) */}
        <div>
          <h2 className="text-3xl  text-gray-900 mb-6 uppercase tracking-wide">
            8. CHILD HARM RESPONSE PROTOCOL (ZERO TOLERANCE)
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Any incident involving harm to a child including physical, emotional, or sexual abuse, or criminal negligence is treated as a critical safeguarding incident and handled outside routine processes.
            </p>
            <p className=" text-gray-900">
              ROTAGI enforces zero tolerance in all such cases.
            </p>
            <p className="pt-2">Upon a credible report:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Immediate Safeguarding Action: The individual is suspended from all activities pending investigation</li>
              <li>Mandatory Reporting: Relevant law enforcement and child protection authorities are notified within 24 hours</li>
              <li>Internal Escalation: The Designated Safeguarding Lead assumes full case management</li>
              <li>Permanent Removal: Where substantiated, the individual is permanently removed from ROTAGI with no possibility of reinstatement</li>
            </ul>
          </div>
        </div>

        {/* 9. DATA PROTECTION AND CONFIDENTIALITY */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
            9. DATA PROTECTION AND CONFIDENTIALITY
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              ROTAGI protects all personal data in line with the Nigeria Data Protection Act (NDPA 2023).
            </p>
            <p className="pt-2">Safeguarding information is:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Stored securely with restricted access</li>
              <li>Accessed only when necessary to protect a child</li>
              <li>Shared only with those who need it including relevant authorities where required by law</li>
            </ul>
          </div>
        </div>

        {/* 10. POLICY REVIEW */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
            10. POLICY REVIEW
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>This policy is reviewed annually or when required due to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Changes to Nigerian child protection law</li>
              <li>A safeguarding incident</li>
              <li>Changes to ROTAGI's Programs or platforms</li>
            </ul>
            <p className="pt-6 text-sm  text-gray-600">
              This version is effective from May 2026 and will be reviewed by May 2027.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default SafeguardingPolicy;