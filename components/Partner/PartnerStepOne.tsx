"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";

type PartnershipInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  website?: string;
};

type Props = {
  onNext: (data: PartnershipInputs) => void;
};

const PartnerStepOne = ({ onNext }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PartnershipInputs>();

  const onSubmit: SubmitHandler<PartnershipInputs> = (data) => {
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
        <div className="text-center flex justify-center flex-col pb-5">
          <div
            className=" font-medium text-2xl mb-2"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Contact Details
          </div>
          <p className="text-gray-500 font-medium text-sm">
            Provide your personal and organizational details.
          </p>
        </div>

        {/* First Name */}
        <div className="mb-6">
          <label htmlFor="firstName" className="block mb-1 font-medium">
            First Name
          </label>
          <input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
            placeholder="Jane"
            className="w-full outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2 text-black"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-6">
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Doe"
            className="w-full outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2 text-black"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="jane@example.com"
            className="w-full outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2 text-black"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label htmlFor="phone" className="block mb-1 font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+234..."
            className="w-full border-2 border-[#D3D3D3] outline-0 rounded-lg px-4 py-2 text-black"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
        </div>

        {/* Organization Name */}
        <div className="mb-6">
          <label htmlFor="organization" className="block mb-1 font-medium">
            Organization Name
          </label>
          <input
            id="organization"
            {...register("organization", {
              required: "Organization name is required",
            })}
            placeholder="Your Company/Org"
            className="w-full outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2 text-black"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.organization && (
            <p className="text-red-500 text-sm mt-1">
              {errors.organization.message}
            </p>
          )}
        </div>

        {/* Website URL */}
        <div className="mb-8">
          <label htmlFor="website" className="block mb-1 font-medium">
            Website URL
          </label>
          <input
            id="website"
            type="url"
            {...register("website")}
            placeholder="https://..."
            className="w-full outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2 text-black"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
        </div>

        <Button type="submit" variant="primary">
          Proceed to Next Step
        </Button>
      </form>
    </main>
  );
};

export default PartnerStepOne;
