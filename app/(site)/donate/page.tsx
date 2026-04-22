import DonateHero from "@/components/donate/DonateHero";
import DonateImpact from "@/components/donate/DonateImpact";
import DonateTransform from "@/components/donate/DonateTransform";
const HERO_DATA = {
  title: "Empower Her Future Today Through AI",
  description:
    "Your support equips African girls and young women with the skills and opportunities to thrive in the digital economy.",
};
export default function DonatePage() {
  return (
    <main className="min-h-screen">
      <DonateHero description={HERO_DATA.description} />
      <DonateTransform />
    </main>
  );
}
