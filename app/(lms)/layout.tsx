import Header from "@/components/globalComp/Header";

export default function LmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-1 lg:mt-24">{children}</main>
    </>
  );
}
