import Button from "@/components/ui/Button";

const programs = [
  { age: "Ages 10-12", name: "She Ignite", desc: "Sparks curiosity in STEM through fun, hands-on experiments and storytelling.", img: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?q=80&w=600&auto=format&fit=crop" },
  { age: "Ages 13-15", name: "She Blossom", desc: "Foundational coding, robotics, and digital art to build creative confidence.", img: "https://images.unsplash.com/photo-1544531886-98725894193d?q=80&w=600&auto=format&fit=crop" },
  { age: "Ages 16-18", name: "She Blaze", desc: "Advanced AI tracks, app development, and leadership incubators for future founders.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
  { age: "Ages 19+", name: "She Ascend", desc: "Career acceleration, mentorship networks, and global fellowships for young women.", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=600&auto=format&fit=crop" },
];

export default function Programs() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="programs">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-pink-600 uppercase mb-3">Our Programs</h2>
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-6">
            Pathways to Excellence
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Age-appropriate learning pathways designed to build skills, confidence, and leadership at every stage of her journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((prog, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={prog.img} 
                  alt={prog.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="inline-block px-2 py-1 bg-pink-600 text-xs font-bold rounded-md mb-1">{prog.age}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">{prog.name}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">{prog.desc}</p>
                <a
                  href="#"
                  className="text-pink-600 font-bold hover:text-pink-700 transition inline-flex items-center text-sm uppercase tracking-wide"
                >
                  Learn More 
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="secondary" size="lg" className="shadow-xl shadow-purple-900/20">
            View Full Curriculum
          </Button>
        </div>
      </div>
    </section>
  );
}