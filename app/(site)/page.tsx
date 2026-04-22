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
          text="Trusted by Purpose Driven Organizations"
          style={{ backgroundColor: "black", border: "none" }}
          textStyle={{ color: "white" }}
        />
        <Partners />
        <Marquee
          text={
            <>
              What’s New
              <Image
                src="/Star 6.png"
                alt="star"
                width={1080}
                height={1080}
                className="w-10 h-10 -ml-4 relative -top-12"
              />
            </>
          }
          style={{ backgroundColor: "var(--color-orange)", border: "none" }}
          textStyle={{ color: "white" }}
        />
        <Updates />
        <CTA />
      </main>
    </div>
  );
}
