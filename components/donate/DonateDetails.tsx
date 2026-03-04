"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";

type Inputs = {
  email: string;
  fullName: string;
  phone: string;
  message?: string;
  amount: string;
};

type Props = {
  onNext: (data: Inputs) => void;
};

const DonateDetails = ({ onNext }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
            className=" font-medium text-2xl "
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Make a Difference
          </div>
          <p>Provide your details and enter your donation amount.</p>
        </div>
        <div className="mb-8">
          <label htmlFor="fullName" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="John Doe"
            className="w-full  outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-8">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email Address
          </label>
          <input
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="youremail@example.com"
            className="w-full  outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-8">
          <label htmlFor="phone" className="block mb-1 font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone", { required: "Phone is required" })}
            placeholder="+234 809 567 6669"
            className="w-full border-2 border-[#D3D3D3] outline-0 rounded-lg px-4 py-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        {/* Message */}
        <div className="mb-8">
          <label htmlFor="message" className="block mb-1 font-medium">
            Optional Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            placeholder="Share why you are supporting this cause (optional)"
            className="w-full h-32 border-2 border-[#D3D3D3] outline-0 rounded-lg px-4 py-2 resize-none"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
        </div>
        <div className="mb-8 relative">
          <label htmlFor="amount" className="block mb-1 font-medium">
            Amount
          </label>
          <div className="flex items-center gap-2">
            <span className="absolute left-3  text-gray-500">₦</span>
            <input
              id="amount"
              type="number"
              {...register("amount", {
                required: "Amount is required",
              //   onChange: (e) => {
              //     let value = e.target.value;

              //     // Remove everything except numbers and dot
              //     value = value.replace(/[^0-9.]/g, "");

              //     if (!value) {
              //       e.target.value = "";
              //       return;
              //     }

              //     const numberValue = parseFloat(value);

              //     if (!isNaN(numberValue)) {
              //       e.target.value = numberValue.toLocaleString("en-NG", {
              //         minimumFractionDigits: 2,
              //         maximumFractionDigits: 2,
              //       });
              //     }
              //   },
              // })}
              })}
              placeholder="0.00"
              className="w-full border-2 outline-0 border-[#D3D3D3] rounded-lg px-4 py-2 pr-4 pl-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>
        <Button type="submit">Proceed with payment</Button>
      </form>
    </main>
  );
};

export default DonateDetails;
