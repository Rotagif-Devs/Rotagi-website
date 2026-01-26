const partnerLogos = [
  { name: "Apple Pay", logo: "/ApplePay.png" },
  { name: "Apple Pay", logo: "/ApplePay.png" },
  { name: "Skrill", logo: "/Skrill.png" },
];

export default function Partners() {
  return (
    <section className="py-20 bg-[var(--color-primary)] flex justify-center">
      <div 
        className="flex flex-col items-start"
        style={{
          width: '1260px',
          gap: '76px'
        }}
      >
        {/* Top section - Title, Description, and Button */}
        <div className="flex items-start justify-between w-full">
          <div className="flex-1">
            <h2 
              className="font-[var(--font-cal-sans)] text-[var(--color-dark)] mb-6"
              style={{
                fontSize: '46px',
                fontWeight: 400,
                lineHeight: '100%',
                letterSpacing: '0%',
                width: '486px',
                height: '120px'
              }}
            >
              Trusted by Purpose-Driven Organizations
            </h2>
          </div>
          
          <div className="flex flex-col items-start gap-6">
            <p 
              className="font-[var(--font-dm-sans)] text-[var(--color-darkgray)]"
              style={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '160%',
                width: '580px',
                height: '63px',
                textAlign: 'left'
              }}
            >
              We collaborate with partners who believe in measurable impact, inclusive growth, and empowering the next generation of African women.
            </p>
            <button
              className="bg-[var(--color-secondary)] text-white font-[var(--font-dm-sans)] hover:bg-[var(--color-tertiary)] transition-colors"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                padding: '14px 32px',
                borderRadius: '100px'
              }}
            >
              Partner With Us
            </button>
          </div>
        </div>

        {/* Bottom section - Partner Logos */}
        <div className="flex gap-6 w-full">
          {partnerLogos.map((partner, i) => (
            <div
              key={i}
              className="bg-white flex flex-col items-center justify-center flex-1"
              style={{
                height: '270px',
                gap: '16px',
                borderRadius: '40px',
                paddingTop: '56px',
                paddingRight: '59px',
                paddingBottom: '56px',
                paddingLeft: '59px',
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}