"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { programs } from "@/data/programs";
import { ProgramProvider, useProgram } from "@/context/ProgramContext";
import AdminLeftPanel from "@/components/AdminLeftPanel";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AlertCircle, Loader2 } from "lucide-react";
import Loader from "@/components/globalComp/Loader";

function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      // Use the first program as the default context for admin login
      const defaultProgramSlug = programs[0].slug!;
      const success = await login(email, password, defaultProgramSlug);
      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    } catch (err: any) {
      setError(
        err?.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5 lg:p-12 h-screen overflow-y-auto bg-primary">
      <div className="w-full max-w-138.5">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-pink-100 italic">
            Admin Access
          </div>
          <h3 className="text-3xl text-gray-900 leading-tight">Admin Login</h3>
          <p className="text-gray-500 mt-2 font-medium">
            Authorized access to the CMS control center.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 px-5 py-4 rounded-xl flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">
              Email Address <span className="text-pink-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rotagif.com"
              required
              className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm transition-all text-gray-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block font-bold text-gray-700 text-sm uppercase tracking-wider">
                Password <span className="text-pink-500">*</span>
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full border border-gray-200 rounded-xl px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm transition-all text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4.5 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:opacity-95 hover:shadow-pink-200/50 active:scale-[0.98] shadow-xl shadow-pink-100 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="animate-spin" size={22} />
                <span>Authenticating...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Restricted Area &bull; Rotagi Organization &bull; Internal Use Only
          </p>
        </div>
      </div>

      {loading && (
        <Loader
          title="Verifying Identity"
          message="Establishing secure connection to the administrative node."
        />
      )}
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <ProgramProvider>
      <div className="min-h-screen w-full lg:flex-row flex flex-col overflow-hidden bg-white">
        <AdminLeftPanel />
        <AdminLoginForm />
      </div>
    </ProgramProvider>
  );
}
