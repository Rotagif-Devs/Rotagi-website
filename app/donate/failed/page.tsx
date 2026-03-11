"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DonateFailed from "@/components/donate/DonateFailed";

export default function FailedPage() {
  const router = useRouter();
  const params = useSearchParams();

const amount = params.get("amount");
  const email = params.get("email");

  const handleReturn = () => {
    router.push("/donate");
  };

  return (
    <DonateFailed
      onReturn={handleReturn}
    />
  );
}