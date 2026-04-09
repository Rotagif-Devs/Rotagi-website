"use client";
import { Mail, Headphones, MapPin, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ContactFormValues } from "@/types/contact";
import { submitContactMessage } from "@/lib/services/contact.service";
import { SubmittingState, SuccessState, ErrorState } from "./ContactStates";

const contactItems = [
    {
        icon: Mail,
        title: "Email",
        content: "info@rotagi.org",
    },
    {
        icon: Headphones,
        title: "Phone",
        content: "Phone (WhatsApp) +2348032368560",
    },
    {
        icon: MapPin,
        title: "Address",
        content:
            "No. 1 Magazar Close, Eagle Billed Estate Off Vio Mabuchi. Federal Capital Territory (Abuja). Nigeria.",
    },
];

export default function ContactMessage() {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        defaultValues: {
            fullName: "",
            message: "",
            email: "",
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setFormStatus("submitting");
        setSubmittedData({ name: data.fullName, email: data.email });
        
        try {
            await submitContactMessage(data);
            setFormStatus("success");
            reset();
        } catch (error) {
            console.error(error);
            setFormStatus("error");
        }
    };

    const handleReset = () => {
        setFormStatus("idle");
        setSubmittedData(null);
    };

    if (formStatus === "success" && submittedData) {
        return (
            <SuccessState 
                name={submittedData.name} 
                email={submittedData.email} 
                onReset={handleReset} 
            />
        );
    }

    if (formStatus === "error") {
        return <ErrorState onReset={handleReset} />;
    }

    return (
        <section className="w-full rounded-[20px] bg-white py-8 px-4 sm:rounded-[24px] sm:px-6 sm:py-10 md:px-8 lg:rounded-[28px] lg:px-16 lg:py-14 relative">
            {formStatus === "submitting" && <SubmittingState />}
            
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 leading-relaxed">
                {/* Left */}
                <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl !normal-case font-bold tracking-tight text-slate-900 font-cal-sans">
                        Send us a message!
                    </h2>
                    <p className="my-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg sm:leading-8 lg:leading-9">
                        For inquiries, partnerships, or general information, please send us
                        a message and our team will respond promptly.
                    </p>

                    <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10">
                        {contactItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="flex items-start gap-4 rounded-[18px] border border-[#e6e6e6] bg-white px-4 py-2 sm:gap-5 sm:rounded-[22px] sm:px-5 sm:py-6 lg:px-4 lg:py-5"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fdeaf3] sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                                        <Icon className="h-5 w-5 text-[#e63b93] sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-medium text-[#6B7280] sm:text-lg">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 break-words font-medium leading-7 text-[#46455F] sm:mt-2 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right */}
                <div className="rounded-[20px] bg-[#fdf0f7] p-4 sm:rounded-[24px] sm:p-6 md:p-8 lg:rounded-[28px] lg:p-10">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5 sm:space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="fullName"
                                className="mb-2 block text-base font-medium text-slate-500 sm:mb-3 sm:text-lg"
                            >
                                Full name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Your full name"
                                {...register("fullName", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Full name must be at least 2 characters",
                                    },
                                })}
                                className={`h-12 w-full rounded-xl bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-[#c6bfd0] sm:h-16 sm:rounded-2xl sm:px-6 sm:text-base ${errors.fullName
                                        ? "border border-red-500"
                                        : "border border-[#f1e5ec] focus:border-[#e63b93]"
                                    }`}
                            />
                            {errors.fullName && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="mb-2 block text-base font-medium text-slate-500 sm:mb-3 sm:text-lg"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="Write your message..."
                                {...register("message", {
                                    required: "Message is required",
                                    minLength: {
                                        value: 10,
                                        message: "Message must be at least 10 characters",
                                    },
                                })}
                                className={`w-full rounded-xl bg-white px-4 py-4 text-sm text-slate-700 outline-none placeholder:text-[#c6bfd0] sm:rounded-2xl sm:px-6 sm:py-5 sm:text-base ${errors.message
                                        ? "border border-red-500"
                                        : "border border-[#f1e5ec] focus:border-[#e63b93]"
                                    }`}
                            />
                            {errors.message && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-base font-medium text-slate-500 sm:mb-3 sm:text-lg"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                className={`h-14 w-full rounded-xl bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-[#c6bfd0] sm:h-16 sm:rounded-2xl sm:px-6 sm:text-base ${errors.email
                                        ? "border border-red-500"
                                        : "border border-[#f1e5ec] focus:border-[#e63b93]"
                                    }`}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={formStatus === "submitting"}
                            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#e61e8a] px-5 text-base font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:h-16 sm:gap-3 sm:rounded-2xl sm:px-6 sm:text-lg lg:text-xl"
                        >
                            {formStatus === "submitting" ? "Sending..." : "Send message"}
                            <span></span>
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

