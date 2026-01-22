import Button from "@/components/ui/Button";

const updates = [
  {
    title: "How AI Changed My Career Path",
    desc: "Meet Amina, a She Ascend graduate now thriving in AI product management at a leading tech firm.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
    linkText: "Read Story",
  },
  {
    title: "Beginner's Guide To AI Literacy",
    desc: "A comprehensive guide for educators introducing AI concepts to parents and young learners in rural communities.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    linkText: "Download Guide",
  },
  {
    title: "SHE Empower 2026 Highlights",
    desc: "Recap of our annual conference featuring workshops, mentorship sessions, and inspiring talks from industry leaders.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop",
    linkText: "Watch Recap",
  },
];

export default function Updates() {
  return (
    <section className="py-24 bg-white" id="updates">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-6">
            Updates from the Work That Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Program highlights, impact milestones, and how we’re advancing opportunity and digital empowerment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {updates.map((update, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-pink-600 transition-colors">
                  {update.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">{update.desc}</p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <a
                    href="#"
                    className="text-pink-600 font-bold hover:text-pink-700 transition uppercase tracking-wide text-sm flex items-center"
                  >
                    {update.linkText}
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="primary" size="lg">
            View All Updates
          </Button>
        </div>
      </div>
    </section>
  );
}