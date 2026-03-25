"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper from "./Stepper";
import DonateDefault from "./DonateDefault";
import DonateDetails from "./DonateDetails";
import DonateComplete from "./DonateComplete";
import Loader from "../globalComp/Loader";
import DonateImpact from "./DonateImpact";
import { initDonation, verifyDonation } from "@/lib/services/donation.service";

import {
  DonationData,
  DonationDetailsInputs,
} from "@/types/donation";

const DonateTransform = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<DonationData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenStepper = () => setStep(1);
    document.addEventListener('openDonateStepper', handleOpenStepper);
    return () => document.removeEventListener('openDonateStepper', handleOpenStepper);
  }, []);

  const handleDefaultNext = () => setStep(1);

  const handleDetailsNext = (data: DonationDetailsInputs) => {
    setFormData(data as DonationData);
    setStep(2);
  };

  const handleConfirm = async () => {
    if (!formData) return;

    setPaymentStatus("loading");
    setErrorMessage(null);

    try {
      // Parse amount string to number, removing commas if present
      const amountValue = parseFloat(formData.amount.replace(/,/g, ""));

      // Initialize donation with backend
      const initResponse = await initDonation({
        email: formData.email,
        amount: amountValue,
        currency: "NGN",
        name: formData.fullName,
      });

      if (!initResponse.success || !initResponse.data) {
        throw new Error(
          initResponse.message || "Failed to initialize donation",
        );
      }

      const { authorizationUrl } = initResponse.data;

      if (!authorizationUrl) {
        throw new Error("No authorization URL returned from payment gateway");
      }

      console.log("Redirecting to:", authorizationUrl);
      // Use location.assign for a more standard redirect
      window.location.assign(authorizationUrl);
    } catch (error) {
      console.error("Payment error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Payment processing failed";
      setErrorMessage(errorMsg);
      setPaymentStatus("error");
    }
  };

  return (
    <section id="donate-section" className="w-full">
      {/* LOADING */}
      {paymentStatus === "loading" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
          <Loader />
        </div>
      )}

      {/* ERROR STATE */}
      {paymentStatus === "error" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Payment Failed
            </h3>
            <p className="text-gray-600 mb-4">
              {errorMessage || "An error occurred during payment processing"}
            </p>
            <button
              onClick={() => {
                setPaymentStatus("idle");
                setErrorMessage(null);
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
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

    </section>
  );
};

export default DonateTransform;
