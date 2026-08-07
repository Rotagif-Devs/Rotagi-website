"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/globalComp/Header";
import Footer from "@/components/globalComp/Footer";

// The cohort learner portal is its own full-screen experience (PIN gate,
// dashboard, deep-linked sub-pages) — it doesn't want the marketing site
// header sitting on top of it.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCohortPortal = pathname?.startsWith("/cohort/portal");

  return (
    <>
      {!isCohortPortal && <Header />}
      <div className={isCohortPortal ? "" : "mt-1 lg:mt-24"}>{children}</div>
      <Footer />
    </>
  );
}
