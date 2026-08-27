"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { adminLogin as authServiceLogin } from "@/lib/services/auth.service";
import { SESSION_EXPIRED_EVENT, SESSION_REFRESHED_EVENT } from "@/lib/api";
import { setRefreshToken, clearTokens } from "@/lib/token.service";

interface AdminUser {
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  lastLogin?: string;
  token?: string;
}

// Content Manager sees only Blog/Events (+ their own stats); Cohort Manager
// sees only the Cohort section. Anything without 'admin' in roles is one of
// these restricted staff accounts — see src/constants/roles.js on the
// backend for the canonical role list this mirrors.
export const CONTENT_MANAGER = "content_manager";
export const COHORT_MANAGER = "cohort_manager";

interface AdminContextType {
  user: AdminUser | null;
  login: (email: string, password: string, programSlug: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // This provider is mounted globally (the whole site, not just /admin), so a
  // stale/expired admin session sitting in localStorage — e.g. from a device
  // that was ever used to log into the admin dashboard — must never redirect
  // someone who is currently on an unrelated page (a cohort learner, a public
  // visitor, etc.). Only navigate to the admin login screen if that's
  // actually where the current user already is.
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("adminUser");
    clearTokens();
    if (pathname?.startsWith("/admin")) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  // A successful silent refresh means the admin is actively working — slide the local
  // 1h idle window forward instead of logging them out mid-task purely on a wall-clock timer.
  const handleSessionRefreshed = useCallback(() => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, lastLogin: new Date().toISOString() };
      localStorage.setItem("adminUser", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Fired by apiFetch when a silent token refresh fails (refresh token expired/reused) —
  // the session is genuinely over, so tear it down instead of leaving the user stuck on 401s.
  useEffect(() => {
    window.addEventListener(SESSION_EXPIRED_EVENT, logout);
    window.addEventListener(SESSION_REFRESHED_EVENT, handleSessionRefreshed);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, logout);
      window.removeEventListener(SESSION_REFRESHED_EVENT, handleSessionRefreshed);
    };
  }, [logout, handleSessionRefreshed]);

  useEffect(() => {
    // Check local storage for session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("adminUser");
        const token = localStorage.getItem("accessToken");
        
        if (savedUser && token) {
          const parsedUser = JSON.parse(savedUser);
          
          // Enforce 1-hour expiration
          if (parsedUser.lastLogin) {
            const loginTime = new Date(parsedUser.lastLogin).getTime();
            const currentTime = new Date().getTime();
            const oneHour = 60 * 60 * 1000; // 1 hour in ms
            
            if (currentTime - loginTime > oneHour) {
              // Token expired
              localStorage.removeItem("adminUser");
              localStorage.removeItem("accessToken");
              setUser(null);
              return;
            }
          }
          
          // Sync user state with stored token just in case
          setUser({ ...parsedUser, roles: parsedUser.roles || ["admin"], token });
        } else if (token && !savedUser) {
          // Fallback if token exists but user object is missing
          setUser({ email: "Admin", roles: ["admin"], token, lastLogin: new Date().toISOString() });
        }
      } catch (error) {
        console.error("Failed to parse admin session:", error);
        localStorage.removeItem("adminUser");
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Active timer to log user out after 1 hour if they stay on the page
  useEffect(() => {
    if (user?.lastLogin) {
      const loginTime = new Date(user.lastLogin).getTime();
      const currentTime = new Date().getTime();
      const oneHour = 60 * 60 * 1000;
      const timeLeft = oneHour - (currentTime - loginTime);

      if (timeLeft <= 0) {
        logout();
      } else {
        const timer = setTimeout(() => {
          logout();
        }, timeLeft);
        return () => clearTimeout(timer);
      }
    }
  }, [user?.lastLogin, logout]);

  const login = async (email: string, password: string, programSlug: string): Promise<boolean> => {
    try {
      const response = await authServiceLogin({ email, password, programSlug });
      
      const accessToken = response.data?.accessToken || (response as any).accessToken;
      const refreshToken = response.data?.refreshToken || (response as any).refreshToken;
      const responseUser = response.data?.user || (response as any).user;

      if (accessToken) {
        const adminUser: AdminUser = {
          email,
          firstName: responseUser?.firstName,
          lastName: responseUser?.lastName,
          // Fall back to admin only if the backend genuinely didn't send
          // roles — never silently downgrade a real restricted role to admin.
          roles: responseUser?.roles?.length ? responseUser.roles : ["admin"],
          lastLogin: new Date().toISOString(),
          token: accessToken
        };
        setUser(adminUser);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) setRefreshToken(refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
