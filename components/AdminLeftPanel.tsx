"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdminLeftPanel() {
  return (
    <div
      className="lg:flex flex-col lg:w-[47%] min-h-screen w-full mt-10 lg:mt-0 p-10 relative overflow-hidden"
      style={{
        background: "#e91e8c",
      }}
    >
      {/* Decorative Circles */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20 bg-white blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-16 w-64 h-64 rounded-full opacity-10 bg-white blur-3xl pointer-events-none" />

      <div className="relative z-10 shrink-0">
        <Link href="/" className="inline-block hover:opacity-80">
          <h3 className="text-white tracking-widest uppercase text-2xl font-bold">
            ROTAGI <span className="text-white/80 text-sm align-top">CMS</span>
          </h3>
        </Link>
      </div>

      <div className="relative z-10 mt-12 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/20">
          Administrative Control Center
        </div>
        <h2 className="text-white text-4xl lg:text-5xl leading-tight">
          Manage Your <br />
          Digital Universe
        </h2>

        <p className="text-white/80 mt-6 text-lg max-w-md leading-relaxed">
          The central hub for managing content, events, and engagement. Empower
          your team with precision tools designed for scale.
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-10">
        <div className="flex items-center gap-4 text-white/80 text-xs font-bold uppercase tracking-widest">
          <span>Security</span>
          <div className="w-1 h-1 rounded-full bg-white" />
          <span>Efficiency</span>
          <div className="w-1 h-1 rounded-full bg-white" />
          <span>Scalability</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
