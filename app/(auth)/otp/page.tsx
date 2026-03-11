"use client";
import ConfirmOtpCode from '@/components/otp/Otp';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const OtpContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || undefined;

  return (
    <div>
      <ConfirmOtpCode email={email} />
    </div>
  );
};

const OtpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpContent />
    </Suspense>
  );
};

export default OtpPage;
