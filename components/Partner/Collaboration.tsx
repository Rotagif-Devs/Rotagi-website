import React from 'react'
import VideoPlayer from '../globalComp/Videoplayer';
import Button from "../ui/Button";

const partnershipOptions = [
  {
    title: "Strategic Sponsorship",
    description: "Support our programmes through financial contributions and receive meaningful recognition across our platforms.",
    bullets: [
      "Brand visibility at the SHE Empower Conference and ROTAGI events",
      "Recognition in our annual impact reports",
      "Dedicated acknowledgement on the ROTAGI website and social media"
    ]
  },
  {
    title: "Technology Partnerships",
    description: "Provide technology resources, tools, and platforms that enhance our programme delivery and participant experience.",
    bullets: [
      "Learning platform access and integrations",
      "Hardware, equipment, and device donations",
      "Software licences, AI subscriptions, and digital tools"
    ]
  },
  {
    title: "Talent Pipeline Development",
    description: "Connect your organisation with our trained, motivated graduates for internships, employment, and career development.",
    bullets: [
      "Early access to talented, trained candidates",
      "Custom training programmes aligned to your hiring needs",
      "Participation in ROTAGI recruitment and careers events"
    ]
  },
  {
    title: "Programme Co-Development",
    description: "Work with ROTAGI to design and deliver training content, workshops, or bootcamps that reflect your industry's needs and our community's goals.",
    bullets: []
  }
];

const Collaboration = () => {
  return (
    <> 
    <section className="py-20 px-6  bg-white mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4">We Are Building a Powerful Network of Collaboration</h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-16">
      ROTAGI works with a wide range of organisations, institutions, and individuals who share our 
      commitment to digital inclusion and gender equality in technology.
    </p>

    <div className="grid md:grid-cols-2 lg:px-10 gap-8 text-left">
      {/* Collaborators Card */}
      <div className="p-10 border  border-gray-100 rounded-3xl shadow-sm bg-white">
        <h3 className="text-xl font-bold mb-6">We collaborate with:</h3>
        <ul className="space-y-3 text-gray-700">
          <li>• Tech Industry Leaders</li>
          <li>• AI Ethics Experts</li>
          <li>• Educational Institutions</li>
          <li>• Corporate Partners</li>
          <li>• NGOs And Social Impact Organisations</li>
          <li>• Government And Development Agencies</li>
        </ul>
      </div>

      {/* Benefits Card */}
      <div className="p-10 border border-gray-100 rounded-3xl shadow-sm bg-white">
        <h3 className="text-xl font-bold mb-6">Through our partnerships, African girls and young women are able to:</h3>
        <ul className="space-y-3 text-gray-700">
          <li>• Build Real Digital Products And Solutions</li>
          <li>• Master AI Tools And Technology Skills</li>
          <li>• Build Confidence And Leadership</li>
          <li>• Access Career Pathways And Economic Opportunities</li>
          <li>• Create Sustainable Impact In Their Communities</li>
        </ul>
      </div>
      </div>
      
      <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">Ways We Can Work Together</h2>
      
      <div className="space-y-8">
        {partnershipOptions.map((item, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden border border-gray-100 shadow">
            {/* Header */}
            <div className="bg-[#d63384] text-white px-8 py-4 font-bold text-lg">
              {item.title}
            </div>
            {/* Body */}
            <div className="bg-white p-8">
              <p className="text-gray-600 mb-6">{item.description}</p>
              {item.bullets.length > 0 && (
                <ul className="space-y-2 text-gray-700">
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>• {bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
      </section>
      
    </section>
      <section className=" py-16 md:py-16 flex justify-center">
      <div className="flex w-full max-w-315 flex-col gap-10 px-5 md:px-0 md:gap-19">
        {/* Title + description + buttons area */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="font-cal-sans text-dark text-3xl leading-tight tracking-tight md:max-w-150 md:text-[38px] md:leading-[110%]">
            Let's Build The Future <br className="hidden md:block" /> Together
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-145">
            <p className="font-dm-sans text-darkgray text-left text-base leading-relaxed md:text-[16px] md:leading-[160%]">
            Partner with us to scale our impact and reach more African girls across Africa. 
            </p>

            <div className="hidden md:flex gap-4">
                <Button  href="/partner/inquiry" variant="primary" className="">
              
                Partner with us
              </Button>
              <Button href="/contact" variant="secondary" className="">
                Contact us
              </Button>
            </div>
          </div>
        </div>

        {/* Video / hero preview */}
        <div className="flex w-full justify-center">
          <VideoPlayer />
        </div>

        {/* Mobile buttons */}
        <div className="flex gap-4 justify-center md:hidden sm:flex-row">
          <Button
            href="/donate"
            variant="primary"
            className="text-center text-sm"
          >
            Donate Now
          </Button>
          <Button
            href="/programs"
            variant="secondary"
            className="text-center text-sm"
          >
            Explore Programs
          </Button>
        </div>
      </div>
      </section>
      </>
  )
}

export default Collaboration