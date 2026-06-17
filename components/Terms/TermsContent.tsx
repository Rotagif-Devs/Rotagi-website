"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { termsData } from "@/lib/terms";

export default function TermsContent() {
  const [activeSection, setActiveSection] = useState<string>(termsData[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sectionIds = useMemo(() => termsData.map((section) => section.id), []);

  const registerSection = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      sectionRefs.current[id] = node;
    },
    [],
  );

  const scrollToSection = useCallback((id: string) => {
    const container = contentRef.current;
    const target = sectionRefs.current[id];
    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset = 16;
    const nextTop =
      container.scrollTop + (targetRect.top - containerRect.top) - offset;

    container.scrollTo({ top: nextTop, behavior: "smooth" });
    setActiveSection(id);
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { root: container, rootMargin: "0px 0px -70% 0px", threshold: 0.2 },
    );

    sectionIds.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        {/* Mobile Contents Toggle */}
        <div className="mb-6 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 text-left font-semibold text-gray-900"
            aria-expanded={mobileMenuOpen}
          >
            <span>Contents</span>
            <span className="text-xl leading-none">{mobileMenuOpen ? "×" : "▾"}</span>
          </button>

          {mobileMenuOpen && (
            <div className="mt-2 rounded-xl border border-pink-100 bg-white p-2 shadow-md">
              <nav className="space-y-1">
                {termsData.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-[#D81B7E] font-semibold text-white"
                          : "text-gray-700 hover:bg-pink-50"
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        {/* Desktop Two-Column Layout */}
        <div className="grid gap-10 md:grid-cols-[240px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-20">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Contents
              </p>
              <nav className="space-y-1" aria-label="Terms navigation">
                {termsData.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-[#D81B7E] font-semibold text-white shadow-sm"
                          : "text-gray-600 hover:bg-pink-50 hover:text-gray-900"
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Scrollable Content */}
          <div
            ref={contentRef}
            className="h-[calc(100vh-100px)] overflow-y-auto scroll-smooth pr-2"
          >
            <div className="space-y-12 pb-16">
              {termsData.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={registerSection(section.id)}
                  className="scroll-mt-4"
                >
                  <h2 className="mb-4 text-base md:text-lg uppercase tracking-wide text-gray-950 font-cal-sans">
                    {section.title}
                  </h2>

                  {/* Regular paragraphs */}
                  {section.content.length > 0 && (
                    <div className="space-y-3">
                      {section.content.map((paragraph, i) => (
                        <p key={i} className="text-sm leading-7 text-gray-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Bullet list */}
                  {section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm leading-6 text-gray-700"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D81B7E]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Trailing paragraphs */}
                  {section.last && (
                    <div className="mt-3 space-y-3">
                      {section.last.map((item, i) => (
                        <p key={i} className="text-sm leading-7 text-gray-700">
                          {item}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Contact info block */}
                  {section.contactInfo && (
                    <div className="mt-4 rounded-2xl border border-pink-100 bg-pink-50/50 p-6 space-y-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Organisation</span>
                        <span className="text-sm text-gray-900 font-medium">{section.contactInfo.organisation}</span>
                      </div>
                      <hr className="border-pink-100" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">General Enquiries</span>
                        <a href={`mailto:${section.contactInfo.generalEnquiries}`} className="text-sm text-[#D81B7E] hover:underline font-medium">
                          {section.contactInfo.generalEnquiries}
                        </a>
                      </div>
                      <hr className="border-pink-100" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Safeguarding &amp; Privacy</span>
                        <a href={`mailto:${section.contactInfo.safeguarding}`} className="text-sm text-[#D81B7E] hover:underline font-medium">
                          {section.contactInfo.safeguarding}
                        </a>
                      </div>
                      <hr className="border-pink-100" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Partnerships</span>
                        <a href={`mailto:${section.contactInfo.partnerships}`} className="text-sm text-[#D81B7E] hover:underline font-medium">
                          {section.contactInfo.partnerships}
                        </a>
                      </div>
                      <hr className="border-pink-100" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone</span>
                        <a href={`tel:${section.contactInfo.phone}`} className="text-sm text-gray-900 font-medium">
                          {section.contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </section>
              ))}

              <p className="text-xs text-gray-400 border-t border-pink-100 pt-6">
                Effective Date: April 2026 · Last Updated: June 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}