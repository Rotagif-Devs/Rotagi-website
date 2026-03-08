"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { programs } from "@/data/programs";
import { useProgram } from "@/context/ProgramContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getPrograms } from "@/lib/services/program.service";
import { register } from "@/lib/services/auth.service";
import SuccessModal from "../SuccessModal";


export default function SignUpForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const { selectedProgram, setSelectedProgram } = useProgram();
  
  const { data: backendPrograms = [] } = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  });

  const { mutate: registerUser, isPending: submitting } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      // Get message from backend response
      const message = data?.message || "Please check your email for a verification link. You'll need to verify your email before you can log in.";
      setSuccessMessage(message);
      setShowSuccessModal(true);
      
      // Reset form after successful registration
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        country: "Nigeria",
        password: "",
        agreed: false,
      });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Sign up failed. Please try again.";
      alert(message);
    },
  });
 
  const programIdBySlug = useMemo(() => {
    const map = new Map<string, string>();
    backendPrograms.forEach((p) => map.set(p.slug, p._id));
    return map;
  }, [backendPrograms]);
 
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
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    const selectedSlug = selectedProgram.slug;
    if (!selectedSlug) {
      alert("Please select a program to continue.");
      return;
    }
 
    const programId = programIdBySlug.get(selectedSlug);
    if (!programId) {
      alert("Could not resolve selected program. Please refresh and try again.");
      return;
    }

    // Validate password length (example)
    if (form.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    
    registerUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      country: form.country,
      phone: form.phone.trim(),
      birthDate: form.dob,
      programId,
      termsAccepted: true,
      privacyAccepted: true,
      commsOptIn: false, // You can add a checkbox for this if needed
    });
  };
 
  return (
    <>
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
                Select Program <span className="text-pink-500">*</span>
              </label>
              <select
                value={selectedProgram.id}
                onChange={(e) =>
                  setSelectedProgram(
                    programs.find((p) => p.id === e.target.value)!
                  )
                }
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                required
              >
                <option value="">Select a program</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.ages})
                  </option>
                ))}
              </select>
            </div>
 
           
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
                  minLength={2}
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
                  minLength={2}
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
                />
              </div>
            </div>
 
        
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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
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
                  pattern="[0-9+\-\s]{10,}"
                  title="Please enter a valid phone number"
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300"
                />
              </div>
            </div>
 
        
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
                  max={new Date().toISOString().split('T')[0]}
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
                  required
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
                  minLength={8}
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
              <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
            </div>
 
            
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
                <a href="/terms" className="text-pink-500 hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-pink-500 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
 
            <button
              type="submit"
              disabled={submitting || !form.agreed}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-pink-200"
              style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
            >
              {submitting ? "Creating account..." : "Create Account"}
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

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
        title="Registration Successful!"
      />
    </>
  );
}