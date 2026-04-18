"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, Suspense, useState } from "react";
import { AdminProvider } from "@/context/AdminContext";
import { ProgramProvider } from "@/context/ProgramContext";
import { useAnalytics } from "@/hooks/useAnalytics";

function AnalyticsTracker() {
  useAnalytics();
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      <AdminProvider>
        <ProgramProvider>{children}</ProgramProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}
