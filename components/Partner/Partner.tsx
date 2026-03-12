"use client";

import React from "react";
import PartnerHero from "./PartnerHero";
import PartnerInfo from "./PartnerInfo";

const Partner = () => {
  return (
    <div className="flex flex-col">
      <PartnerHero />
      <PartnerInfo />
    </div>
  );
};

export default Partner;
