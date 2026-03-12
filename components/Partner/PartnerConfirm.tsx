import React from "react";
import Button from "../ui/Button";

type Props = {
  data: any;
  onBack: () => void;
  onNext: () => void;
};

const PartnerConfirm = ({ data, onBack, onNext }: Props) => {
  return (
    <section className="bg-pink-50/30 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-[#D3D3D3] p-6 sm:p-8 shadow-sm">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-sm mb-6 text-gray-500 hover:text-black transition-colors"
          onClick={onBack}
        >
          &larr; Edit Details
        </button>

        {/* Header */}
        <div className="text-center pb-6">
          <h2
            className="font-medium !text-3xl mb-2 text-gray-900"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Review Your Inquiry
          </h2>
          <p className="text-[#373737] !text-sm">
            Please ensure all your details are correct before sending.
          </p>
        </div>

        {/* Summary */}
        <div className="space-y-4 border border-[#D3D3D3] py-5 px-5 rounded-xl my-8 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Full Name</span>
            <span className="text-gray-900 font-medium">
              {data.firstName} {data.lastName}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Organization</span>
            <span className="text-gray-900 font-medium">
              {data.organization}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Email Address</span>
            <span className="text-gray-900 font-medium">{data.email}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm">Interests</span>
            <div className="flex flex-wrap gap-2">
              {data.interests &&
                data.interests.map((interest: string) => (
                  <span
                    key={interest}
                    className="text-xs font-bold text-pink-700 bg-pink-100 px-3 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-8">
          <Button
            className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-4 rounded-lg font-medium cursor-pointer"
            onClick={onNext}
          >
            Send Inquiry
          </Button>
          <p className="text-center text-xs text-gray-500">
            Our team will process your details and get back to you shortly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerConfirm;
