"use client";

import { Check } from "lucide-react";

type Props = {
  currentStep: number;
  totalSteps: number;
};

const LABELS = ["Details", "Review"];

const Stepper = ({ currentStep, totalSteps }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 py-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              currentStep === step
                ? "bg-[#D62D88] text-white"
                : currentStep > step
                  ? "bg-pink-50 text-[#D62D88]"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {currentStep > step ? <Check className="w-3.5 h-3.5" /> : <span>{step}</span>}
            {LABELS[i] || `Step ${step}`}
          </div>
          {i < totalSteps - 1 && <div className="w-6 h-px bg-gray-200" />}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
