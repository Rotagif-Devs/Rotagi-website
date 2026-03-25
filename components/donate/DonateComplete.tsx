import React from "react";
import Button from "../ui/Button";
import Image from "next/image";
import { DonationData } from "@/types/donation";

type Props = {
  data: DonationData;
  onBack: () => void;
  onNext: () => void;
};

const DonateComplete = ({ data, onBack, onNext }: Props) => {
  return (
    <section className="min-h-screen bg-primary flex justify-center items-center px-4 pb-4">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-[#D3D3D3] p-6 sm:p-8">
        {/* Back Button */}
        <button className="flex items-center gap-1 text-sm mb-6 px-3 py-2 rounded-md cursor-pointer" onClick={onBack}>
          {/* <FaArrowLeft className="text-xs" /> */}
          <Image src="/arrowba.png" width={20} height={20} className="object-contain" alt="Back Arrow Icon" />   
          Back
        </button>

        {/* Header */}
        <div className="text-center pb-6">
          <h2
            className="font-medium !text-3xl mb-2"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Review Your Donation
          </h2>
          <p className="text-[#373737] !text-sm">
            Please review your donation details before proceeding to secure payment.
          </p>
        </div>

        {/* Donation Summary */}
        <div className="space-y-4 border border-[#D3D3D3] py-5 px-5 rounded-xl my-10 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-black text-sm">Donation Amount</span>
            <span className="text-[#D62D88] font-medium">₦{data.amount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-black text-sm">Donation Type</span>
            <span className="text-sm">One-time</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-black text-sm">Email Address</span>
            <span className="text-sm">{data.email}</span>
          </div>

        </div>

        {/* Payment Method */}
        <div className="my-10">
          <p className="text-sm mb-3">Secure Payment Gateway</p>

          <div className="border border-[#D3D3D3] rounded-lg p-4 flex flex-col gap-3">
              <Image src="/creditcard.png" width={24} height={24} alt="Secure Lock Icon" />
            <div className="flex flex-col gap-1">
              <p className="text-base! !font-medium text-black">Paystack Checkout</p>
              <p className="text-sm! text-black">
                Securely pay with Card, Bank Transfer, or USSD
              </p>
            </div>
          </div>
        </div>

        {/* SSL Info */}
        <div className="my-10 bg-[#FABFD3] rounded-lg p-4 flex gap-4 items-center">
          <div className="">
            <Image src="/cardlock.png" width={24} height={24} alt="Secure Lock Icon" />
          </div>
          <div>
            <div className="font-light text-xl lg:text-[1.2rem] my-1 text-black">
              Secure SSL Encrypted Payment
            </div>
            <p className=" font-medium !text-base text-black">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
        {/* Pay Button */}
        <Button className="my-2 w-full bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-full font-medium cursor-pointer"  onClick={onNext}>Proceed to Payment</Button>
        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By proceeding, you agree to our terms and conditions
        </p>

      </div>
    </section>
  );
};

export default DonateComplete;