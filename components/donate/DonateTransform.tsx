"use client";
import { useState } from "react";
import Stepper from "./Stepper";
import DonateDefault from "./DonateDefault";
import DonateDetails from "./DonateDetails";
import DonateComplete from "./DonateComplete";
import CardDetails from "../globalComp/CardDetails";

import {
  DonationData,
  CardInputs,
  DonationDetailsInputs,
} from "@/types/donation";

const DonateTransform = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<DonationData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDefaultNext = () => setStep(1);

  const handleDetailsNext = (data: DonationDetailsInputs) => {
    setFormData(data as DonationData);
    setStep(2);
  };

  const handleConfirm = () => setShowModal(true);

  const handleCardSubmit = (cardData: CardInputs) => {
    setFormData((prev) => ({
      ...prev!,
      ...cardData,
    }));
    setShowModal(false);
    setStep(3);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="w-full">
      {step > 0 && <Stepper currentStep={step} totalSteps={2} />}

      {step === 0 && <DonateDefault onNext={handleDefaultNext} />}

      {step === 1 && <DonateDetails onNext={handleDetailsNext} />}

      {step === 2 && formData && (
        <DonateComplete
          data={formData}
          onBack={() => setStep(1)}
          onNext={handleConfirm}
        />
      )}

      {showModal && formData && (
        <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-white bg-opacity-50 p-4 w-full">
          <div className="relative w-full">
            <CardDetails
              data={{ amount: formData.amount }}
              amount={formData.amount}
              onNext={handleCardSubmit}
            />
            <button
              className="absolute top-3 right-3 text-white font-bold text-xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DonateTransform;