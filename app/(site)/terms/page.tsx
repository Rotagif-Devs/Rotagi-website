"use client";
import TermsHero from "@/components/Terms/TermsHero";
import TermsContent from "@/components/Terms/TermsContent";
import React, { useState, useEffect } from "react";


const HERO_DATA = {
  title: "Terms & Conditions",
};

export default function TermsPage() {

  return (
    <section className="relative">
      <TermsHero title={HERO_DATA.title}/>
      <div className="px-4 py-4">
          <TermsContent/>
      </div>
    
    </section>
  );
}