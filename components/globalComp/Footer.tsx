"use client";

import Link from "next/link";
import React from "react";
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import { subscribeNewsletter } from "@/lib/services/newsletter.service";
import { Loader2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus("success");
        setMessage(res.data?.message || "Successfully subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.message || "Failed to subscribe. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "An error occurred. Please try again.");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <footer className="flex justify-center bg-primary">
      <div className="bg-black text-white flex flex-col justify-between w-full lg:mx-6 mt-6 lg:rounded-3xl px-8 py-16 md:px-12 md:py-12 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pt-4 w-full">

          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="ROTAGI Home">
              <h2 className="text-4xl mb-3 font-cal-sans font-normal text-white">
                ROTAGI
              </h2>
            </Link>
            <p className="text-gray-400 text-sm font-normal font-dm-sans mb-8">
              Where African Girls Discover, Learn, and Lead.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <div className="bg-white rounded-xl p-1.5 flex items-center shadow-sm border border-gray-100">
                <input
                  type="email"
                  placeholder="Join our newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-2 text-gray-500 text-sm w-full"
                  required
                />
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="bg-[#D81B7E] text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-pink-700 transition-all shrink-0"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : status === "success" ? (
                    "Subscribed"
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              {status === "success" && (
                <p className="mt-2 text-green-400 text-xs">{message}</p>
              )}
              {status === "error" && (
                <p className="mt-2 text-red-400 text-xs">{message}</p>
              )}
            </form>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-cal-sans text-base mb-6 uppercase tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-dm-sans">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sheempower" className="hover:text-white transition-colors">
                  SHE Empower
                </Link>
              </li>
              <li>
                <Link href="/child-protection" className="hover:text-white transition-colors">
                  Child Protection
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="hover:text-white transition-colors">
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-white font-cal-sans text-base mb-6 uppercase tracking-wide">
              Get Involved
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-dm-sans">
              <li>
                <Link href="/donate" className="hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white transition-colors">
                  Volunteer With Us
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-white transition-colors">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-cal-sans text-base mb-6 uppercase tracking-wide">
              Contact
            </h4>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8 text-white">
              <Link
                href="https://www.facebook.com/officialrotagi"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-secondary transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://x.com/officialrotagi"
                target="_blank"
                aria-label="X (Twitter)"
                className="hover:text-secondary transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/officialrotagi/"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-secondary transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/officialrotagi"
                target="_blank"
                aria-label="LinkedIn"
                className="hover:text-secondary transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 text-gray-400 text-sm font-dm-sans">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white shrink-0" />
                <Link
                  href="mailto:info@rotagif.com"
                  className="hover:text-white transition-colors"
                >
                  info@rotagif.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-white shrink-0" />
                <Link
                  href="https://wa.me/2348032368560"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  +234 803 236 8560
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 text-gray-400">
          <p style={{
            fontFamily: "var(--font-epilogue), sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "15px",
            lineHeight: "31px",
            letterSpacing: "-0.02em",
            verticalAlign: "middle"
          }}>© 2026 ROTAGI. All rights reserved.</p>
          <span className="hidden md:inline text-white/20" style={{
            fontFamily: "var(--font-epilogue), sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "15px",
            lineHeight: "31px",
            letterSpacing: "-0.02em",
            verticalAlign: "middle"
          }}>|</span>
          <div className="flex gap-3 items-center">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "var(--font-epilogue), sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "15px",
                lineHeight: "31px",
                letterSpacing: "-0.02em",
                verticalAlign: "middle"
              }}
            >
              Privacy Policy
            </Link>
            <span className="text-white/20" style={{
              fontFamily: "var(--font-epilogue), sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "15px",
              lineHeight: "31px",
              letterSpacing: "-0.02em",
              verticalAlign: "middle"
            }}>|</span>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "var(--font-epilogue), sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "15px",
                lineHeight: "31px",
                letterSpacing: "-0.02em",
                verticalAlign: "middle"
              }}
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
