import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import Marquee from "@/components/Marquee";
import Impact from "@/components/Impact";
import Partners from "@/components/Partners";
import Updates from "@/components/Updates";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Mission />
        <Programs />
        <Marquee text="Impact Areas · Impact Areas · Impact Areas · " />
        <Impact />
         <Marquee text=". trusted partners . trusted partners  . TRUSTED PARTNERS " />
        <Partners />
        {/* <Updates />
        <CTA /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
