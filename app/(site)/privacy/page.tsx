import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FCE7F3]">
      
      <section className="bg-[#2D0F21] py-20 px-4 text-center text-white lg:mx-4 min-h-[400px] md:min-h-[300px] lg:rounded-2xl relative">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
        ></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl mt-20 md:mt-0 md:text-6xl font-cal-sans font-normal mb-4 uppercase">Privacy Policy</h1>
          
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="space-y-12">
         
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              This Privacy Policy applies to everyone who interacts with ROTAGI: Program participants, event attendees, newsletter subscribers, donors, mentors, partners, and website visitors.
            </p>
            <p>
              We comply with the <strong>Nigeria Data Protection Act 2023 (NDPA)</strong>, which governs how we handle personal data.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">WHO WE ARE</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Reaching Out to African Girls Initiative (ROTAGI) is the data controller responsible for your personal information. We decide why and how your data is collected and used.
            </p>
            <p className="text-gray-700">
              For privacy matters, contact us at{' '}
              <a href="mailto:privacy@rotagif.com" className="text-[#D81B7E] hover:underline font-medium">
                privacy@rotagif.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">WHAT INFORMATION WE COLLECT</h2>
            
            <p className="text-gray-700 font-medium mb-3">Information you give us directly:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
              <li>Name, age or date of birth, gender</li>
              <li>Email address and phone number</li>
              <li>Location (city or country)</li>
              <li>Age group (for Program registration)</li>
              <li>Educational and professional background</li>
              <li>Name and contact details of a parent or guardian (for participants under 18)</li>
              <li>Event and Program feedback</li>
            </ul>

            <p className="text-gray-700 font-medium mb-3">Information we collect automatically:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
              <li>IP address, device type, and browser type</li>
              <li>Pages you visit on our website and how long you spend on them</li>
              <li>How you arrived at our website (e.g. search engine or social media)</li>
            </ul>

            <p className="text-gray-700 font-bold mb-2">What we do NOT collect</p>
            <p className="text-gray-700 mb-2">
              We do not collect sensitive financial information such as full card numbers or bank details.
            </p>
            <p className="text-gray-700">
              Donations are processed entirely by our secure payment providers (PayStack).
            </p>
          </div>

    
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">HOW WE USE YOUR INFORMATION</h2>
            <p className="text-gray-700 mb-4">We use your information to:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Provide access to our program, LMS platform, events, and community spaces</li>
              <li>Process program applications and match participants with relevant opportunities</li>
              <li>Communicate updates, event news, and newsletters (with your consent)</li>
              <li>Record and verify parental consent for participants under 18</li>
              <li>Measure our impact, track growth, and report anonymised data to funders</li>
              <li>Promote stories of impact from our community (with your explicit consent only)</li>
              <li>Improve our website, platform, and Programs</li>
              <li>Meet our obligations under Nigerian law, including NDPA 2023</li>
            </ul>
          </div>

         
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">CHILDREN'S PERSONAL DATA SPECIAL PROTECTIONS</h2>
            
         
            <div className="bg-[#FF85C0] text-gray-900 p-4 rounded-lg mb-6 font-medium">
              ROTAGI works with African girls from the age of 10. We apply the highest standards of care to the personal data of anyone under the age of 18.
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-2">Parental Consent</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We do not collect personal information from anyone under 18 without verified parental or guardian consent. If we discover we have collected data from a minor without appropriate consent, we will delete it immediately. Please report this to{' '}
              <a href="mailto:privacy@rotagif.com" className="text-[#D81B7E] hover:underline">
                privacy@rotagif.com
              </a>.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">How We Protect Children's Data</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Stored securely with restricted access - only authorised ROTAGI staff can view it</li>
              <li>Never shared with third parties for marketing or commercial purposes</li>
              <li>Used only for Program delivery, safeguarding, and communicating with parents or guardians</li>
              <li>Deleted in accordance with our retention policy</li>
            </ul>
          </div>

         
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">HOW WE SHARE YOUR INFORMATION</h2>
            <p className="text-gray-700 leading-relaxed">
              ROTAGI does not sell, rent, or trade your personal data. We only share it with trusted third parties where necessary.
            </p>
          </div>

     
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">COMMUNICATION PREFERENCES</h2>
            <p className="text-gray-700 mb-4">You are in control of how ROTAGI communicates with you:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
              <li><strong>Newsletter:</strong> use the unsubscribe link in any newsletter email at any time</li>
              <li><strong>Program communications:</strong> contact privacy@rotagif.com to update your preferences</li>
              <li><strong>Data deletion:</strong> email privacy@rotagif.com to request removal of your information</li>
            </ul>
            <p className="text-gray-700 italic">
              We will always respect your communication preferences and act on any changes within 30 days.
            </p>
          </div>

        
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">YOUR RIGHTS UNDER THE NDPA 2023</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
              <li>Be informed about how we use your personal data (this Privacy Policy)</li>
              <li>Access a copy of the personal data we hold about you</li>
              <li>Correct any inaccurate or incomplete information we hold</li>
              <li>Request deletion of your personal data in certain circumstances</li>
              <li>Withdraw consent at any time where consent is the basis for processing</li>
              <li>Lodge a complaint with the Nigeria Data Protection Commission (NDPC) at ndpc.gov.ng</li>
            </ul>
            <p className="text-gray-700">
              To exercise any of these rights, email{' '}
              <a href="mailto:privacy@rotagif.com" className="text-[#D81B7E] hover:underline font-medium">
                privacy@rotagif.com
              </a>. We will respond within 30 days and may need to verify your identity first.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">HOW WE PROTECT YOUR INFORMATION</h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
              <li>Secure HTTPS connections across our website and LMS platform</li>
              <li>Access to personal data restricted to authorised ROTAGI staff only</li>
              <li>Payments handled entirely by PayStack. ROTAGI never stores card details</li>
              <li>Regular review of our data handling practices and systems</li>
            </ul>
            <p className="text-gray-700">
              If you believe your data has been compromised, please contact us immediately at{' '}
              <a href="mailto:privacy@rotagif.com" className="text-[#D81B7E] hover:underline font-medium">
                privacy@rotagif.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">COOKIES</h2>
            <p className="text-gray-700 mb-4">We use three types of cookies:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li><strong>Essential cookies</strong> required for the site to function</li>
              <li><strong>Analytics cookies</strong> Google Analytics, helping us understand how the site is used</li>
              <li><strong>Newsletter cookies</strong> to manage your subscription if you sign up</li>
            </ul>
          </div>

  
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">CHANGES TO THIS POLICY</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will update the effective date on this page. For significant changes, we will notify you by email or through our website. Continued use of our services means you accept any updates.
            </p>
          </div>

    
          <div>
            <h2 className="text-3xl font-cal-sans font-medium text-gray-900 mb-4">CONTACT US AND HOW TO MAKE A COMPLAINT</h2>
            <p className="text-gray-700 mb-6">
              For any privacy questions, data requests, security concerns, or parental consent queries, please contact us:
            </p>
            
      
            <div className="bg-[#FF85C0] text-gray-900 p-6 rounded-lg space-y-3 font-medium">
              <p>
                <strong>Organisation:</strong> Reaching Out to African Girls Initiative (ROTAGI)
              </p>
              <p>
                <strong>Privacy, consent & security:</strong>{' '}
                <a href="mailto:privacy@rotagif.com" className="underline hover:text-gray-800">
                  privacy@rotagif.com
                </a>
              </p>
              <p>
                <strong>Phone (WhatsApp):</strong> +234 803 238 8560
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}