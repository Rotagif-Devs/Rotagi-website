import Hero from "@/components/landingpage/Hero";
import Mission from "@/components/landingpage/Mission";
import Programs from "@/components/landingpage/Programs";
import Marquee from "@/components/landingpage/Marquee";
import Impact from "@/components/landingpage/Impact";
import Partners from "@/components/landingpage/Partners";
import Updates from "@/components/landingpage/Updates";
import CTA from "@/components/globalComp/CTA";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen bg-primary antialiased overflow-hidden">
      {/* home page */}
      <main>
        <Hero />
        <Mission />
        <Programs />
        <Marquee
          text="Impact Areas"
          style={{ backgroundColor: "black", border: "none" }}
          textStyle={{ color: "white" }}
        />
        <Impact />
        <Marquee
          text="Powered by Trusted Platforms & Supporters"
          style={{ backgroundColor: "black", border: "none" }}
          textStyle={{ color: "white" }}
        />
        <Partners />
        <Marquee
          text="latest updates & impact"
          style={{ backgroundColor: "var(--color-orange)", border: "none" }}
          textStyle={{ color: "white" }}
        />
        <Updates />
        <CTA />
      </main>
    </div>
  );
}
