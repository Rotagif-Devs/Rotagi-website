import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import Impact from "@/components/Impact";
import Partners from "@/components/Partners";
import Updates from "@/components/Updates";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary font-sans antialiased">
      <Header />
      <main>
        <Hero />
        {/* <Mission />
        <Programs />
        <Impact />
        <Partners />
        <Updates />
        <CTA /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
