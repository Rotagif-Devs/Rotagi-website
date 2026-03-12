import { RotateCw, Lock } from "lucide-react";

const Loader = () => {
  return (
    <section className="flex justify-center items-center fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="flex justify-center items-center text-center flex-col rounded-2xl bg-white p-16 w-[90%] md:w-[600px] shadow-xl">
        <div className="relative flex items-center justify-center w-16 h-16 mb-6">
          <RotateCw
            className="w-14 h-14 text-[#D62D88] absolute animate-spin"
            strokeWidth={1}
          />
          <Lock className="w-4 h-4 text-[#D62D88] absolute" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold font-cal-sans mb-3 text-black">
          Processing Payment
        </h3>
        <p className="text-[#D62D88] text-base font-dm-sans">
          Please do not refresh the page or close the browser.
        </p>
      </div>
    </section>
  );
};
export default Loader;
