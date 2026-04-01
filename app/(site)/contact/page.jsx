import CTA from "@/components/globalComp/CTA";
import ContactHero from "@/components/contact/ContactHero";

const HERO_DATA = {
  title: "Have inquiries? Reach out to us.",
  btn: "CONTACT US",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero
        title={HERO_DATA.title}
        btn={HERO_DATA.btn}
      />
      <CTA />
    </main>
  );
}