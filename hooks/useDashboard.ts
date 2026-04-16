"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearTokens } from "@/lib/token.service";
import {
  clearDashboardUserInfo,
  getDashboardUserInfo,
  hasAccessToken,
  type DashboardUserInfo,
} from "@/lib/dashboard";

interface UseDashboardAuthReturn {
  userInfo: DashboardUserInfo | null;
  isLoading: boolean;
  handleLogout: () => void;
}

export function useDashboardAuth(): UseDashboardAuthReturn {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<DashboardUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirectToLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleLogout = useCallback(() => {
    clearTokens();
    clearDashboardUserInfo();
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    const tokenExists = hasAccessToken();

    if (!tokenExists) {
      clearDashboardUserInfo();
      redirectToLogin();
      return;
    }

    setUserInfo(getDashboardUserInfo());
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" && !e.newValue) {
        redirectToLogin();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [redirectToLogin]);

  return {
    userInfo,
    isLoading,
    handleLogout,
  };
}