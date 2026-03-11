"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";

export type PartnershipInterestInputs = {
  interests: string[];
  message: string;
};

type Props = {
  onBack: () => void;
  onNext: (data: PartnershipInterestInputs) => void;
};

const PARTNERSHIP_OPTIONS = [
  "Financial Sponsorship",
  "Mentorship & Internships",
  "Technical Training",
  "Events Partnership",
  "Other",
];

const PartnerStepTwo = ({ onBack, onNext }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PartnershipInterestInputs>();

  const onSubmit: SubmitHandler<PartnershipInterestInputs> = (data) => {
    onNext(data);
  };

  return (
    <main className="flex justify-center items-center py-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
            space-y-4
            w-full
            sm:w-[90%]
            md:w-[70%]
            lg:w-[50%]
            xl:w-[40%]
            px-5 sm:px-7
            py-7 sm:py-8
            bg-white
            rounded-2xl
            flex
            flex-col
            justify-center
            mx-auto"
      >
        <div className="text-center flex justify-center flex-col pb-5 relative">
          <button
            type="button"
            onClick={onBack}
            className="absolute left-0 top-0 text-gray-500 hover:text-black font-medium text-sm"
          >
            &larr; Back
          </button>
          <div
            className=" font-medium text-2xl mb-2 mt-4 md:mt-0"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Partnership Interest
          </div>
          <p className="text-gray-500 font-medium text-sm">
            Tell us how you'd like to collaborate.
          </p>
        </div>

        {/* Interests (Checkboxes) */}
        <div className="mb-6">
          <label className="block mb-4 font-medium">
            How would you like to partner?{" "}
            <span className="text-pink-500">*</span>
          </label>
          <div className="space-y-3">
            {PARTNERSHIP_OPTIONS.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 p-4 border-2 border-[#D3D3D3] rounded-lg cursor-pointer hover:border-pink-300 transition-colors"
              >
                <input
                  type="checkbox"
                  value={item}
                  {...register("interests", {
                    required: "Please select at least one interest",
                  })}
                  className="w-5 h-5 accent-pink-500"
                />
                <span className="text-black font-medium">{item}</span>
              </label>
            ))}
          </div>
          {errors.interests && (
            <p className="text-red-500 text-sm mt-2">
              {errors.interests.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mb-8">
          <label htmlFor="message" className="block mb-1 font-medium">
            Briefly describe your partnership goals{" "}
            <span className="text-pink-500">*</span>
          </label>
          <textarea
            id="message"
            {...register("message", {
              required: "Please tell us about your goals",
            })}
            placeholder="Tell us how we can build the future together..."
            className="w-full h-32 border-2 border-[#D3D3D3] outline-0 rounded-lg px-4 py-2 resize-none text-black"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" variant="primary">
          Review Inquiry
        </Button>
      </form>
    </main>
  );
};

export default PartnerStepTwo;
