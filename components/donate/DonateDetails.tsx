"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import { DonationDetailsInputs } from "@/types/donation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, Search, Heart, Sparkles, Star, Crown, CreditCard, EyeOff, Check } from "lucide-react";
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

// Preset amounts are defined in NGN and converted to the selected currency
// using the live exchange rate, so the tiles stay meaningful for donors
// giving from outside Nigeria.
const PRESET_AMOUNTS_NGN = [
  { ngn: 5000, label: "Spark", desc: "Covers a workshop seat", icon: Heart },
  { ngn: 15000, label: "Support", desc: "A month of mentorship", icon: Sparkles },
  { ngn: 50000, label: "Empower", desc: "A digital skills toolkit", icon: Star },
  { ngn: 100000, label: "Transform", desc: "A full scholarship boost", icon: Crown },
];

const SUB_STEPS = ["Amount", "Your Details", "Payment"];

type Props = {
  onNext: (data: DonationDetailsInputs) => void;
};

const DonateDetails = ({ onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find((c) => c.id === "NG") || COUNTRIES[0],
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // PayPal isn't connected yet, and Flutterwave has since been enabled to
  // collect international payments directly — so there's no longer a choice
  // to present: NGN goes through Paystack, everything else through Flutterwave.
  const provider: "paystack" | "flutterwave" = selectedCountry.currency === "NGN" ? "paystack" : "flutterwave";

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

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
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

  const amountValue = watch("amount");
  const rate = exchangeRate || 1;

  const presetAmounts = useMemo(
    () =>
      PRESET_AMOUNTS_NGN.map((preset) => ({
        ...preset,
        converted: Math.round(preset.ngn * rate),
      })),
    [rate],
  );

  const selectedPresetNgn = useMemo(() => {
    const numeric = Number((amountValue || "").replace(/,/g, ""));
    const match = presetAmounts.find((p) => p.converted === numeric);
    return match?.ngn ?? null;
  }, [amountValue, presetAmounts]);

  const applyPreset = (converted: number) => {
    setValue("amount", converted.toLocaleString("en-US"), { shouldValidate: true });
  };

  const goToDetails = async () => {
    const valid = await trigger("amount");
    if (valid) setSubStep(1);
  };

  const goToPayment = async () => {
    const fieldsToCheck = isAnonymous
      ? (["email", "phone"] as const)
      : (["fullName", "email", "phone"] as const);
    const valid = await trigger(fieldsToCheck);
    if (valid) setSubStep(2);
  };

  const onSubmit: SubmitHandler<DonationDetailsInputs> = (data) => {
    onNext({
      ...data,
      fullName: isAnonymous ? "Anonymous Donor" : data.fullName,
      currency: selectedCountry.currency,
      currencySymbol: selectedCountry.symbol,
      provider,
    });
  };

  return (
    <main className="flex justify-center items-start py-4 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] bg-white rounded-[28px] border border-gray-100 shadow-sm px-6 sm:px-10 py-9 sm:py-10 mx-auto overflow-hidden"
      >
        <div className="text-center pb-6">
          <p className="text-sm font-semibold tracking-wider text-[#D62D88] mb-2">Make a Difference</p>
          <h2 className="font-cal-sans text-3xl sm:text-4xl text-black uppercase leading-tight">
            Fuel Her Next Step
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-3">
            Choose an amount, tell us who you are, and we&apos;ll take it from there.
          </p>
        </div>

        {/* Sub-step indicator */}
        <div className="flex items-center justify-center gap-2 pb-8">
          {SUB_STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  subStep === i
                    ? "bg-[#D62D88] text-white"
                    : subStep > i
                      ? "bg-pink-50 text-[#D62D88]"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {subStep > i ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < SUB_STEPS.length - 1 && <div className="w-5 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* SUB-STEP 0 — COUNTRY + AMOUNT */}
          {subStep === 0 && (
            <motion.div
              key="amount-step"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Country — asked first so currency + phone flag follow from it */}
              <div className="mb-8">
                <label className="block mb-3 font-semibold text-black">
                  Where are you donating from? <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-full flex items-center justify-between gap-3 border-2 border-[#D3D3D3] hover:border-pink-300 focus:border-[#D62D88] rounded-lg px-4 py-3 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-5 relative flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                        <img
                          src={`https://flagcdn.com/w40/${selectedCountry.id.toLowerCase()}.png`}
                          alt={`${selectedCountry.name} flag`}
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className="text-black font-medium">{selectedCountry.name}</span>
                      <span className="text-xs text-gray-400">
                        {selectedCountry.currency} · {selectedCountry.symbol}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${isCountryOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[300px] overflow-y-auto overflow-x-hidden flex flex-col">
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
                <p className="mt-2 text-xs text-gray-400">
                  We&apos;ll show amounts in {selectedCountry.currency} and set the right dialing code for your phone number.
                </p>
              </div>

              {/* Amount — preset tiers */}
              <div className="mb-2">
                <label className="block mb-3 font-semibold text-black">
                  Donation Amount <span className="text-pink-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {presetAmounts.map((preset) => {
                    const Icon = preset.icon;
                    const isSelected = selectedPresetNgn === preset.ngn;
                    return (
                      <button
                        key={preset.ngn}
                        type="button"
                        onClick={() => applyPreset(preset.converted)}
                        className={`text-left rounded-2xl border-2 p-4 transition-colors ${
                          isSelected ? "border-[#D62D88] bg-pink-50" : "border-[#D3D3D3] hover:border-pink-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-[#D62D88]" : "text-gray-400"}`} />
                          <span className={`text-[10px] font-bold uppercase tracking-wide ${isSelected ? "text-[#D62D88]" : "text-gray-400"}`}>
                            {preset.label}
                          </span>
                        </div>
                        <p className="text-lg font-cal-sans text-black">
                          {selectedCountry.symbol}{preset.converted.toLocaleString("en-US")}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{preset.desc}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="relative flex items-center mt-3">
                  <span className="absolute left-4 text-gray-700 font-medium text-lg border-r pr-3 border-gray-300">
                    {selectedCountry.symbol}
                  </span>
                  <input
                    id="amount"
                    type="text"
                    inputMode="decimal"
                    placeholder="Or enter a custom amount"
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
                    className="w-full border-2 outline-0 border-[#D3D3D3] focus:border-[#D62D88] rounded-lg px-4 py-3 pl-16 transition-colors"
                  />
                </div>
                <div className="mt-2 flex justify-end items-center">
                  <div className="text-xs text-gray-400 font-medium tracking-tight">
                    {isLoadingRate ? (
                      <span className="animate-pulse">Loading rates…</span>
                    ) : exchangeRate ? (
                      <span>1 NGN = {exchangeRate.toFixed(4)} {selectedCountry.currency}</span>
                    ) : (
                      <span>Rate unavailable</span>
                    )}
                  </div>
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                )}
              </div>

              <div className="mt-8 flex sm:justify-end">
                <Button
                  withArrow
                  type="button"
                  onClick={goToDetails}
                  className="w-full sm:w-auto justify-center py-3.5 rounded-full font-bold bg-[#D62D88] hover:bg-[#D62D88]/90 shadow-lg shadow-pink-200"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* SUB-STEP 1 — YOUR DETAILS */}
          {subStep === 1 && (
            <motion.div
              key="details-step"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Anonymous toggle — its own prominent row, not a tucked-away checkbox */}
              <button
                type="button"
                onClick={() => setIsAnonymous((v) => !v)}
                className={`w-full flex items-center justify-between gap-4 rounded-2xl border-2 px-4 py-3.5 mb-6 text-left transition-colors ${
                  isAnonymous ? "border-[#D62D88] bg-pink-50" : "border-[#D3D3D3] bg-gray-50 hover:border-pink-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <EyeOff className={`w-5 h-5 shrink-0 ${isAnonymous ? "text-[#D62D88]" : "text-gray-400"}`} />
                  <div>
                    <p className="text-sm font-semibold text-black">Donate anonymously</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Your name won&apos;t be shown — recorded as &quot;Anonymous Donor&quot;
                    </p>
                  </div>
                </div>
                <span
                  role="switch"
                  aria-checked={isAnonymous}
                  className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
                    isAnonymous ? "bg-[#D62D88]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      isAnonymous ? "translate-x-5" : ""
                    }`}
                  />
                </span>
              </button>

              {!isAnonymous && (
                <div className="mb-6">
                  <label htmlFor="fullName" className="block mb-1.5 text-sm font-medium text-black">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    {...register("fullName", { required: !isAnonymous && "Full name is required" })}
                    placeholder="Enter your full name"
                    className="w-full outline-0 border-2 border-[#D3D3D3] focus:border-[#D62D88] rounded-lg px-4 py-2.5 transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-black">
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
                  className="w-full outline-0 border-2 border-[#D3D3D3] focus:border-[#D62D88] rounded-lg px-4 py-2.5 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block mb-1.5 text-sm font-medium text-black">
                  Phone Number <span className="text-pink-500">*</span>
                </label>
                <div className="flex items-center border-2 border-[#D3D3D3] rounded-lg focus-within:border-[#D62D88] transition-colors">
                  {/* Dialing code follows the country picked in step 1 */}
                  <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border-r border-[#D3D3D3] rounded-l-md">
                    <div className="w-6 h-4 relative flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                      <img
                        src={`https://flagcdn.com/w40/${selectedCountry.id.toLowerCase()}.png`}
                        alt={`${selectedCountry.name} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{selectedCountry.code}</span>
                  </div>

                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: "Phone is required" })}
                    placeholder="9078675431"
                    className="w-full outline-0 px-4 py-2.5"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="message" className="block mb-1.5 text-sm font-medium text-black">
                  Optional Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  placeholder="Share why you are supporting this cause (optional)"
                  className="w-full h-24 border-2 border-[#D3D3D3] focus:border-[#D62D88] outline-0 rounded-lg px-4 py-2.5 resize-none transition-colors"
                />
              </div>

              <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSubStep(0)}
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#D62D88] transition-colors py-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <Button
                  withArrow
                  type="button"
                  onClick={goToPayment}
                  className="w-full sm:w-auto justify-center py-3.5 rounded-full font-bold bg-[#D62D88] hover:bg-[#D62D88]/90 shadow-lg shadow-pink-200"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* SUB-STEP 2 — PAYMENT METHOD + SUBMIT */}
          {subStep === 2 && (
            <motion.div
              key="payment-step"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-8">
                <label className="block mb-3 font-semibold text-black">
                  Payment Method
                </label>
                <div className="flex items-center gap-3 p-4 border-2 border-[#D3D3D3] rounded-2xl bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-[#D62D88]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {provider === "paystack" ? "Paystack Checkout" : "Flutterwave Checkout"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {provider === "paystack"
                        ? "Securely pay with Card, Bank Transfer, or USSD"
                        : "Securely pay with Card, Apple Pay, or Google Pay"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick recap so the donor isn't submitting blind */}
              <div className="mb-8 rounded-2xl border border-dashed border-gray-200 p-5 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="text-black font-semibold">
                    {selectedCountry.symbol}{amountValue || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Donor</span>
                  <span className="text-black font-semibold">
                    {isAnonymous ? "Anonymous Donor" : watch("fullName") || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="text-black font-semibold truncate max-w-[180px]">{watch("email") || "—"}</span>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSubStep(1)}
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#D62D88] transition-colors py-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <Button
                  withArrow
                  type="submit"
                  className="w-full sm:w-auto justify-center py-4 rounded-full font-bold bg-[#D62D88] hover:bg-[#D62D88]/90 shadow-lg shadow-pink-200"
                >
                  Continue to Review
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </main>
  );
};

export default DonateDetails;
