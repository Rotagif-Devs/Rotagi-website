"use client";
import ForgetPassword from '@/components/forgotpassword/ForgotPassword'
import React from 'react'
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();

  const handleSendCode = (email: string) => {
    router.push(`/otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <ForgetPassword onSendCode={handleSendCode} />
  )
}

export default ForgotPasswordPage