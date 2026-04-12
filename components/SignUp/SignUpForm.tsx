"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { programs } from "@/data/programs";
import { useProgram } from "@/context/ProgramContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getPrograms } from "@/lib/services/program.service";
import { register as registerAccount } from "@/lib/services/auth.service";
import SuccessModal from "../SuccessModal";
import Loader from "@/components/globalComp/Loader";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  country: string;
  password: string;
  agreed: boolean;
};

// Define the type for the register mutation data
type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  birthDate: string;
  programId: string;
  termsAccepted: true;
  privacyAccepted: true;
  commsOptIn: boolean;
};

export default function SignUpForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { selectedProgram, setSelectedProgram } = useProgram();
  
  const {
    data: backendPrograms = [],
    isLoading: programsLoading,
    error: programsError,
  } = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    retry: 1,
    staleTime: 60_000,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      country: "Nigeria",
      password: "",
      agreed: false,
    },
  });

  const agreed = watch("agreed");

  const { mutate: registerUser, isPending: submitting } = useMutation({
    mutationFn: (data: RegisterData) => registerAccount(data),
    onSuccess: (data) => {
      const message = data?.message || "Please check your email for a verification link. You'll need to verify your email before you can log in.";
      setSuccessMessage(message);
      setShowSuccessModal(true);
      
      reset({
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
    onError: (err: any) => {
      const message = err?.response?.data?.message || err?.message || "Sign up failed. Please try again.";
      alert(message);
    },
  });
 
  const programIdBySlug = useMemo(() => {
    const map = new Map<string, string>();
    backendPrograms.forEach((p) => map.set(p.slug, p._id));
    return map;
  }, [backendPrograms]);

  const onSubmit = async (data: FormData) => {
    if (programsLoading) {
      alert("Programs are still loading. Please wait a moment and try again.");
      return;
    }

    if (programsError) {
      const message =
        programsError instanceof Error
          ? programsError.message
          : "Failed to load programs";
      alert(`Failed to load programs from the backend. ${message}`);
      return;
    }

    if (!backendPrograms.length) {
      alert("No backend programs were returned. Please refresh and try again.");
      return;
    }

    const selectedSlug = selectedProgram.slug;
    if (!selectedSlug) {
      alert("Please select a program to continue.");
      return;
    }
    
    const programId =
      programIdBySlug.get(selectedSlug) ||
      backendPrograms.find(
        (p) =>
          (p.title || "").trim().toLowerCase() ===
          (selectedProgram.name || "").trim().toLowerCase(),
      )?._id;
      
    if (!programId) {
      alert("Could not resolve selected program. Please refresh and try again.");
      return;
    }
    
    // Map form data to what the register function expects
    const registerData: RegisterData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      country: data.country,
      phone: data.phone.trim(),
      birthDate: data.dob, // Make sure your API expects 'birthDate' not 'dob'
      programId,
      termsAccepted: true,
      privacyAccepted: true,
      commsOptIn: false,
    };
    
    registerUser(registerData);
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
 
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Select Program */}
            <div>
              <label className="block font-semibold text-gray-600 mt-5">
                Select Program <span className="text-pink-500">*</span>
              </label>
              <select
                value={selectedProgram?.id || ""}
                onChange={(e) => {
                  const next = programs.find((p) => p.id === e.target.value);
                  if (!next) return;
                  setSelectedProgram(next);
                }}
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

              {programsLoading && (
                <p className="mt-2 text-xs text-gray-500">Loading programs…</p>
              )}
              {programsError && (
                <p className="mt-2 text-xs text-red-600">
                  Failed to load programs from backend.
                </p>
              )}
            </div>
 
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  First Name <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s-]+$/,
                      message: "First name can only contain letters, spaces, and hyphens",
                    },
                  })}
                  placeholder="Enter here"
                  className={`w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300 ${
                    errors.firstName ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                )}
              </div>
 
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Last Name <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s-]+$/,
                      message: "Last name can only contain letters, spaces, and hyphens",
                    },
                  })}
                  placeholder="Enter here"
                  className={`w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300 ${
                    errors.lastName ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>
 
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email Address <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="sg-email@gmail.com"
                  className={`w-full border rounded-md px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300 ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
 
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Phone Number <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s]{10,}$/,
                      message: "Please enter a valid phone number (min. 10 digits)",
                    },
                  })}
                  type="tel"
                  placeholder="Enter here"
                  className={`w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300 ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
 
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Date of Birth <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register("dob", {
                    required: "Date of birth is required",
                    validate: {
                      notFuture: (value) => {
                        const today = new Date();
                        const birthDate = new Date(value);
                        return birthDate <= today || "Date of birth cannot be in the future";
                      },
                      ageMinimum: (value) => {
                        const today = new Date();
                        const birthDate = new Date(value);
                        const age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff = today.getMonth() - birthDate.getMonth();
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                          return age - 1 >= 3 || "You must be at least 3 years old";
                        }
                        return age >= 3 || "You must be at least 3 years old";
                      },
                    },
                  })}
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white ${
                    errors.dob ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.dob && (
                  <p className="mt-1 text-xs text-red-600">{errors.dob.message}</p>
                )}
              </div>
 
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Country <span className="text-pink-500">*</span>
                </label>
                <select
                  {...register("country", {
                    required: "Country is required",
                  })}
                  className={`w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white ${
                    errors.country ? "border-red-500" : "border-gray-200"
                  }`}
                >
                  <option value="">Select a country</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
                )}
              </div>
            </div>
 
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Password <span className="text-pink-500">*</span>
              </label>
 
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full border rounded-md px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
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
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Minimum 8 characters with at least one uppercase, one lowercase, and one number
              </p>
            </div>
 
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  {...register("agreed", {
                    required: "You must agree to the terms and conditions",
                  })}
                  type="checkbox"
                  className="mt-0.5 accent-pink-500"
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
              {errors.agreed && (
                <p className="mt-1 text-xs text-red-600">{errors.agreed.message}</p>
              )}
            </div>
 
            <button
              type="submit"
              disabled={submitting || !agreed}
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

      {submitting && (
        <Loader 
          title="Creating Account" 
          message="Please wait while we set up your learning journey." 
        />
      )}
    </>
  );
}