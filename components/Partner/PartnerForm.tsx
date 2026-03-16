"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { submitPartnershipInterest, PartnershipInterestPayload } from "@/lib/services/partnership.service";

type Props = {
  onSubmitStart: () => void;
  onSubmitSuccess: () => void;
  onSubmitError: () => void;
};

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organizationName: string;
  website: string;
  interestAreas: string[];
  message: string;
};

const PartnerForm = ({
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      interestAreas: [],
    },
  });

  const onSubmit = async (data: FormInputs) => {
    onSubmitStart();

    const payload: PartnershipInterestPayload = {
      organizationName: data.organizationName,
      contactName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      website: data.website,
      interestAreas: data.interestAreas,
      message: data.message,
    };

    try {
      const response = await submitPartnershipInterest(payload);
      if (response.success) {
        onSubmitSuccess();
      } else {
        onSubmitError();
      }
    } catch (error) {
      console.error("Partnership submission error:", error);
      onSubmitError();
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                {...register("firstName", { required: "First name is required" })}
                type="text"
                placeholder="e.g. Jane"
                className={`w-full text-sm outline-none border rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black ${
                  errors.firstName ? "border-red-500" : "border-[#E5E7EB]"
                }`}
              />
              {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Last Name *
              </label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                placeholder="e.g. Doe"
                className={`w-full text-sm outline-none border rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black ${
                  errors.lastName ? "border-red-500" : "border-[#E5E7EB]"
                }`}
              />
              {errors.lastName && <span className="text-red-500 text-xs mt-1">{errors.lastName.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Email Address *
              </label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="youremail@example.com"
                className={`w-full text-sm outline-none border rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black ${
                  errors.email ? "border-red-500" : "border-[#E5E7EB]"
                }`}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Phone Number *
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                placeholder="+234 809 387 6868"
                className={`w-full text-sm outline-none border rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black ${
                  errors.phone ? "border-red-500" : "border-[#E5E7EB]"
                }`}
              />
              {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
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
                {...register("organizationName", { required: "Organization name is required" })}
                type="text"
                placeholder="e.g. Acme Corp"
                className={`w-full text-sm outline-none border rounded-lg px-4 py-3 placeholder-[#9CA3AF] text-black ${
                  errors.organizationName ? "border-red-500" : "border-[#E5E7EB]"
                }`}
              />
              {errors.organizationName && <span className="text-red-500 text-xs mt-1">{errors.organizationName.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-normal mb-2 text-black">
                Website URL
              </label>
              <input
                {...register("website")}
                type="url"
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
                  {...register("interestAreas")}
                  type="checkbox"
                  value={interest}
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
              {...register("message", { required: "Goals description is required" })}
              rows={4}
              placeholder="Tell us how we can build the future together..."
              className={`w-full text-sm outline-none border rounded-lg px-4 py-3 placeholder-[#9CA3AF] resize-none text-black ${
                errors.message ? "border-red-500" : "border-[#E5E7EB]"
              }`}
            ></textarea>
            {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
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
