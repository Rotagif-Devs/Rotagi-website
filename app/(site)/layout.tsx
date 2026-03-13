import Header from "@/components/globalComp/Header";
import Footer from "@/components/globalComp/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mt-1 lg:mt-24">{children}</div>
      <Footer />
    </>
  );
}
