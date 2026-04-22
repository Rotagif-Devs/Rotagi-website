"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { submitMentorApplication, MentorApplicationPayload } from "@/lib/services/mentor.service";
import Link from "next/link";
import { ChevronLeft, Upload, CheckCircle } from "lucide-react";

export default function MentorApplyPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedInUrl: "",
    yearsExperience: 0,
    expertise: "",
    motivation: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "yearsExperience" ? parseInt(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setError("Please upload your CV");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload: MentorApplicationPayload = {
        ...formData,
        cv: cvFile,
      };

      const response = await submitMentorApplication(payload);
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.message || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDF2F8] flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[40px] max-w-xl w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-cal-sans text-[#1A1A1A] mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Thank you for applying to be a mentor at ROTAGIF Our team will review your profile and get back to you shortly
          </p>
          <Link href="/">
            <Button className="bg-[#D62D88] hover:bg-pink-700 text-white rounded-full px-10 py-4">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF2F8] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium mb-10 group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-sm">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-cal-sans text-[#1A1A1A] mb-4">Become a Mentor</h1>
            <p className="text-gray-600 text-lg">
              Help us empower the next generation of African girl innovators with your expertise
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@example.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Phone Number</label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 ..."
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Location</label>
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Lagos, Nigeria"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 ml-1">LinkedIn Profile (URL)</label>
                <input
                  required
                  type="url"
                  name="linkedInUrl"
                  value={formData.linkedInUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Years of Experience</label>
                <input
                  required
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience || ""}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Expertise (e.g. AI Product UX)</label>
                <input
                  required
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  placeholder="AI Literacy"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Why do you want to be a mentor?</label>
              <textarea
                required
                name="motivation"
                rows={4}
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="I want to give back to the community..."
                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-2xl transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Upload CV (PDF, DOC, DOCX)</label>
              <div className="relative group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full px-6 py-8 border-2 border-dashed border-gray-200 group-hover:border-pink-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 group-hover:bg-pink-50 transition-all">
                  <Upload className="text-gray-400 group-hover:text-pink-500 mb-3" size={32} />
                  <p className="text-sm text-gray-500 group-hover:text-pink-600 font-medium">
                    {cvFile ? cvFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
                </div>
              </div>
            </div>

            <Button
              disabled={loading}
              className="w-full bg-[#D62D88] hover:bg-pink-700 text-white rounded-full py-5 text-lg font-bold shadow-lg shadow-pink-200 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Submitting Application..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
