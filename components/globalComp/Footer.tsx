"use client";

import Link from "next/link";
import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import { subscribeNewsletter } from "@/lib/services/newsletter.service";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

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

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <footer className="flex justify-center bg-primary">
      <div className="bg-black text-white flex flex-col justify-between w-full lg:mx-6 mt-6 lg:rounded-xl px-8 py-16 md:px-8 md:py-10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-2 pt-4 w-full">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="ROTAGI Home">
              <h2 className="text-5xl mb-4 font-cal-sans font-normal text-white">
                ROTAGI
              </h2>
            </Link>
            <p className="text-gray-400 text-base font-normal font-dm-sans mb-8">
              Where African Girls Discover, Learn, and Lead
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
                  className="bg-secondary text-white rounded-xl px-6 py-2 text-sm font-semibold hover:bg-secondary/90 transition-all"
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
            <h4 className="text-white font-cal-sans text-lg mb-6">
              Quick Navigation
            </h4>
            <ul className="space-y-4 text-gray-400 text-base font-dm-sans">
              <li>
                <Link
                  href="/programs"
                  className="hover:text-white transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/impact"
                  className="hover:text-white transition-colors"
                >
                  Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-white font-cal-sans text-lg mb-6">
              Get Involved
            </h4>
            <ul className="space-y-4 text-gray-400 text-base font-dm-sans">
              <li>
                <Link
                  href="/donate"
                  className="hover:text-white transition-colors"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/mentors"
                  className="hover:text-white transition-colors"
                >
                  Become A Mentor
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="hover:text-white transition-colors"
                >
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-cal-sans text-lg mb-6">Contact</h4>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8 text-white">
              <Link
                href="https://www.facebook.com/officialrotagi"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                <Facebook size={22} />
              </Link>
              <Link
                href="https://x.com/officialrotagi"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/officialrotagi/"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                <Instagram size={22} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/officialrotagi"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                <Linkedin size={22} />
              </Link>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 text-gray-400 text-sm font-dm-sans">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-white" />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-white" />
                <Link
                  href="mailto:info@rotagif.com"
                  className="hover:text-white transition-colors"
                >
                  info@rotagif.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-white" />
                <Link
                  href="https://wa.me/2348032368560"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  Phone (WhatsApp) +234 803 236 8560
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-1 md:gap-4 text-gray-400 text-sm font-dm-sans">
          <p>© 2026 ROTAGI. All rights reserved.</p>
          <span className="hidden md:inline">|</span>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="md:hidden">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
