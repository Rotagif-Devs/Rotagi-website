import Image from "next/image";
import Hero from "@/components/landingpage/Hero";
import Mission from "@/components/landingpage/Mission";
import Programs from "@/components/landingpage/Programs";
import Marquee from "@/components/landingpage/Marquee";
import Impact from "@/components/landingpage/Impact";
import Partners from "@/components/landingpage/Partners";
import Updates from "@/components/landingpage/Updates";
import Testimonials from "@/components/landingpage/Testimonials";
import FAQ from "@/components/landingpage/FAQ";
import CTA from "@/components/globalComp/CTA";

export default function Home() {
  return (
    <div className="min-h-screen  antialiased bg-primary overflow-hidden">
      {/* home page */}
      <main>
        <Hero />
        <Mission />
        <Programs />

        <Marquee
          text="latest updates & impact"
          style={{
            backgroundColor: "#18181b",
            border: "none",
            padding: "32px 0",
          }}
          textStyle={{ color: "white" }}
        />

        <Impact />

        <div className="w-full h-[300px] sm:h-[400px] md:h-[650px] relative">
          <Image
            src="/update.jpg"
            alt="Rotagif Impact"
            fill
            className=""
          />
        </div>

        <Updates />

        <Partners />

        <Testimonials />

        <FAQ />

        <CTA />
      </main>
    </div>
  );
}
