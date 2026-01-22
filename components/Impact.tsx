import Button from "@/components/ui/Button";

export default function Impact() {
  const stats = [
    { num: "300+", label: "Girls Reached" },
    { num: "15+", label: "Programs Delivered" },
    { num: "10+", label: "Communities Served" },
  ];

  return (
    <section className="py-24 bg-purple-900 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Access That Creates Impact
        </h2>
        <p className="text-xl md:text-2xl text-purple-100 mb-16 max-w-3xl mx-auto font-light">
          Since 2020, ROTAGIF has equipped hundreds of girls and women with skills that translate into confidence, careers, and community transformation.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-3xl hover:bg-white/10 transition-colors duration-300">
              <div className="text-6xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-white">{stat.num}</div>
              <div className="text-xl font-medium text-purple-200 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-purple-900">
            Read Our Impact Report
          </Button>
        </div>
      </div>
    </section>
  );
}