"use client";

import React from "react";
import PartnerHero from "./PartnerHero";
import PartnerInfo from "./PartnerInfo";

import Collaboration from "./Collaboration";

const Partner = () => {
  return (
    <div className="flex flex-col">
      <PartnerHero />
      <PartnerInfo />
     <Collaboration/>
    </div>
  );
};

export default Partner;
