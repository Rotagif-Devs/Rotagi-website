import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FCE7F3]">
   
      <section className="bg-[#2D0F21] py-20 px-4 text-center text-white lg:mx-4 min-h-[400px] md:min-h-[300px] lg:rounded-2xl  ">
      
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl mt-20 md:mt-0 md:text-6xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-pink-200 font-light">Last updated: January 10, 2026</p>
        </div>
      </section>

    
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="space-y-12">
          
        
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              ROTASI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our programs.
            </p>
          </div>

     
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Name, email address, and phone number</li>
              <li>Program application information</li>
              <li>Payment and donation information</li>
              <li>Communication preferences</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Process program applications and registrations</li>
              <li>Communicate with you about programs and events</li>
              <li>Process donations and issue receipts</li>
              <li>Improve our programs and services</li>
              <li>Send newsletters and updates (with your consent)</li>
            </ul>
          </div>

         
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our programs, subject to confidentiality agreements.
            </p>
          </div>

         
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
<div>
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
  <p className="text-gray-700 mb-4">You have the right to:</p>
  <ul className="list-disc ml-6 space-y-2 text-gray-700">
    <li>Access your personal information</li>
    <li>Correct inaccurate information</li>
    <li>Request deletion of your information</li>
    <li>Opt-out of marketing communications</li>
  </ul>
</div>

<div className="pt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
  <p className="text-gray-700 leading-relaxed">
    If you have questions about this Privacy Policy, please contact us at:{" "}
    <a 
      href="mailto:info@rotagi.org" 
      className="text-[#D81B7E] italic font-medium hover:underline transition-all"
    >
      info@rotagi.org
    </a>
  </p>
</div>
        </div>
      </section>
    </div>
  );
}