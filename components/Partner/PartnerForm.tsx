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
    partnershipType: "", // Updated to single select based on image
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        interestAreas: formData.partnershipType
          ? [formData.partnershipType]
          : undefined,
        message: formData.goals,
      };

      const response = await submitPartnershipInterest(payload);

      if (response.success) {
        onSubmitSuccess();
      } else {
        onSubmitError();
      }
    } catch (error) {
      console.error("Partner submission failed:", error);
      onSubmitError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen w-300 py-12 px-4">
      <div className="bg-white p-8 md:p-14 rounded-[2.5rem] w-full  mx-auto shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Partnership Inquiry Form
          </h2>
          <p className="text-gray-600 font-medium">
            Tell us about your organization and goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">First Name <span className="text-pink-500">*</span></label>
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Last Name <span className="text-pink-500">*</span></label>
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Email Address <span className="text-pink-500">*</span></label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Phone Number <span className="text-pink-500">*</span></label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Organization Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black">Organization Details</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Company/Organization Name <span className="text-pink-500">*</span></label>
                <input
                  required
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter your organization name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Partnership Interest */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black">Partnership Interest</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">How would you like to partner?</label>
              <select
                name="partnershipType"
                value={formData.partnershipType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none appearance-none bg-white text-gray-400"
              >
                <option value="">Financial Sponsorship</option>
                <option value="Mentorship">Mentorship & Internships</option>
                <option value="Technical">Technical Training</option>
                <option value="Events">Events Partnership</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Tell us about your goals</label>
              <textarea
                required
                rows={5}
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="What would you achieve through this partnership? How does it align with your organization?"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-pink-500 outline-none resize-none placeholder:text-gray-300"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#D62D88] hover:bg-[#b52271] text-white rounded-full px-12 py-4 text-sm font-semibold transition-colors min-w-[240px]"
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </Button>
            
            <div className="text-center space-y-1">
              <p className="text-[10px] md:text-xs text-gray-500">
                By submitting this form, you agree to our Privacy Policy and Terms & Conditions.
              </p>
              <p className="text-[10px] md:text-xs text-gray-500">
                Submission does not guarantee a formal partnership.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerForm;