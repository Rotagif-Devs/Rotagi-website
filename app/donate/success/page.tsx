"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DonateSuccessful from "@/components/donate/DonateSuccessful";

function SuccessContent() {
  const router = useRouter();
  const params = useSearchParams();

  const amount = params.get("amount") || "0";
  const email = params.get("email") || "";

  const handleReturn = () => {
    router.push("/donate");
  };

  return (
    <DonateSuccessful amount={amount} email={email} onReturn={handleReturn} />
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
