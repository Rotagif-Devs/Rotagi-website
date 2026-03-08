"use client";

type Props = {
  currentStep: number;
  totalSteps: number;
};
const Stepper = ({ currentStep, totalSteps }: Props) => {
  return (
    <div className="flex flex-col items-center rounded-lg mb-6">

      <div className="flex items-center">

        {/* Step 1 */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold
          ${
            currentStep >= 1
              ? "bg-pink-500 text-white"
              : "border-2 border-pink-500 text-pink-500"
          }`}
        >
          1
        </div>

        {/* Line */}
        <div className="w-24 h-[2px] bg-pink-400 mx-2"></div>

        {/* Step 2 */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold
          ${
            currentStep >= 2
              ? "bg-pink-500 text-white"
              : "border-2 border-pink-500 text-pink-500"
          }`}
        >
          2
        </div>

      </div>

      <p className="mt-2 text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </p>

    </div>
  );
};

export default Stepper;