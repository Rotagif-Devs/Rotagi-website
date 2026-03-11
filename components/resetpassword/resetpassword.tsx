"use client";

import { useEffect, useState } from "react";
import { resetPassword } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";

type ResetFormData = {
  newPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>();

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail") || "";
    const savedToken = localStorage.getItem("resetToken") || "";

    setEmail(savedEmail);
    setToken(savedToken);
  }, []);

  const onSubmit = async (data: ResetFormData) => {
    if (!email || !token) {
      alert("Missing reset session. Please restart the forgot password flow.");
      router.push("/forgotpassword");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email,
        token,
        newPassword: data.newPassword,
      });

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");

      alert("Password updated. Please log in.");
      router.push("/login");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Reset password failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-md items-start justify-center px-6 pt-10 lg:pt-28">
        <div className="w-full">

          <h4 className="text-dark">Reset Password</h4>

          <p className="mt-2 leading-5 text-text-hdd">
            Enter your new password to complete the reset.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block font-semibold text-dark">
                Email
              </label>

              <input
                value={email}
                readOnly
                disabled
                tabIndex={-1}
                className="mt-2 h-10 w-full rounded-md bg-white px-3 text-dark outline-none border border-accent0 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="block font-semibold text-dark">
                New Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="h-10 w-full rounded-md bg-white px-3 pr-10 text-dark outline-none border border-accent0 placeholder:text-text-hdd/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>

              </div>

              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-full bg-secondary font-semibold text-white shadow-sm transition hover:bg-quaternary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}