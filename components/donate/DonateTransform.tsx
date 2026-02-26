"use client";
import { useState } from "react";
import Stepper from "./Stepper";
import DonateDefault from "./DonateDefault";
import DonateDetails from "./DonateDetails";
import DonateComplete from "./DonateComplete";

const DonateTransform = () => {
  // 0 = default page (no stepper)
  // 1 = donate details
  // 2 = complete
  const [step, setStep] = useState(0);

  return (
    <section className="w-full">

      {/* show stepper only for step 1 and 2 */}
      {step > 0 && (
        <Stepper currentStep={step} totalSteps={2} />
      )}

      {/* Default page */}
      {step === 0 && (
        <DonateDefault onNext={() => setStep(1)} />
      )}

      {/* Donate Details = Step 1 */}
      {step === 1 && (
        <DonateDetails onNext={() => setStep(2)} />
      )}

      {/* Complete = Step 2 */}
      {step === 2 && (
        <DonateComplete />
      )}

    </section>
  );
};

export default DonateTransform;