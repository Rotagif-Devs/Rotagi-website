"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminLogin as authServiceLogin } from "@/lib/services/auth.service";

interface AdminUser {
  email: string;
  role: string;
  lastLogin?: string;
  token?: string;
}

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

  useEffect(() => {
    // Check local storage for session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("adminUser");
        const token = localStorage.getItem("accessToken");
        
        if (savedUser && token) {
          const parsedUser = JSON.parse(savedUser);
          // Sync user state with stored token just in case
          setUser({ ...parsedUser, token });
        } else if (token && !savedUser) {
          // Fallback if token exists but user object is missing
          setUser({ email: "Admin", role: "admin", token });
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

  const login = async (email: string, password: string, programSlug: string): Promise<boolean> => {
    try {
      const response = await authServiceLogin({ email, password, programSlug });
      
      const accessToken = response.data?.accessToken || (response as any).accessToken;
      
      if (accessToken) {
        const adminUser: AdminUser = { 
          email, 
          role: "admin",
          lastLogin: new Date().toISOString(),
          token: accessToken
        };
        setUser(adminUser);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("accessToken", accessToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("accessToken");
    router.push("/admin/login");
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
