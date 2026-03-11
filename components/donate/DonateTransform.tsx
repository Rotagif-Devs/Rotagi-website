"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper from "./Stepper";
import DonateDefault from "./DonateDefault";
import DonateDetails from "./DonateDetails";
import DonateComplete from "./DonateComplete";
import CardDetails from "../globalComp/CardDetails";
import Loader from "../globalComp/Loader";
import DonateImpact from "./DonateImpact";

import {
  DonationData,
  CardInputs,
  DonationDetailsInputs,
} from "@/types/donation";

const DonateTransform = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<DonationData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading">(
    "idle",
  );

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
    const updatedData = {
      ...formData!,
      ...cardData,
    };

    setFormData(updatedData);
    setShowModal(false);
    setPaymentStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push(
        `/donate/success?amount=${updatedData.amount}&email=${updatedData.email}`,
      );
    } catch {
      router.push(
        `/donate/failed?amount=${updatedData.amount}&email=${updatedData.email}`,
      );
    }
  };

  const handleCloseModal = () => setShowModal(false);
  return (
    <section className="w-full">
      {/* LOADING */}
      {paymentStatus === "loading" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
          <Loader />
        </div>
      )}

      {/* NORMAL DONATE FLOW */}
      {paymentStatus === "idle" && (
        <div className="py-10 md:py-20">
          {step === 0 && <DonateImpact />}
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
        </div>
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
