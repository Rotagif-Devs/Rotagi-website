import React from 'react'
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

const VolunteerHero = () => {
  return (
    <div>
        <section className="relative min-h-[800px] flex flex-col items-center justify-end bg-pink-950 lg:mx-4 lg:rounded-2xl overflow-hidden mt-6 md:mt-0">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/img1.png"
              width={1920}
              height={1000}
              alt="Volunteer"
              className="w-full h-[1000px] object-cover"
            
            />
          </div>
      <div className="absolute inset-0 bg-black/40" />
    
          <div className="relative z-10 flex flex-col justify-end w-full h-full pb-16 md:pb-20 overflow-hidden">
            <div className="mx-auto max-w-11/12 w-full flex flex-col justify-end h-full relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full mb-4 relative"
              >
                <h1 className="text-white w-[50%] pr-20 font-cal-sans text-6xl sm:text-5xl md:text-[72px] leading-[1.05] tracking-[-0.02em] mb-0 md:mb-0 uppercase">
                   Volunteer with ROTAGI
                </h1>
              </motion.div>
    
              <div className="flex flex-col md:flex-row md:items-end w-full gap-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-white/80 w-full md:w-[50%]  font-dm-sans font-normal text-base md:text-lg leading-[160%] m-0"
                >
               Empower African girls and young women by giving your time, skills, and voice to create lasting impact.
                </motion.p>
    
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="flex shrink-0 z-20 md:ml-auto"
                >
                  <Button
                    variant="secondary"
                    href="/programs"
                    
                    className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3.5 font-semibold"
                  >
                    Apply for a Volunteer
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
    

        </section>
      
    </div>
  )
}

export default VolunteerHero
