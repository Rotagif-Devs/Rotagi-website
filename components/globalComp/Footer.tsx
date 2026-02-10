import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-primary">
      <div className="bg-black text-white flex flex-col justify-between w-full mx-6 mb-8 mt-6 rounded-[48px] px-8 py-16 md:px-16 md:py-20 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between gap-16 pt-4 w-full">
          {/* Brand & Description */}
          <div className="max-w-md">
            <h2 className="mb-8 font-cal-sans text-4xl lg:text-5xl lowercase">
              ROTAGI
            </h2>
            <p className="text-gray-400 text-lg font-dm-sans leading-relaxed">
              Empowering young African girls and women with AI literacy, digital
              confidence, and leadership skills.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
            {/* Quick Navigation */}
            <div>
              <h4 className="text-white mb-8 font-cal-sans text-xl lowercase border-b border-white/10 pb-2">
                Navigation
              </h4>
              <ul className="space-y-4 text-gray-400 font-dm-sans">
                <li>
                  <Link
                    href="/programs"
                    className="hover:text-secondary transition-colors"
                  >
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/impact"
                    className="hover:text-secondary transition-colors"
                  >
                    Impact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/updates"
                    className="hover:text-secondary transition-colors"
                  >
                    What's New
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-secondary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="text-white mb-8 font-cal-sans text-xl lowercase border-b border-white/10 pb-2">
                Support
              </h4>
              <ul className="space-y-4 text-gray-400 font-dm-sans">
                <li>
                  <Link
                    href="/donate"
                    className="hover:text-secondary transition-colors"
                  >
                    Donate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentor"
                    className="hover:text-secondary transition-colors"
                  >
                    Mentorship
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className="hover:text-secondary transition-colors"
                  >
                    Partnership
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-secondary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Office */}
            <div className="md:col-span-2">
              <h4 className="text-white mb-8 font-cal-sans text-xl lowercase border-b border-white/10 pb-2">
                Contact Us
              </h4>
              <div className="text-gray-400 space-y-4 font-dm-sans leading-relaxed">
                <p>
                  No. 1 Magazar Close, Eagle Billed Estate, Off Vio Mabuschi.
                  Abuja, Nigeria.
                </p>
                <div className="pt-4 flex flex-col gap-3">
                  <a
                    href="mailto:info@rotagi.org"
                    className="hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <span className="text-secondary">@</span> info@rotagi.org
                  </a>
                  <a
                    href="tel:+2348032368560"
                    className="hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <span className="text-secondary">#</span> +234 803 236 8560
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons & Bottom */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex gap-6">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-secondary transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-secondary transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-secondary transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.013-4.85-.07c-1.17-.054-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.013-3.584.07-4.85c.054-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.132 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.336 1.079 2.126 1.384c.765.297 1.635.498 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.079-1.336 1.384-2.126c.297-.765.498-1.635.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.336-1.079-2.126-1.384c-.765-.297-1.635-.499-2.913-.558C15.667.014 15.259 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zM18.406 4.11a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-secondary transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
          <div className="text-gray-500 font-dm-sans text-sm flex gap-10">
            <p>© {new Date().getFullYear()} ROTAGIF. All rights reserved.</p>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
