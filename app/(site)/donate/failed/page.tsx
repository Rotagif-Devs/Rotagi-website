"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DonateFailed from "@/components/donate/DonateFailed";

function FailedContent() {
  const router = useRouter();
  const params = useSearchParams();

  const amount = params.get("amount");
  const email = params.get("email");

  const handleReturn = () => {
    router.push("/donate");
  };

  return <DonateFailed onReturn={handleReturn} />;
}

export default function FailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <FailedContent />
    </Suspense>
  );
}
