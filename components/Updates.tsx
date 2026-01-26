const updates = [
  {
    category: "SUCCESS STORY",
    title: "How AI Changed My Career Path",
    desc: "Meet Amina, a She Ascend graduate who transitioned from teaching to AI product management.",
    image: "/img-5.png",
    linkText: "Read Story",
  },
  {
    category: "COMMUNITY IMPACT",
    title: "Beginner's Guide To AI Literacy",
    desc: "A comprehensive guide for educators introducing AI concepts to parents and young learners.",
    image: "/img-5.png",
    linkText: "Download Guide",
  },
  {
    category: "EVENT RECAP",
    title: "SHE Empower 2026 Highlights",
    desc: "Recap of our annual conference featuring workshops, mentorship sessions, and inspiring talks.",
    image: "/img-5.png",
    linkText: "Watch Recap",
  },
];

export default function Updates() {
  return (
    <section className="py-20 bg-[var(--color-primary)] flex justify-center" id="updates">
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
              Updates from the Work That Matters
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
              Program highlights, impact milestones, and how we’re advancing opportunity and digital empowerment.
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
              View All Updates
            </button>
          </div>
        </div>

        {/* Bottom section - Updates Cards */}
        <div className="flex gap-6 w-full justify-between">
          {updates.map((update, i) => (
            <div
              key={i}
              className="bg-white flex flex-col group border-gray-200"
              style={{
                width: '414px',
                height: '473.5px',
                borderRadius: '15px',
                padding: '10px 10px 10px 10px', // Added top padding to match visual of image inside card
                borderWidth: '1px',
                gap: '15px'
              }}
            >
              <div className="h-[220px] w-full overflow-hidden rounded-[10px]">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col flex-grow px-2">
                <div className="mb-3">
                  <span className="text-[var(--color-secondary)] font-bold text-xs tracking-wider uppercase font-[var(--font-dm-sans)]">
                    {update.category}
                  </span>
                </div>
                <h3 
                  className="font-[var(--font-cal-sans)] text-[var(--color-dark)] mb-3 group-hover:text-[var(--color-secondary)] transition-colors"
                  style={{ fontSize: '24px', lineHeight: '120%' }}
                >
                  {update.title}
                </h3>
                <p 
                  className="font-[var(--font-dm-sans)] text-[var(--color-darkgray)] line-clamp-3 mb-4"
                  style={{ fontSize: '16px', lineHeight: '160%' }}
                >
                  {update.desc}
                </p>
                <div className="mt-auto">
                  <span 
                    className="font-[var(--font-dm-sans)] text-[var(--color-secondary)] font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    {update.linkText} <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}