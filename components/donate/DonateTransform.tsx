"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper from "./Stepper";
import DonateDefault from "./DonateDefault";
import DonateDetails from "./DonateDetails";
import DonateComplete from "./DonateComplete";
import Loader from "../globalComp/Loader";
import DonateImpact from "./DonateImpact";
import { initDonation, DonationInitPayload } from "@/lib/services/donation.service";

import {
  DonationData,
  DonationDetailsInputs,
} from "@/types/donation";

const DonateTransform = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<DonationData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading">(
    "idle",
  );

  const handleDefaultNext = () => setStep(1);

  const handleDetailsNext = (data: DonationDetailsInputs) => {
    setFormData(data as DonationData);
    setStep(2);
  };

  const handleConfirm = async () => {
    if (!formData) return;
    
    setPaymentStatus("loading");
    
    try {
      const payload: DonationInitPayload = {
        email: formData.email,
        amount: Number(formData.amount.replace(/,/g, "")),
        name: formData.fullName,
        metadata: {
          phone: formData.phone,
          message: formData.message,
        }
      };

      const response = await initDonation(payload);
      
      if (response.success && response.data.authorizationUrl) {
        // Use window.location.href for external redirect
        window.location.href = response.data.authorizationUrl;
      } else {
        router.push(
          `/donate/failed?amount=${formData.amount}&email=${formData.email}`,
        );
      }
    } catch (error) {
      console.error("Donation initialization error:", error);
      router.push(
        `/donate/failed?amount=${formData.amount}&email=${formData.email}`,
      );
    }
  };

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
    </section>
  );
};

export default DonateTransform;
