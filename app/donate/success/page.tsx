"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DonateSuccessful from "@/components/donate/DonateSuccessful";

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();

  const amount = params.get("amount") || "0";
  const email = params.get("email") || "";

  const handleReturn = () => {
    router.push("/donate");
  };

  return (
    <DonateSuccessful
      amount={amount}
      email={email}
      onReturn={handleReturn}
    />
  );
}