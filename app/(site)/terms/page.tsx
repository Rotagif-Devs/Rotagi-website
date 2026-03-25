"use client";
import TermsHero from "@/components/Terms/TermsHero";
import TermsContent from "@/components/Terms/TermsContent";
import React, { useState, useEffect } from "react";


const HERO_DATA = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  
  // const [activeSection, setActiveSection] = useState("introduction");
  // const [menuOpen, setMenuOpen] = useState(false);

  // const scrollToSection = (id: string) => {
  //   const el = document.getElementById(id);
  //   if (!el) return;
  //   const yOffset = -120;
  //   const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  //   window.scrollTo({ top: y, behavior: "smooth" });
  //   setActiveSection(id);
  //   setMenuOpen(false); // close mobile menu after click
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     let closest = "";
  //     let minDist = Infinity;
  //     sections.forEach((s) => {
  //       const el = document.getElementById(s.id);
  //       if (!el) return;
  //       const rect = el.getBoundingClientRect();
  //       const dist = Math.abs(rect.top - 120);
  //       if (dist < minDist) {
  //         minDist = dist;
  //         closest = s.id;
  //       }
  //     });
  //     if (closest) setActiveSection(closest);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll();
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <section className="relative">
      <TermsHero title={HERO_DATA.title}/>
      <div className="px-4 py-4">
          <TermsContent/>
      </div>
    
      {/* <div className="md:hidden fixed top-4 left-4 right-4 z-50 bg-white shadow-md rounded-md px-4 py-2 flex justify-between items-center">
        <span className="font-semibold text-gray-800">Contents</span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 font-bold text-xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 bg-white shadow-md rounded-md p-4 z-40 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all ${
                activeSection === section.id
                  ? "bg-pink-500 text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}
      <aside className="hidden md:flex flex-col fixed left-10 top-32 w-60 space-y-4">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">Contents</h3>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left text-sm transition-all ${
              activeSection === section.id
                ? "bg-pink-500 text-white px-3 py-1.5 rounded-md"
                : "text-gray-700 hover:text-black"
            }`}
          >
            {section.title}
          </button>
        ))}
      </aside>

      <main className="flex-1  px-6  pt-32 space-y-20">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Pellentesque euismod, nisi vel consectetur euismod.
            </p>
          </section>
        ))}
      </main> */}
    </section>
  );
}