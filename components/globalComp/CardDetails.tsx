"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import Image from "next/image";
import { CardInputs } from "@/types/donation";

type Props = {
  data: {
    amount: string;
  };
  amount: string;
  onNext: (data: CardInputs) => void;
  onReturn: () => void;
};

const CardDetails = ({ data, amount, onNext, onReturn }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CardInputs>();

  const onSubmit: SubmitHandler<CardInputs> = (data) => {
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
        <div className="flex justify-between pb-5">
          <div
            className=" font-medium text-2xl "
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Card Details
          </div>
          <span className="cursor-pointer" onClick={onReturn}>close</span>
        </div>

        <div className="mb-8">
          <label htmlFor="cardNumber" className="block mb-1 font-medium">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            maxLength={19}
            placeholder="Enter a correct card number"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^[0-9\s]{13,19}$/,
                message: "Enter a valid card number",
              },
              validate: (value) => {
                const digits = value.replace(/\s/g, "");
                if (digits.length < 13 || digits.length > 19) {
                  return "Invalid card number length";
                }
                return true;
              },
            })}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");

              value = value.replace(/(.{4})/g, "$1 ").trim();

              e.target.value = value;
            }}
            className="w-full outline-0 border-2 border-[#D3D3D3] placeholder:text-[#D3D3D3] text-black rounded-lg px-4 py-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="cardholderName" className="block mb-1 font-medium">
            Cardholder Name
          </label>
          <input
            id="cardholderName"
            {...register("cardholderName", {
              required: "cardholder name is required",
            })}
            placeholder="Enter your full name"
            className="w-full placeholder:normal-case uppercase outline-0 border-2 border-[#D3D3D3] rounded-lg px-4 py-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {errors.cardholderName && (
            <p className="text-red-500 text-sm">
              {errors.cardholderName.message}
            </p>
          )}
        </div>

        <div className="mb-8 flex gap-8">
          <div className="w-full">
            <label htmlFor="expiryDate" className="block mb-1 font-medium">
              Expiry Date
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              maxLength={5}
              {...register("expiryDate", {
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Enter valid format MM/YY",
                },
              })}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");

                if (value.length >= 3) {
                  value = value.slice(0, 2) + "/" + value.slice(2, 4);
                }

                e.target.value = value;
              }}
              className="
                w-full border-2 border-[#D3D3D3] outline-none 
                rounded-lg px-4 py-2 
                text-black
                placeholder:text-[#D3D3D3]
            "
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="CVV" className="block mb-1 font-medium">
              CVV
            </label>
            <input
              type="password"
              inputMode="numeric"
              placeholder="CVV"
              maxLength={3}
              {...register("CVV", {
                required: "CVV is required",
                pattern: {
                  value: /^[0-9]{3,4}$/,
                  message: "Invalid CVV",
                },
              })}
              className="
                w-full border-2 border-[#D3D3D3] outline-none 
                rounded-lg px-4 py-2 
                text-black
                placeholder:text-[#D3D3D3]
            "
            />
            {errors.CVV && (
              <p className="text-red-500 text-sm">{errors.CVV.message}</p>
            )}
          </div>
        </div>

        <div className=" mb-8 flex gap-4 items-center">
          <div>
            <Image
              src="/cardlock.png"
              width={24}
              height={24}
              alt="Secure Lock Icon"
            />
          </div>
          <div>
            <p className=" font-light !text-[1.1rem] text-[#373737]">
              Your card details are encrypted and secure. We never store your
              full card information.
            </p>
          </div>
        </div>

        <Button type="submit" className="cursor-pointer">Pay {amount}</Button>
      </form>
    </main>
  );
};

export default CardDetails;
