"use client";

import { useState } from "react";
import Link from "next/link";
import { programs } from "@/data/programs";
import { useProgram } from "@/context/ProgramContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
    <div className="flex-1 flex items-center justify-center p-5 lg:p-12">
      <div className="w-full max-w-138.5">
        <div className="mb-8">
          <h3>Welcome Back!</h3>
          <p className="text-gray-500 mt-1">
            Sign in to continue your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
       
          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Select Program
            </label>
            <select
              value={selectedProgram.id}
              onChange={(e) =>
                setSelectedProgram(
                  programs.find((p) => p.id === e.target.value)!
                )
              }
              className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.ages})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Email Address <span className="text-pink-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="sg-email@gmail.com"
              required
              className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
            />
          </div>

         
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-gray-600">
                Password <span className="text-pink-500">*</span>
              </label>
              <Link
                href="/forgotpassword"
                className="text-pink-500 hover:underline"
              >
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
                className="w-full border border-gray-200 rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl text-white font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg shadow-pink-200"
            style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
          >
            Sign In
          </button>

          <p className="text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-pink-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}