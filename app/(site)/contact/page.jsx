import CTA from "@/components/globalComp/CTA";
import ContactHero from "@/components/contact/ContactHero";
import ContactMessage from "@/components/contact/ContactMessage";

const HERO_DATA = {
  title: "Get In Touch",
  btn: "Empowering African Girls to Lead the Digital Future. We would love to hear from you. ",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero
        title={HERO_DATA.title}
        btn={HERO_DATA.btn}
      />
      <div className="px-6 py-10 md:px-10 md:py-10">
          <ContactMessage />
      </div>
      
      <CTA />
      
    </main>
  );
}