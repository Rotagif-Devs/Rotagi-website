export default function CTA() {
  return (
    <section className="py-20 bg-[var(--color-primary)] flex justify-center">
      <div 
        className="flex flex-col items-start"
        style={{
          width: '1260px',
          gap: '76px'
        }}
      >
        {/* Top section - Title, Description, and Buttons */}
        <div className="flex items-start justify-between w-full">
          <div className="flex-1">
            <h2 
              className="font-[var(--font-cal-sans)] text-[var(--color-dark)] mb-6"
              style={{
                fontSize: '46px',
                fontWeight: 400,
                lineHeight: '100%',
                letterSpacing: '0%',
                width: '600px', // Increased width for longer title
                height: 'auto'
              }}
            >
              Join Us in Empowering the Next Generation
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
              Whether through donations, mentorship, or partnerships — your support creates lasting change.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-[var(--color-secondary)] text-white font-[var(--font-dm-sans)] hover:bg-[var(--color-tertiary)] transition-colors"
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '14px 32px',
                  borderRadius: '100px'
                }}
              >
                Donate Now
              </button>
              <button
                className="bg-white text-[var(--color-dark)] font-[var(--font-dm-sans)] hover:bg-gray-50 transition-colors border border-gray-200"
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '14px 32px',
                  borderRadius: '100px'
                }}
              >
                Explore Programs
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section - Video Preview */}
        <div className="w-full flex justify-center">
          <div 
            className="relative overflow-hidden group cursor-pointer bg-white"
            style={{
              width: '1256px',
              height: '711px',
              borderRadius: '64px',
            }}
          >
            {/* Placeholder for video content - using a gradient or image */}
            <div className="w-full h-full bg-white flex items-center justify-center relative">
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                <div className="w-32 h-32 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[36px] border-l-white border-b-[20px] border-b-transparent ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}