import React from 'react'

const Hero = () => {
  return (
    <div>
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
          <h1 className="text-5xl md:text-6xl font-cal-sans font-normal mb-4">
            CHILD PROTECTION POLICY
          </h1>
          <p className="text-pink-200 font-light text-sm">
            Safeguarding African girls and young women across all ROTAGI Programs and platforms
          </p>
       
        </div>
      </section>
    </div>
  )
}

export default Hero