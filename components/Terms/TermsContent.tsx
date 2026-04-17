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
    const offset = 12;

    const nextTop =
      container.scrollTop + (targetRect.top - containerRect.top) - offset;

    container.scrollTo({
      top: nextTop,
      behavior: "smooth",
    });

    setActiveSection(id);
    setMobileMenuOpen(false);
  }, []);


  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: container,
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.2,
      },
    );

    sectionIds.forEach((id) => {
      const section = sectionRefs.current[id];
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-5 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex w-full items-center py-3 text-left text-xl font-bold text-black"
            aria-expanded={mobileMenuOpen}
            aria-controls="terms-mobile-nav"
          >
            <span>Contents</span>
            <span className="text-base">{mobileMenuOpen ? "×" : "▾"}</span>
          </button>

          {mobileMenuOpen && (
            <div
              id="terms-mobile-nav"
              className="mt-3  bg-white p-2 shadow-sm"
            >
              <nav className="space-y-2">
                {termsData.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-pink-500 font-medium text-white"
                          : "text-black hover:bg-pink-100"
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

        <div className="grid gap-10 md:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-20">
              <h3 className="mb-3 font-light text-black">Contents</h3>
              <nav className="space-y-3" aria-label="Terms sections">
                {termsData.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-base transition-colors ${
                        isActive
                          ? "bg-pink-500 font-medium text-white"
                          : "text-black hover:bg-pink-100"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div
            ref={contentRef}
            className="h-[calc(100vh-96px)] overflow-y-auto pr-1 md:mx-5"
          >
            <div className="space-y-10">
              {termsData.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={registerSection(section.id)}
                  className="scroll-mt-4"
                >
                  <h3 className="mb-3 font-light normal-case text-black">
                    {section.title}
                  </h3>

                  <div className="">
                    {section.content.map((paragraph, index) => (
                      <p key={index} className="!text-sm leading-7 font-light  text-black">
                        {paragraph}
                      </p>
                    ))}

                    {section.list && (
                      <ul className="list-disc pl-5 text-sm leading-7 font-light text-black">
                        {section.list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.last && (
                        <div>
                          {section.last.map((item, index) => (
                            <p key={index} className="font-light leading-7 text-black !text-sm">{item}</p>
                          ))}
                        </div>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}