"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { submitPartnershipInterest, PartnershipInterestPayload } from "@/lib/services/partnership.service";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organizationName: "",
    website: "",
    goals: "",
  });
  const [interestAreas, setInterestAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (interest: string) => {
    setInterestAreas((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    onSubmitStart();

    try {
      const payload: PartnershipInterestPayload = {
        organizationName: formData.organizationName,
        contactName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        interestAreas: interestAreas,
        message: formData.goals,
      };

      const response = await submitPartnershipInterest(payload);

      if (response.success) {
        onSubmitSuccess();
      } else {
        console.error("Partnership submission failed:", response.message);
        onSubmitError();
      }
    } catch (error) {
      console.error("Error submitting partnership inquiry:", error);
      onSubmitError();
    } finally {
      setLoading(false);
    }
  };

  const interests = [
    "Financial Sponsorship",
    "Mentorship & Internships",
    "Technical Training",
    "Events Partnership",
    "Other",
  ];

  return (
    <div className="bg-white p-8 md:p-14 rounded-3xl w-full max-w-3xl mx-auto shadow-sm">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-normal font-cal-sans text-black mb-3 text-[1.6rem]">
          Partnership Inquiry Form
        </h2>
        <p className="text-gray-800 mb-10 max-w-xl mx-auto text-[0.95rem] leading-relaxed font-normal">
          {" "}
          fill out our enquiry form to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="font-normal font-cal-sans text-black text-lg mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                First Name *
              </label>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="e.g. Jane"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Last Name *
              </label>
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="e.g. Doe"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Email Address *
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="youremail@example.com"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Phone Number *
              </label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+234 809 387 6868"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
          </div>
        </div>

        {/* Organization Details */}
        <div>
          <h3 className="font-normal font-cal-sans text-black text-lg mb-4">
            Organization Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Organization/Company Name *
              </label>
              <input
                required
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="e.g. Acme Corp"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="www.yourcompany.com"
                className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black"
              />
            </div>
          </div>
        </div>

        {/* Partnership Interest */}
        <div>
          <h3 className="font-normal font-cal-sans text-black text-lg mb-4">
            Partnership Interest
          </h3>
          <label className="block text-xs font-medium mb-4 text-black">
            How would you like to partner? *
          </label>

          <div className="space-y-3 mb-6">
            {interests.map((interest) => (
              <label
                key={interest}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={interestAreas.includes(interest)}
                  onChange={() => handleCheckboxChange(interest)}
                  className="w-5 h-5 accent-[#D62D88] border-[#E5E7EB] rounded"
                />
                <span className="text-xs font-normal text-black">
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
              name="goals"
              value={formData.goals}
              onChange={handleInputChange}
              placeholder="Tell us how we can build the future together..."
              className="w-full text-sm outline-none border border-[#E5E7EB] rounded-lg px-4 py-3 placeholder-[#9CA3AF] resize-none text-black"
            ></textarea>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D62D88] hover:bg-pink-700 text-white rounded-full py-4 text-sm font-bold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
    </div>
  );
};

export default PartnerForm;
