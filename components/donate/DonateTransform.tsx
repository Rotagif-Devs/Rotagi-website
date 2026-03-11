"use client";

import { useState, useEffect } from "react";
import Stepper from "./Stepper";
import DonateDefault from "./DonateDefault";
import DonateDetails from "./DonateDetails";
import DonateComplete from "./DonateComplete";
import CardDetails from "../globalComp/CardDetails";

import Loader from "../globalComp/Loader";
import DonateSuccessful from "./DonateSuccessful";
import DonateFailed from "./DonateFailed";

import {
  DonationData,
  CardInputs,
  DonationDetailsInputs,
} from "@/types/donation";

const DonateTransform = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<DonationData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");

  /* Prevent page scroll when modal opens */
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleDefaultNext = () => setStep(1);

  const handleDetailsNext = (data: DonationDetailsInputs) => {
    setFormData(data as DonationData);
    setStep(2);
  };

  const handleConfirm = () => setShowModal(true);

  const handleCardSubmit = async (cardData: CardInputs) => {
    setFormData((prev) => ({
      ...prev!,
      ...cardData,
    }));

    setShowModal(false);

    setPaymentStatus("loading");

    try {
      /* simulate API */
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setPaymentStatus("success");
    } catch {
      setPaymentStatus("failed");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  /* RESET PAGE BACK TO NORMAL DONATE FLOW */
  const handleReturnToDonate = () => {
    setPaymentStatus("idle");
    setStep(0);
    setFormData(null);
  };

  return (
    <section className="w-full">
      {/* LOADING */}
      {paymentStatus === "loading" && <Loader />}

      {/* SUCCESS HERO */}
      {paymentStatus === "success" && (
        <DonateSuccessful onReturn={handleReturnToDonate} />
      )}

      {/* FAILED HERO */}
      {paymentStatus === "failed" && (
        <DonateFailed onReturn={handleReturnToDonate} />
      )}

      {/* NORMAL DONATE FLOW */}
      {paymentStatus === "idle" && (
        <>
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
        </>
      )}

      {/* PAYMENT MODAL */}
      {showModal && formData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
          <CardDetails
            data={{ amount: formData.amount }}
            amount={formData.amount}
            onNext={handleCardSubmit}
            onReturn={handleCloseModal}
          />
        </div>
      )}
    </section>
  );
};

export default DonateTransform;
