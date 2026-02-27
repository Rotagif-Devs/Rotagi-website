"use client";
import { useState } from "react";
import Stepper from "./Stepper";
import DonateDefault from "./DonateDefault";
import DonateDetails from "./DonateDetails";
import DonateComplete from "./DonateComplete";

const DonateTransform = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(null);  
  
  const handleNext = (data: any) => {
    setFormData(data);  
    setStep((prev) => prev + 1);
  }
  return (
     <section className="w-full">
      {step > 0 && <Stepper currentStep={step} totalSteps={2} />}

      {step === 0 && (
        <DonateDefault onNext={() => setStep(1)} />
      )}

      {step === 1 && (
        <DonateDetails onNext={handleNext} />
      )}

      {step === 2 && formData && (
        <DonateComplete data={formData} onBack={() => setStep(1)} />
      )}
    </section>
  );
};

export default DonateTransform;