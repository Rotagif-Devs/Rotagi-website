"use client";
import ConfirmOtpCode from '@/components/otp/Otp'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const OtpContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || undefined;

  const handleVerify = (otp: string) => {
    if (email) {
      router.push(`/createpassword?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
    } else {
      router.push('/createpassword'); 
    }
  };

  return (
    <div>
      <ConfirmOtpCode email={email} onVerify={handleVerify} />
    </div>
  );
}

const OtpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpContent />
    </Suspense>
  )
}

export default OtpPage