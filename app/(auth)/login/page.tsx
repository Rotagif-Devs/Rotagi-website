"use client";

import React, { Suspense } from "react";
import LoginForm from "@/components/Login/LoginForm";

export default function LoginPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}