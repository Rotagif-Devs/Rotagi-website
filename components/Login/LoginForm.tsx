"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { programs } from "@/data/programs";
import { useProgram } from "@/context/ProgramContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login, resendVerification } from "@/lib/services/auth.service";
import SuccessModal from "@/components/SuccessModal";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { selectedProgram, setSelectedProgram } = useProgram();
  const searchParams = useSearchParams();
  const programSlug = searchParams.get("program");

  useEffect(() => {
    if (programSlug) {
      const foundProgram = programs.find((p) => p.slug === programSlug);
      if (foundProgram) {
        setSelectedProgram(foundProgram);
      }
    }
  }, [programSlug, setSelectedProgram]);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const emailValue = watch("email");

  const handleResendVerification = async () => {
    if (!emailValue) {
      setErrorMessage("Please enter your email address first.");
      return;
    }

    setResending(true);
    try {
      const resp: any = await resendVerification({ email: emailValue });
      alert(
        resp?.message || "Verification email sent. Please check your inbox.",
      );
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to resend verification email";
      setErrorMessage(msg);
    } finally {
      setResending(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedProgram?.slug) {
      setErrorMessage("Please select a program before signing in.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {

      const response: any = await login({
        email: data.email,
        password: data.password,
        programSlug: selectedProgram.slug,
      });

      let accessToken = null;

      if (response?.accessToken) {
        accessToken = response.accessToken;
      } else if (response?.data?.accessToken) {
        accessToken = response.data.accessToken;
      } else if (typeof response === "string" && response.length > 0) {
        accessToken = response;
      } else if (response?.token) {
        accessToken = response.token;
      }

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        
        // Store user info if available in response
        const user = response?.user || response?.data?.user;
        if (user) {
          if (user.email) localStorage.setItem("userEmail", user.email);
          if (user.firstName && user.lastName) {
            localStorage.setItem("userFullName", `${user.firstName} ${user.lastName}`);
          } else if (user.name) {
            localStorage.setItem("userFullName", user.name);
          }
        } else {
          // Fallback to form data if response doesn't have user info
          localStorage.setItem("userEmail", data.email);
          // We don't have the name from login form, so we'll leave it or set a placeholder
          localStorage.setItem("userFullName", "User");
        }

        setIsSuccessModalOpen(true);
      } else {
        setErrorMessage(
          "No access token received from server. Please check the response structure.",
        );
        console.error("Response structure:", response);
      }
    } catch (err) {
      console.error("Full error object:", err);

      let message = "Login failed";

      if (err instanceof Error) {
        message = err.message;
        if ("response" in err) {
          const errorWithResponse = err as any;
          if (errorWithResponse.response?.data) {
            console.error(
              "Error response data:",
              errorWithResponse.response.data,
            );
            if (errorWithResponse.response.data.message) {
              message = errorWithResponse.response.data.message;
            }
          }
        }
      }

      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Select Program
            </label>
            <select
              value={selectedProgram.id}
              onChange={(e) =>
                setSelectedProgram(
                  programs.find((p) => p.id === e.target.value)!,
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="sg-email@gmail.com"
              className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full border rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder-gray-300 ${
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
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Display error message if any */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              <div>{errorMessage}</div>
              {errorMessage.includes("verify your email") && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="text-sm underline hover:no-underline disabled:opacity-50"
                  >
                    {resending ? "Sending..." : "Resend verification email"}
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl text-white font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
          >
            {submitting ? "Signing in..." : "Sign In"}
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

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          window.location.href = "/dashboard";
        }}
        title="Welcome Back!"
        message="You have successfully logged in. Redirecting to your programs..."
      />
    </div>
  );
}
