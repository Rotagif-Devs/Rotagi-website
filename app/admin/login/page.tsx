"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import Button from "@/components/ui/Button";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 relative overflow-hidden font-outfit">
      {/* Subtle Background Elements for Premium Feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full animate-pulse transition-all duration-7000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/5 blur-[120px] rounded-full animate-pulse transition-all duration-10000 delay-1000" />
      
      <div className="max-w-md w-full relative z-10 transition-all duration-500 ease-out">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white border border-gray-100 rounded-[2rem] mb-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Lock className="text-secondary relative z-10" size={36} />
          </div>
          <h1 className="text-5xl font-cal-sans text-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-600">
            Secure Entry
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">
            Rotagif Administrative Portal
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden p-10 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent opacity-30" />
          
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 px-5 py-4 rounded-2xl flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm font-semibold leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Identity Identifier
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors duration-300"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rotagi.com"
                  className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border border-gray-100 rounded-[1.25rem] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/30 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Access Key
                </label>
                <button type="button" className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:text-tertiary transition-colors">
                  Lost Access?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors duration-300"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border border-gray-100 rounded-[1.25rem] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/30 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-6 text-base font-bold bg-secondary hover:bg-tertiary text-white border-none shadow-[0_20px_40px_-12px_rgba(255,107,0,0.3)] transition-all duration-300 active:scale-[0.97] rounded-[1.25rem]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Establish Connection"
              )}
            </Button>

            <div className="pt-4">
              <div className="px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-gray-200 transition-colors">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-2 text-center">
                  Sandbox Credentials
                </p>
                <div className="flex justify-center gap-4 text-xs font-mono">
                  <span className="text-gray-500">USR: <code className="text-secondary/80 font-bold">admin@rotagi.com</code></span>
                  <span className="text-gray-200">|</span>
                  <span className="text-gray-500">PWD: <code className="text-secondary/80 font-bold">admin123</code></span>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex gap-8">
            <button className="text-xs text-gray-400 hover:text-black transition-colors font-medium underline underline-offset-4 decoration-current/10">Privacy Protocol</button>
            <button className="text-xs text-gray-400 hover:text-black transition-colors font-medium underline underline-offset-4 decoration-current/10">Security Policy</button>
          </div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
            &copy; 2026 Rotagif Organization &bull; Nexus V2.0
          </p>
        </div>
      </div>
    </div>
  );
}
