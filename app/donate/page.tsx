import DonateHero from "@/components/donate/DonateHero";  
import DonateImpact from "@/components/donate/DonateImpact";
import DonateTransform from "@/components/donate/DonateTransform";

const HERO_DATA = {
  title: "Empower Her Future Today With Your Support",
  description:
    "Your donation helps young African girls and women with AI literacy, digital skills and leadership training.Every contribution creates access, confidence and lasting impact.",
};

export default function DonatePage() {
  return (
    <main className="min-h-screen">
       <DonateHero description={HERO_DATA.description} />
       <DonateImpact/>
       <DonateTransform/>
    </main>
  );
}
