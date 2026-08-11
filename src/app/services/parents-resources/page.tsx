"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const parentResources = [
  { title: "AQF Qualification Structures", desc: "Understanding the Australian Qualifications Framework (from diplomas, bachelors, to masters) and credit transfers." },
  { title: "Safety & Welfare Standards", desc: "Explicit details regarding minor student safety, health cover (OSHC), and strict ESOS protection rights." },
  { title: "Cost of Living & Budgets", desc: "Realistic financial planning for student rent, groceries, pocket money, health clearances, and school fees." },
  { title: "Visa Compliance Rules", desc: "Guidance on student visa conditions, compulsory 80% class attendance thresholds, and work hour limits." },
  { title: "Communication & Reports", desc: "Vett university progress, track coursework completions, and coordinate monthly status briefs with AEC." },
  { title: "Post-Study PR Opportunities", desc: "Auditing post-graduate work visas (485) and long-term skilled regional points tests." }
];

export default function ParentsResources() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="For Parents: Resources & Information" 
        subtitle="Clarity, comfort, and absolute reassurance for parents making major education decisions."
        breadcrumb="Services / Parents Resources"
        bgImage="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
                Parent Resources
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Reassurance for Families
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                As a parent, sending your child overseas is a major emotional and financial investment. AEC is physically present in both Sri Lanka, UAE, and on-shore in Australia to provide 24/7 support, emergency links, and detailed progress audits.
              </p>
              
              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                    <span>Join a Parent Information Session</span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Graphic column */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[320px]">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />
              <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl rotate-[-6deg] group hover:rotate-0 transition-transform duration-500 z-10">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop" alt="Parents" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {parentResources.map((res, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 relative group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center mb-6 font-mono text-sm font-bold shadow-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C] mb-3 leading-tight">{res.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{res.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

