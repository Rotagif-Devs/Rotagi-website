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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
      <div className="bg-black text-white flex flex-col justify-between w-full lg:mx-6 mt-6 lg:rounded-4xl px-8 py-16 md:px-8 md:py-10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-4 pt-4 w-full">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="ROTAGI Home">
              <h2 className="text-4xl mb-6 font-cal-sans">ROTAGI</h2>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">
              Where African Girls Discover, Learn and Lead
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-3 max-w-sm lg:max-w-md">
              <div className="bg-white rounded-xl px-2 py-2 flex items-center shadow-md">
                <label htmlFor="newsletter-email" className="sr-only">Join our newsletter</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Join our newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-2 text-gray-800 text-sm w-full"
                  required
                />
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-fit justify-center text-base rounded-md px-4 cursor-pointer disabled:opacity-70"
                >
                  {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : 
                   status === "success" ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
              
              {status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                  <CheckCircle size={14} />
                  <span>{message}</span>
                </div>
              )}
              
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={14} />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white mb-6">Quick Navigation</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
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
                  href="/events"
                  className="hover:text-white transition-colors"
                >
                  SHE EMPOWER CONFERENCE
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
              <li className="text-gray-500">
                Resources — COMING SOON
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-white mb-6">Get Involved</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
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
                  href="/mentors/apply"
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
                  Media & Press
                </Link>
              </li>
              <li>
                <Link
                  href="/code-of-conduct"
                  className="hover:text-white transition-colors"
                >
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>



          {/* Contact */}
          <div>
            <h4 className="text-white mb-6">Contact</h4>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              <Link
                href="https://www.facebook.com/officialrotagi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="https://x.com/officialrotagi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="Follow us on X (Twitter)"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/officialrotagi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/officialrotagi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCq1Y6zDnFVdMrLClgyiz4AQ/reachinouttoafricangirlsinitiatve"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="Follow us on YouTube"
              >
                <Youtube size={24} />
              </Link>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0" />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="shrink-0" />
                <Link
                  href="mailto:info@rotagif.com"
                  className="hover:text-white transition-colors"
                >
                  info@rotagif.com
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="shrink-0" />
                <span>
                  Phone (WhatsApp Only):{" "}
                  <Link
                    href="https://wa.me/2348032368560"
                    target="_blank"
                    className="hover:text-white transition-colors inline-block"
                  >
                    +234 803 236 8560
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row lg:mx-auto lg:w-fit items-center gap-4 text-gray-300 text-sm">
          <div className="flex flex-col items-center gap-2">
            <p>© 2026 ROTAGI. All rights reserved</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>#AIinAfrica</span>
              <span>#GirlsInTechnology</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-gray-600">|</span>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-gray-600">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
