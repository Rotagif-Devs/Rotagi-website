import Button from "@/components/ui/Button";

const partnerLogos = [
  { name: "Apple Pay", logo: "https://placehold.co/200x80?text=Apple+Pay&font=roboto" },
  { name: "Skrill", logo: "https://placehold.co/200x80?text=Skrill&font=roboto" },
  { name: "Paypass", logo: "https://placehold.co/200x80?text=Paypass&font=roboto" },
  { name: "Google", logo: "https://placehold.co/200x80?text=Google&font=roboto" },
  { name: "Microsoft", logo: "https://placehold.co/200x80?text=Microsoft&font=roboto" },
  { name: "Unicef", logo: "https://placehold.co/200x80?text=Unicef&font=roboto" },
];

export default function Partners() {
  return (
    <section className="py-20 md:py-32 bg-pink-50/50 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6 tracking-tight">
          Trusted by Purpose-Driven Organizations
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
          We collaborate with partners who believe in measurable impact, inclusive growth, and empowering the next generation of African women.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partnerLogos.map((partner, i) => (
            <div key={i} className="w-full relative flex justify-center hover:opacity-100 transition-opacity">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Button variant="outline" size="lg" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            Partner With Us
          </Button>
        </div>
      </div>
    </section>
  );
}