import CTA from "@/components/globalComp/CTA";
import ContactHero from "@/components/contact/ContactHero";
import ContactMessage from "@/components/contact/ContactMessage";

const HERO_DATA = {
  title: "GET IN TOUCH",
  subtitle: "Empowering African Girls to Lead the Digital Future. We would love to hear from you.",
  btn: "CONTACT US",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero
        title={HERO_DATA.title}
        subtitle={HERO_DATA.subtitle}
      />
      <div className="px-6 py-10 md:px-10 md:py-10">
        <ContactMessage />
      </div>

      <CTA />

    </main>
  );
}