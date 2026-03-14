"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgram } from "@/context/ProgramContext";
import { clearTokens } from "@/lib/token.service";
import Button from "@/components/ui/Button";
import { User, Mail, BookOpen, LogOut } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { selectedProgram } = useProgram();
  const [userInfo, setUserInfo] = useState<{ email: string; fullName: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        // Clear user data just in case
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userFullName");
        router.push("/login");
        return false;
      }
      return true;
    };

    if (checkAuth()) {
      const email = localStorage.getItem("userEmail") || "Not provided";
      const fullName = localStorage.getItem("userFullName") || "User";
      
      setUserInfo({ email, fullName });
      setIsLoading(false);
    }

    // Handle logout in other tabs or session clearing
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" && !e.newValue) {
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  const handleLogout = () => {
    clearTokens();
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFullName");
    // Use window.location.href to ensure a full reload so Header state updates
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary px-4 py-20 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-6">
            <User size={48} />
          </div>
          <h1 className="text-3xl font-cal-sans text-gray-900 mb-2">LMS Student Dashboard</h1>
          <p className="text-gray-500">Welcome to your learning dashboard</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-500 shadow-sm">
              <User size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-0.5">Full Name</p>
              <p className="text-lg font-semibold text-gray-800">{userInfo?.fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-500 shadow-sm">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-0.5">Email Address</p>
              <p className="text-lg font-semibold text-gray-800">{userInfo?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-500 shadow-sm">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-0.5">Program Chosen</p>
              <p className="text-lg font-semibold text-gray-800">{selectedProgram?.name || "No program selected"}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-sm text-gray-400">
            Current Session Token: <span className="font-mono text-gray-300">verified</span>
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold transition-all hover:bg-red-100 active:scale-95"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Return to <a href="/programs" className="text-pink-500 hover:underline">Programs Exploration</a>
        </p>
      </div>
    </div>
  );
}
