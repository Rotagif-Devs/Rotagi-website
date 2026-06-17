"use client";

import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
};

const benefits = [
  "Early access to tickets",
  "Speaker announcements",
  "Full event schedule and session details ",
  "Scholarship opportunities",
  "Exclusive ROTAGI updates",
];

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Rwanda",
  "Uganda",
  "Other",
];

export default function RegisterInterestSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <section id="register" className="bg-white px-6 py-20 md:px-16 lg:px-24 border-t border-pink-100/30">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div>
          <p className="mb-4 font-semibold tracking-wider text-[#D62D88]">
Waitlist Form          </p>

          <h2 className="uppercase leading-[1.1] text-black text-3xl md:text-4xl">
            Be the First to Know
          </h2>

          <p className="mt-5 text-base leading-relaxed text-[#5D677C]">
            SHE Empower 2026 is coming. Register your interest and we will notify you the moment tickets open, speakers are announced, and the full schedule drops.
          </p>

          {/* BENEFITS */}
          <div className="mt-10 max-w-sm rounded-2xl border border-pink-100 bg-white p-6 w-full">
            <h5 className="mb-5 text-base text-black tracking-wide">
              What you will receive:
            </h5>

            <ul className="space-y-3">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#5D677C] font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 text-[#D62D88]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT (Form) */}
        <div className="rounded-2xl bg-[#FFF6FB] border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* FIRST NAME */}
            <div>
              <label className="mb-2 block text-sm text-[#5D677C]">
                First Name
              </label>

              <input
                type="text"
                placeholder="Your first name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="h-12 w-full rounded-md border border-pink-100 bg-[#FFF9FC] px-4 text-sm outline-none placeholder:text-[#BDBDBD] focus:border-[#D62D88] text-black font-medium transition-all"
              />

              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* LAST NAME */}
            <div>
              <label className="mb-2 block text-sm text-[#5D677C]">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Your last name"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="h-12 w-full rounded-md border border-pink-100 bg-[#FFF9FC] px-4 text-sm outline-none placeholder:text-[#BDBDBD] focus:border-[#D62D88] text-black font-medium transition-all"
              />

              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm text-[#5D677C]">
                Email Address
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="h-12 w-full rounded-md border border-pink-100 bg-[#FFF9FC] px-4 text-sm outline-none placeholder:text-[#BDBDBD] focus:border-[#D62D88] text-black font-medium transition-all"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

          

            {/* COUNTRY */}
            <div>
              <label className="mb-2 block text-sm text-[#5D677C]">
                I am...
              </label>

              <select
                {...register("country", {
                  required: "Please select a country",
                })}
                className="h-12 w-full rounded-md border border-pink-100 bg-[#FFF9FC] px-4 text-sm text-[#5D677C] outline-none focus:border-[#D62D88] font-medium transition-all"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              {errors.country && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="h-12 w-full rounded-md bg-[#D62D88]  tracking-wide cursor-pointer text-white transition hover:opacity-90 shadow-sm"
            >
              Register Interest
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}