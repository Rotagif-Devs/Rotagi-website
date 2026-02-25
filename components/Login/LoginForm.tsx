"use client";

import { useState } from "react";
import Link from "next/link";
import { programs } from "@/data/programs";
import { useProgram } from "@/context/ProgramContext";

export default function LoginForm() {
  const { selectedProgram, setSelectedProgram } = useProgram();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logging in as ${form.email} for ${selectedProgram.name}`);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5 lg:p-12 bg-pink-50/40">
      <div className="w-full max-w-[554px]">
        <div className="mb-8">
          <h2 className="text-3xl text-gray-900">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Program selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Select Program</label>
            <select
              value={selectedProgram.id}
              onChange={(e) => setSelectedProgram(programs.find((p) => p.id === e.target.value)!)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.ages})
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Email Address <span className="text-pink-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="sg-email@gmail.com"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-gray-600">
                Password <span className="text-pink-500">*</span>
              </label>
              <Link href="/forgot-password" className="text-xs text-pink-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg shadow-pink-200"
            style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-pink-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
