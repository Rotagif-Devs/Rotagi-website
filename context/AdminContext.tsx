"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  email: string;
  role: string;
  lastLogin?: string;
  token?: string;
}

interface AdminContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
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
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          // Simple session expiry check (mock: 24h)
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse admin session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate network delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication
    if (email === "admin@rotagi.com" && password === "admin123") {
      const adminUser: AdminUser = { 
        email, 
        role: "admin",
        lastLogin: new Date().toISOString(),
        token: `mock_jwt_${Math.random().toString(36).substr(2)}`
      };
      setUser(adminUser);
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
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
