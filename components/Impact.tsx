export default function Impact() {
  const stats = [
    { num: "300 +", label: "Girls Reached" },
    { num: "15 +", label: "Programs" },
    { num: "10 +", label: "Communities" },
  ];

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
              Access That Creates Impact
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
              Since 2020, ROTAGIF has equipped hundreds of girls and women with skills that translate into confidence, careers, and community transformation across Africa.
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
              Learn More
            </button>
          </div>
        </div>

        {/* Bottom section - Stats Cards */}
        <div className="flex gap-6 w-full">
          {stats.map((stat, i) => (
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
              <div 
                className="font-[var(--font-cal-sans)] text-[var(--color-gray)]"
                style={{
                  fontSize: '96px',
                  fontWeight: 300,
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {stat.num}
              </div>
              <div 
                className="font-[var(--font-dm-sans)] text-[var(--color-gray)]"
                style={{
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '140%',
                  textAlign: 'center'
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}