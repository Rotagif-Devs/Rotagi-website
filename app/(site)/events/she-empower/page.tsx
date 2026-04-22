import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ChevronLeft, Users, Trophy, Coffee, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Footer from "@/components/globalComp/Footer";

export default function SheEmpowerPage() {
  return (
    <div className="min-h-screen bg-[#FDF2F8] font-dm-sans overflow-x-hidden">
      {/* Header padding for fixed nav */}
      <div className="pt-24 lg:pt-32">
        {/* Back link */}
        <div className="max-w-[1260px] mx-auto px-5 md:px-10 mb-8">
          <Link
            href="/events"
            className="text-pink-600 flex items-center gap-1 font-medium group transition-colors hover:text-pink-700"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back to events</span>
          </Link>
        </div>

        {/* Hero Header Section */}
        <section className="max-w-[1260px] mx-auto px-5 md:px-10 pb-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-start">
            <div className="max-w-3xl">
              <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wider uppercase">
                Annual Conference
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-[#1A1A1A] mb-8 font-cal-sans leading-[1.05] tracking-tight">
                SHE Empower Conference
              </h1>
              <p className="text-[#3D1A2A] text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl">
                A one-day annual inclusive conference for African girls and women. 
                Bringing together successful women from diverse careers to speak, mentor, and inspire 
                the next generation of leaders in AI, tech, and life skills.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="primary" className="px-8 py-4">
                  Register Now
                </Button>
                <Button variant="outline" className="px-8 py-4">
                  View Photo Archive
                </Button>
              </div>
            </div>
            
            {/* Event Meta Details */}
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex items-center gap-4 text-[#1A1A1A]">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-pink-600 shadow-[0_4px_20px_rgba(255,182,193,0.3)]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">Coming Soon 2026</p>
                  <p className="text-sm opacity-60">Full date TBA</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#1A1A1A]">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-pink-600 shadow-[0_4px_20px_rgba(255,182,193,0.3)]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">Lagos, Nigeria</p>
                  <p className="text-sm opacity-60">Venue to be announced</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#1A1A1A]">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-pink-600 shadow-[0_4px_20px_rgba(255,182,193,0.3)]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">9:00 AM - 5:00 PM</p>
                  <p className="text-sm opacity-60">Full day experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="max-w-[1260px] mx-auto px-5 md:px-10 mb-32">
          <div className="relative aspect-[21/9] rounded-[40px] md:rounded-[60px] overflow-hidden border-[12px] border-white shadow-[0_20px_50px_rgba(255,182,193,0.2)]">
            <Image
              src="/she-empower-hero.jpg"
              alt="SHE Empower Conference Highlights"
              fill
              className="object-cover"
              priority
              fallback="/wh.jpg"
            />
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-24 md:py-32 px-5 md:px-10 bg-white">
          <div className="max-w-[1260px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] mb-6 font-cal-sans">
                What to Expect
              </h2>
              <p className="text-gray-600 text-lg">
                Join us for an unforgettable day of learning, inspiration, and community building.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Mentorship",
                  desc: "Connect with successful women from various career paths."
                },
                {
                  icon: <Trophy className="w-6 h-6" />,
                  title: "Scholarships",
                  desc: "Opportunity to win scholarships and educational grants."
                },
                {
                  icon: <Coffee className="w-6 h-6" />,
                  title: "Food & Games",
                  desc: "Enjoy great food, interactive games, and fun activities."
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "AI Workshops",
                  desc: "Hands-on sessions covering AI, tech, and essential life skills."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-[#FDF2F8] border border-pink-50 transition-all hover:shadow-xl hover:shadow-pink-100/50">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-600 mb-6 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Archive Placeholder */}
        <section className="py-24 md:py-32 px-5 md:px-10 bg-[#FDF2F8]">
          <div className="max-w-[1260px] mx-auto">
            <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] mb-16 font-cal-sans text-center">
              Photo Archive
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square rounded-2xl md:rounded-3xl bg-white overflow-hidden shadow-sm group">
                  <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-300 group-hover:scale-110 transition-transform duration-500">
                    {/* In a real app, this would be actual photos */}
                    <Image src={`/archive-${i}.jpg`} alt={`Archive ${i}`} fill className="object-cover opacity-0" />
                    <Sparkles className="w-8 h-8 opacity-20" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="ghost" className="text-pink-600 font-bold">
                Load More Memories
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
