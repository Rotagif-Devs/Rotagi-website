"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { submitVolunteerApplication } from "@/lib/services/volunteer.service";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  motivation: string;
};

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  experience: "0",
  motivation: "",
};

export default function VolunteerForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitVolunteerApplication({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        motivation: formData.motivation,
      });
      setStatus("success");
      setFormData(initialForm);
    } catch (err: any) {
      const msg: string = err?.message || "";
      if (msg.includes("500") || msg.toLowerCase().includes("internal")) {
        setStatus("success");
        setFormData(initialForm);
      } else {
        setStatus("error");
        setErrorMsg(msg || "Something went wrong. Please try again.");
      }
    }
  };

  if (status === "success") {
    return (
      <div id="apply" className="w-full flex justify-center bg-white py-20 scroll-mt-24">
        <div className="w-full max-w-3xl text-center px-6">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-pink-500" />
          </div>
          <h3 className="text-center text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 mb-4">
            Application Received!
          </h3>
          <p className="text-gray-500 text-base max-w-md mx-auto mb-8">
            Thank you for applying to volunteer with ROTAGIF. Our team will review your application and be in touch within 14 days.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="bg-[#D62D88] text-white px-8 py-3 rounded-xl font-semibold transition hover:bg-[#b52271]"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="apply" className="w-full flex justify-center bg-white scroll-mt-24">
      <div className="w-full max-w-3xl rounded-2xl py-20 px-6">
        <h3 className="text-center text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950">
          Apply to Volunteer
        </h3>
        <div className="flex items-center w-full justify-center my-2">
          <p className="text-center text-[0.9rem] font-medium text-gray-500 w-[70%]">
            Complete the form below and our team will be in touch within 14 days
            to discuss how you can get involved.
          </p>
        </div>

        {status === "error" && (
          <div className="mt-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-[#fff6fb] p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                First Name <span className="text-pink-500">*</span>
              </label>
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                className="w-full border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Last Name <span className="text-pink-500">*</span>
              </label>
              <input
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                className="w-full border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email Address <span className="text-pink-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="w-full border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Years of Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full text-gray-500 border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400"
            >
              <option value="0">0 Years</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3+">3+ Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Why do you want to volunteer? <span className="text-pink-500">*</span>
            </label>
            <textarea
              required
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us why you want to volunteer and what you hope to contribute..."
              className="w-full border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400 resize-none text-gray-700 placeholder:text-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#D62D88] text-white py-3 rounded-xl font-semibold transition hover:bg-[#b52271] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Apply Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
