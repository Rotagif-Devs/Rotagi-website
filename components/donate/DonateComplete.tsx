import React from "react";
import Button from "../ui/Button";
import { ArrowLeft, ShieldCheck, CreditCard } from "lucide-react";
import { DonationData } from "@/types/donation";

type Props = {
  data: DonationData;
  onBack: () => void;
  onNext: () => void;
};

const PROVIDER_LABEL: Record<string, string> = {
  paypal: "PayPal Checkout",
  flutterwave: "Flutterwave Checkout",
  paystack: "Paystack Checkout",
};

const PROVIDER_DESC: Record<string, string> = {
  paypal: "Securely pay with your PayPal account or Credit Card",
  flutterwave: "Securely pay with Credit Card, Apple Pay, or Google Pay",
  paystack: "Securely pay with Card, Bank Transfer, or USSD",
};

const DonateComplete = ({ data, onBack, onNext }: Props) => {
  const provider = data.provider || "paystack";

  return (
    <section className="min-h-screen bg-primary flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#D62D88] to-[#41122B]" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center pb-6">
            <p className="text-sm font-semibold tracking-wider text-[#D62D88] mb-2">One Last Look</p>
            <h2 className="font-cal-sans text-3xl text-black uppercase leading-tight">
              Review Your Donation
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Confirm the details below before we take you to secure payment.
            </p>
          </div>

          {/* Donation Summary */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-500 text-sm">Donation Amount</span>
              <span className="text-[#D62D88] font-cal-sans text-2xl">
                {data.currencySymbol || "₦"}{data.amount}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Donation Type</span>
                <span className="text-black font-medium">One-time</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Full Name</span>
                <span className="text-black font-medium truncate max-w-[180px]">{data.fullName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Email Address</span>
                <span className="text-black font-medium truncate max-w-[180px]">{data.email}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-black mb-3">Secure Payment Gateway</p>
            <div className="rounded-2xl border border-gray-100 p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-[#D62D88]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black">
                  {PROVIDER_LABEL[provider]}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {PROVIDER_DESC[provider]}
                </p>
              </div>
            </div>
          </div>

          {/* SSL Info */}
          <div className="mt-6 rounded-2xl bg-pink-50 border border-pink-100 p-4 flex gap-3 items-center">
            <ShieldCheck className="w-6 h-6 text-[#D62D88] shrink-0" />
            <div>
              <p className="text-sm font-semibold text-black">Secure SSL Encrypted Payment</p>
              <p className="text-xs text-gray-500 mt-0.5">Your payment information is encrypted and secure.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#D62D88] transition-colors py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <Button
              withArrow
              onClick={onNext}
              className="w-full sm:w-auto justify-center whitespace-nowrap bg-[#D62D88] text-white hover:bg-[#D62D88]/90 rounded-full px-10 py-3.5 font-semibold shadow-lg shadow-pink-200"
            >
              Proceed to Payment
            </Button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonateComplete;
