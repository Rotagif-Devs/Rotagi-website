"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type Props = {
  onSubmitStart: () => void;
  onSubmitSuccess: () => void;
  onSubmitError: () => void;
};

const PartnerForm = ({
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError,
}: Props) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitStart();

    // Simulate API call
    setTimeout(() => {
      // Since the user wants to see the success/error states, let's randomly fail 20% of the time,
      // or just always succeed to be safe? I'll always succeed to simulate successful flow,
      // but the components are there for error testing if needed.
      onSubmitSuccess();
    }, 2000);
  };

  return (
    <div className="bg-white p-8 md:p-14 rounded-3xl w-full max-w-3xl mx-auto shadow-sm">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 text-[1.6rem]">
          Partnership Inquiry Form
        </h2>
        <p className="text-gray-500 text-sm">
          Please fill out our enquiry form to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="font-bold text-black text-sm mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-black">
                First Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Jane"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-black">
                Last Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Doe"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-black">
                Email Address *
              </label>
              <input
                required
                type="email"
                placeholder="youremail@example.com"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-black">
                Phone Number *
              </label>
              <input
                required
                type="tel"
                placeholder="+234 809 387 6868"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
          </div>
        </div>

        {/* Organization Details */}
        <div>
          <h3 className="font-bold text-black text-sm mb-4">
            Organization Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-black">
                Organization/Company Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-black">
                Website URL
              </label>
              <input
                type="url"
                placeholder="www.yourcompany.com"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
          </div>
        </div>

        {/* Partnership Interest */}
        <div>
          <h3 className="font-bold text-black text-sm mb-4">
            Partnership Interest
          </h3>
          <label className="block text-xs font-medium mb-4 text-black">
            How would you like to partner? *
          </label>

          <div className="space-y-3 mb-6">
            {[
              "Financial Sponsorship",
              "Mentorship & Internships",
              "Technical Training",
              "Events Partnership",
              "Other",
            ].map((interest) => (
              <label
                key={interest}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#D62D88] border-[#E5E7EB] rounded"
                />
                <span className="text-xs font-medium text-black">
                  {interest}
                </span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 text-black">
              Tell us about your goals *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell us how we can build the future together..."
              className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] resize-none text-black"
            ></textarea>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#D62D88] hover:bg-pink-700 text-white rounded-full py-4 text-sm font-bold"
        >
          Submit Inquiry
        </Button>
      </form>
    </div>
  );
};

export default PartnerForm;
