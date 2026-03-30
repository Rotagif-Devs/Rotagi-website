"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DonateSuccessful from "@/components/donate/DonateSuccessful";

import { useState, useEffect, useRef } from "react";
import { verifyDonation } from "@/lib/services/donation.service";
import Loader from "@/components/globalComp/Loader";

function SuccessContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<{ amount: string; email: string } | null>(null);
  const verificationStarted = useRef(false);

  // Paystack appends 'reference' or 'trxref' to the URL
  // Using a getter to ensure we have the value even if params object behaves unexpectedly
  const reference = params.get("reference") || params.get("trxref");
  
  const initialAmount = params.get("amount") || "0";
  const initialEmail = params.get("email") || "";

  useEffect(() => {
    // If no reference in URL, wait a bit or check if we already verified
    if (!reference) {
      setVerifying(false);
      return;
    }

    const performVerification = async () => {
      if (verificationStarted.current) return;
      verificationStarted.current = true;

      try {
        console.log("Verifying reference:", reference);
        const response = await verifyDonation(reference);
        
        if (response.success && response.data) {
          if (response.data.status !== "success") {
            const amountParam = response.data.donation?.amount || initialAmount;
            const emailParam = response.data.donation?.email || initialEmail;
            router.push(`/donate/failed?amount=${amountParam}&email=${emailParam}`);
            return;
          }

          setVerifiedData({
            amount: response.data.donation.amount.toString(),
            email: response.data.donation.email
          });
        } else {
          throw new Error(response.message || "Payment verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError(err instanceof Error ? err.message : "An error occurred during verification");
      } finally {
        setVerifying(false);
      }
    };

    performVerification();
  }, [reference]);

  const handleReturn = () => {
    router.push("/donate");
  };

  if (verifying && reference) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-primary">
        <Loader />
        <p className="mt-4 text-gray-600 font-medium animate-pulse">Confirming your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-primary">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-3xl">!</span>
          </div>
          <h3 className="text-xl font-semibold text-red-600 mb-2 font-cal-sans">Verification Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
             <button 
                onClick={() => { verificationStarted.current = false; setVerifying(true); setError(null); }}
                className="w-full bg-gray-100 text-gray-700 px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
             >
              Try Again
            </button>
            <button onClick={handleReturn} className="w-full bg-[#D62D88] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-pink-700 transition-colors">
              Return to Donation Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DonateSuccessful 
      amount={verifiedData?.amount || initialAmount} 
      email={verifiedData?.email || initialEmail} 
      onReturn={handleReturn} 
    />
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
