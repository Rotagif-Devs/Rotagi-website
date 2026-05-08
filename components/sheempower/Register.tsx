"use client";

import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

const benefits = [
  "Early access to tickets",
  "Speaker announcements",
  "Full schedule reveal",
  "Scholarship opportunities",
  "Exclusive updates",
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
    <section className="bg-white px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div>
          <p className="mb-4 font-medium text-[#D62D88]">
            Be the First to Know
          </p>

          <h3 className="max-w-md uppercase leading-tight text-black">
            Register Your Interest
          </h3>
          

          <p className="mt-5 text-base text-[#667085]">
            Get early updates on SHE Empower 2026
          </p>

          {/* BENEFITS */}
          <div className="mt-10 max-w-sm rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <h5 className="mb-5 text-sm! text-black">
              What you will receive:
            </h5>

            <ul className="space-y-3">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#667085]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 text-black"
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
        {/* RIGHT */}
        <div className="rounded-2xl bg-[rgb(255,246,251)] p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* FIRST NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-[#667085]">
                First name
              </label>

              <input
                type="text"
                placeholder="Your first name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="h-12 w-full rounded-md border border-transparent bg-white px-4 text-sm outline-none placeholder:text-[#BDBDBD] focus:border-[#E63C92]"
              />

              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* LAST NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-[#667085]">
                Last Name
              </label>

              <input
                type="text"
                placeholder="last name"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="h-12 w-full rounded-md border border-transparent bg-white px-4 text-sm outline-none placeholder:text-[#BDBDBD] focus:border-[#E63C92]"
              />

              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-[#667085]">
                Email Address
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                })}
                className="h-12 w-full rounded-md border border-transparent bg-white px-4 text-sm outline-none placeholder:text-[#BDBDBD] focus:border-[#E63C92]"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ROLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-[#667085]">
                I am...
              </label>

              <select
                {...register("role", {
                  required: "Please select an option",
                })}
                className="h-12 w-full rounded-md border border-transparent bg-white px-4 text-sm text-[#6B7280] outline-none focus:border-[#E63C92]"
              >
                <option value="">here...</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="speaker">Speaker</option>
                <option value="founder">Founder</option>
              </select>

              {errors.role && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="h-12 w-full rounded-md bg-[#D62D88] text-sm font-medium cursor-pointer text-white transition hover:opacity-90"
            >
              Register Interest
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}