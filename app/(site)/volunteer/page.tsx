"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import VolunteerHero from "@/components/Volunteer/VolunteerHero";
import Whyvolunteer from "@/components/Volunteer/Whyvolunteer";
import AmbassadorRoles from "@/components/Volunteer/AmbassadorRole";
import WhoWeWelcome from "@/components/Volunteer/Whowewelcome";
import WhatWeOffer from "@/components/Volunteer/Whatweoffer";
import VolunteerCTA from "@/components/globalComp/VolunteerCTA";
// import Apply from "@/components/Volunteer/Apply";

export default function VolunteerPage() {
  return (
    <div className="min-h-screen ">

      <VolunteerHero />
      <Whyvolunteer />
      <AmbassadorRoles />
      <WhoWeWelcome />
      <WhatWeOffer/>
      {/* <Apply /> */}
      <VolunteerCTA />
     
    </div>
  );
}
