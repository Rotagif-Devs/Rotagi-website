import Link from "next/link";
import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-primary">
      <div className="bg-black text-white flex flex-col justify-between w-full lg:mx-6 mt-6 lg:rounded-4xl px-8 py-16 md:px-8 md:py-10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-4 pt-4 w-full">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl mb-6">ROTAGI</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering young African girls and women with AI literacy, digital
              confidence, and leadership skills.
            </p>
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
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#impact"
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
                  href="/events"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </Link>
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
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Become A Mentor
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
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
                  href="/#updates"
                  className="hover:text-white transition-colors"
                >
                  Media & Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Office */}
          <div>
            <h4 className="text-white mb-6">Our Office</h4>
            <div className="text-gray-300 text-sm space-y-2 leading-relaxed">
              <p>No. 1 Magazar Close,</p>
              <p>Eagle Billed Estate</p>
              <p>Off Vio Mabuschi.</p>
              <p>Federal Capital Territory (Abuja).</p>
              <p>Nigeria.</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-6">Contact</h4>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              <Link
                href="https://facebook.com/rotagi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="https://x.com/rotagi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com/rotagi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="https://linkedin.com/company/rotagi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <Linkedin size={24} />
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
                  href="mailto:info@rotagi.org"
                  className="hover:text-white transition-colors"
                >
                  info@rotagi.org
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="shrink-0" />
                <span>
                  Phone (WhatsApp){" "}
                  <Link
                    href="https://wa.me/2348032368560"
                    target="_blank"
                    className="hover:text-white transition-colors inline-block"
                  >
                    +2348032368560
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20  pt-8 border-t border-white/10 flex flex-col md:flex-row lg:mx-auto lg:w-fit items-center gap-4 text-gray-300 text-sm">
          <p>© 2026 All rights reserved ROTAGI</p>
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
