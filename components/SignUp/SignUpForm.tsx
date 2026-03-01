"use client";

import { useState } from "react";
import { programs } from "@/data/programs";
import { useProgram } from "@/context/ProgramContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUpForm() {
  const { selectedProgram, setSelectedProgram } = useProgram();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    country: "Nigeria",
    password: "",
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Account created for ${selectedProgram.name}!`);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5 lg:p-12">
      <div className="w-full max-w-138.5">
        <div className="lg:mt-20">
          <h3 className="text-3xl text-gray-900">Welcome!</h3>
          <p className="text-gray-500 text-sm mt-1">
            Sign up to start your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Program */}
          <div>
            <label className="block font-semibold text-gray-600 mt-5">
              Select Program
            </label>
            <select
              value={selectedProgram.id}
              onChange={(e) =>
                setSelectedProgram(
                  programs.find((p) => p.id === e.target.value)!
                )
              }
              className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.ages})
                </option>
              ))}
            </select>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                First Name <span className="text-pink-500">*</span>
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter here"
                required
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Last Name <span className="text-pink-500">*</span>
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter here"
                required
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-3">
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
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Phone Number <span className="text-pink-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter here"
                required
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
              />
            </div>
          </div>

          {/* DOB & Country */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Date of Birth <span className="text-pink-500">*</span>
              </label>
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Country <span className="text-pink-500">*</span>
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>Kenya</option>
                <option>South Africa</option>
                <option>Rwanda</option>
                <option>Uganda</option>
                <option>Tanzania</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Password <span className="text-pink-500">*</span>
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full border border-gray-200 rounded-md px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
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

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              name="agreed"
              type="checkbox"
              checked={form.agreed}
              onChange={handleChange}
              className="mt-0.5 accent-pink-500"
              required
            />
            <span className="text-xs text-gray-500">
              I agree to the{" "}
              <a href="#" className="text-pink-500 hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-pink-500 hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg shadow-pink-200"
            style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-500 font-semibold hover:underline"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}