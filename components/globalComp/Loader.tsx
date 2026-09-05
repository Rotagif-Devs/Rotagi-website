import { Lock } from "lucide-react";

interface LoaderProps {
  title?: string;
  message?: string;
}

const Loader = ({
  title = "Processing Payment",
  message = "Please do not refresh the page or close the browser.",
}: LoaderProps) => {
  return (
    <section className="flex justify-center items-center fixed inset-0 z-50 bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-white rounded-[28px] shadow-2xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#D62D88] to-[#41122B]" />

        <div className="flex flex-col items-center text-center px-8 py-12">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-[3px] border-pink-100" />
            <div
              className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#D62D88] border-r-[#D62D88] animate-spin"
              style={{ animationDuration: "1s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#D62D88]" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <h3 className="font-cal-sans text-xl text-black uppercase leading-tight mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">{message}</p>

          <div className="flex items-center gap-1.5 mt-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#D62D88] animate-bounce"
              style={{ animationDelay: "-0.3s" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#D62D88] animate-bounce"
              style={{ animationDelay: "-0.15s" }}
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D62D88] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Loader;
