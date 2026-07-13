"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import { DonationDetailsInputs } from "@/types/donation";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import countriesData from "@/data/countries.json";

// Define the Country type based on our JSON structure
type Country = {
  id: string;
  name: string;
  code: string;
  flag: string;
  currency: string;
  symbol: string;
};

const COUNTRIES = countriesData as Country[];

type Props = {
  onNext: (data: DonationDetailsInputs) => void;
};

const DonateDetails = ({ onNext }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find((c) => c.id === "NG") || COUNTRIES[0],
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [provider, setProvider] = useState<"paystack" | "paypal" | "flutterwave">("paypal");

  // Filtered countries based on search
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.includes(searchTerm),
    );
  }, [searchTerm]);

  // Fetch exchange rate on country change
  useEffect(() => {
    const fetchRate = async () => {
      if (selectedCountry.currency === "NGN") {
        setExchangeRate(1);
        return;
      }

      setIsLoadingRate(true);
      try {
        // Free API for exchange rates (NGN to Target)
        const res = await fetch(`https://open.er-api.com/v6/latest/NGN`);
        const data = await res.json();
        if (data && data.rates && data.rates[selectedCountry.currency]) {
          setExchangeRate(data.rates[selectedCountry.currency]);
        } else {
          setExchangeRate(null);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        setExchangeRate(null);
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchRate();
  }, [selectedCountry.currency]);

  // Update provider automatically if NGN
  useEffect(() => {
    if (selectedCountry.currency === "NGN") {
      setProvider("paystack");
    } else {
      setProvider("paypal");
    }
  }, [selectedCountry.currency]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DonationDetailsInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      amount: "",
    },
  });

  const onSubmit: SubmitHandler<DonationDetailsInputs> = (data) => {
    onNext({
      ...data,
      currency: selectedCountry.currency,
      currencySymbol: selectedCountry.symbol,
      provider: selectedCountry.currency === "NGN" ? "paystack" : provider,
    });
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
            px-8 sm:px-8
            py-7 sm:py-8
            bg-white
            rounded-xl
            flex
            flex-col
            justify-center
            mx-auto"
      >
        <div className="text-center flex justify-center flex-col pb-5">
          <div
            className=" font-medium text-[46px] "
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Make a Difference
          </div>
          <p className="text-[18px]">
            Provide your details and enter your donation amount.
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-8">
          <label htmlFor="fullName" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Enter your full name"
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
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
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
            Phone Number <span className="text-pink-500">*</span>
          </label>
          <div className="flex items-center border-2 border-[#D3D3D3] rounded-lg focus-within:border-secondary transition-colors">
            {/* Country Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-r border-[#D3D3D3] hover:bg-gray-100 transition-colors rounded-l-md min-w-[70px]"
              >
                <div className="w-6 h-4 relative flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                  <img
                    src={`https://flagcdn.com/w40/${selectedCountry.id.toLowerCase()}.png`}
                    alt={`${selectedCountry.name} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${isCountryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[280px] max-h-[300px] overflow-y-auto overflow-x-hidden flex flex-col">
                  <div className="sticky top-0 bg-white p-2 border-b border-gray-100 flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search country..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm py-1"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {filteredCountries.map((country) => (
                    <button
                      key={country.id}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryOpen(false);
                        setSearchTerm("");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-pink-50 transition-colors text-left"
                    >
                      <div className="w-5 h-3.5 relative flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border border-gray-100">
                        <img
                          src={`https://flagcdn.com/w40/${country.id.toLowerCase()}.png`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium truncate flex-1">
                        {country.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {country.code}
                      </span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-4 text-center text-gray-500 text-sm">
                      No countries found
                    </div>
                  )}
                </div>
              )}
            </div>

            <input
              id="phone"
              type="tel"
              {...register("phone", { required: "Phone is required" })}
              placeholder="9078675431"
              className="w-full outline-0 px-4 py-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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

        {/* Amount */}
        <div className="mb-8 relative">
          <label htmlFor="amount" className="block mb-1 font-medium">
            Amount <span className="text-pink-500">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-700 font-medium text-lg border-r pr-3 border-gray-300">
              {selectedCountry.symbol}
            </span>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              {...register("amount", {
                required: "Amount is required",
                onChange: (e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, "");
                  if (!value) {
                    e.target.value = "";
                    return;
                  }
                  const parts = value.split(".");
                  if (parts.length > 2)
                    value = parts[0] + "." + parts.slice(1).join("");

                  const num = parts[0];
                  const formattedNum = num
                    ? Number(num).toLocaleString("en-US")
                    : "";
                  e.target.value =
                    parts.length > 1
                      ? `${formattedNum}.${parts[1]}`
                      : formattedNum;
                },
              })}
              placeholder="1,559"
              className="w-full border-2 outline-0 border-[#D3D3D3] focus:border-secondary rounded-lg px-4 py-2 pl-16 transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
          </div>
          <div className="mt-2 flex justify-end items-center">
            <div className="text-xs text-gray-900 font-medium tracking-tight">
              {isLoadingRate ? (
                <span className="animate-pulse">Loading rates...</span>
              ) : exchangeRate ? (
                <span className="flex items-center gap-2">
                  <p className="text-xs text-gray-900">Rate =</p>
                  <span>
                    1 NGN = {exchangeRate.toFixed(4)} {selectedCountry.currency}
                  </span>
                </span>
              ) : (
                <span>Rate unavailable</span>
              )}
            </div>
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Payment Provider Selection (for non-NGN) */}
        {selectedCountry.currency !== "NGN" && (
          <div className="mb-8 relative">
            <label htmlFor="provider" className="block mb-2 font-medium">
              Select Payment Method <span className="text-pink-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className={`flex-1 flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${provider === 'paypal' ? 'border-secondary bg-pink-50' : 'border-[#D3D3D3] hover:border-pink-300'}`}>
                <input 
                  type="radio" 
                  name="provider" 
                  value="paypal" 
                  checked={provider === 'paypal'} 
                  onChange={() => setProvider('paypal')}
                  className="hidden" 
                />
                <span className="font-semibold text-gray-800">PayPal</span>
              </label>
              <label className={`flex-1 flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${provider === 'flutterwave' ? 'border-secondary bg-pink-50' : 'border-[#D3D3D3] hover:border-pink-300'}`}>
                <input 
                  type="radio" 
                  name="provider" 
                  value="flutterwave" 
                  checked={provider === 'flutterwave'} 
                  onChange={() => setProvider('flutterwave')}
                  className="hidden" 
                />
                <span className="font-semibold text-gray-800">Card (Flutterwave)</span>
              </label>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full py-4 rounded-full font-bold bg-secondary hover:opacity-90"
        >
          Proceed to Secure Payment
        </Button>
      </form>
    </main>
  );
};

export default DonateDetails;
