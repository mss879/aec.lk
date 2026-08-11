"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, ShieldCheck, MapPin, Landmark, CheckCircle2, 
  HelpCircle, ChevronRight, Compass, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    subclass: "Skilled Work Regional (Subclass 491)",
    icon: <MapPin className="w-6 h-6 text-[#124b8d]" />,
    sponsorship: "State or Eligible Family Sponsor",
    location: "Designated regional areas only",
    points: "Points-based system (grants 15 extra points for regional nomination)",
    pathway: "Pathway to permanent subclass 191 regional visa after 3 years",
    family: "Eligible partner and dependent children can be included"
  },
  {
    subclass: "Skilled Nominated (Subclass 190)",
    icon: <Landmark className="w-6 h-6 text-[#e31b23]" />,
    sponsorship: "State or Territory Government nomination",
    location: "Commitment to live/work in nominating state for 2 years",
    points: "Points-based system (grants 5 extra points for state nomination)",
    pathway: "Direct permanent residency from day one of visa grant",
    family: "Eligible partner and dependent children can be included"
  },
  {
    subclass: "Skilled Independent (Subclass 189)",
    icon: <Compass className="w-6 h-6 text-[#124b8d]" />,
    sponsorship: "No sponsor required (independent skilled migration)",
    location: "Live, study, and work anywhere in Australia",
    points: "Points-based system (requires high competitive score based on occupation)",
    pathway: "Direct permanent residency from day one of visa grant",
    family: "Eligible partner and dependent children can be included"
  },
  {
    subclass: "Employer Nomination Scheme (Subclass 186)",
    icon: <ShieldCheck className="w-6 h-6 text-[#e31b23]" />,
    sponsorship: "Approved nominating Australian employer",
    location: "Bound to work for sponsoring employer (varies by stream)",
    points: "Employer-sponsored pathway (no points test required)",
    pathway: "Direct permanent residency (Temporary Transition or Direct Entry streams)",
    family: "Eligible partner and dependent children can be included"
  }
];

export default function PRCategories() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Permanent Residency Categories" 
        subtitle="Compare Subclasses 491, 189, 190, and 186 to find your migration pathway."
        breadcrumb="Visas & PR / Categories"
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Categories Cards Section */}
      <section className="py-24 bg-[#FAF8F5]/40 relative overflow-hidden">
        {/* Soft Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#80808005_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#124b8d]/5 border border-[#124b8d]/10 text-[#124b8d] text-xs font-bold uppercase tracking-wider shadow-sm select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] animate-pulse" />
                Migration Classes
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4">
              Permanent Residency{" "}
              <span className="relative inline-block text-[#124b8d]">
                Visas
                <span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-[#124b8d]/15 rounded-full" />
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              Review Australia&apos;s primary points-based skilled migration and employer-sponsored permanent residency categories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((cat, idx) => {
              const items = [
                { label: "Sponsorship", value: cat.sponsorship },
                { label: "Location Rules", value: cat.location },
                { label: "System Parameters", value: cat.points },
                { label: "PR Pathway", value: cat.pathway },
                { label: "Family Inclusion", value: cat.family }
              ];

              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:border-[#124b8d]/30 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between cursor-default"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-[#124b8d] transition-colors">
                      {cat.subclass}
                    </h3>
                    
                    <ul className="space-y-4 mb-2">
                      {items.map((item, itemIdx) => (
                        <li 
                          key={itemIdx} 
                          className="flex items-start text-slate-600 text-sm md:text-[14px] leading-relaxed font-medium transition-colors duration-200"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-slate-800 font-bold">{item.label}:</strong> {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-28 bg-[#FAF8F5] border-y border-slate-200/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#80808004_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Subclass Comparison Matrix
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-600 border-collapse">
                <thead className="bg-slate-50/80 text-slate-900 font-bold uppercase text-xs tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="px-8 py-5">Subclass</th>
                    <th className="px-8 py-5">Sponsorship Required</th>
                    <th className="px-8 py-5">Geographical Rules</th>
                    <th className="px-8 py-5">PR Timing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6 font-extrabold text-[#124b8d] text-base md:text-[15px] leading-tight group-hover:text-[#0c3463] transition-colors border-l-4 border-l-transparent hover:border-l-[#124b8d]">
                        {cat.subclass}
                      </td>
                      <td className="px-8 py-6 text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                        {cat.sponsorship}
                      </td>
                      <td className="px-8 py-6 text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                        {cat.location}
                      </td>
                      <td className="px-8 py-6 text-sm md:text-base whitespace-nowrap min-w-[180px]">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 border text-xs font-bold rounded-full shadow-sm whitespace-nowrap ${
                          cat.pathway.includes("day one") 
                            ? "bg-blue-50 text-[#124b8d] border-blue-100/50" 
                            : "bg-red-50 text-[#e31b23] border-red-100/50"
                        }`}>
                          ⏱️ {cat.pathway.includes("day one") ? "Direct PR on Grant" : "Pathway after 3 Years"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Callout */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Soft Ambient Background Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#124b8d]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-gradient-to-br from-[#FAF8F5] via-white to-[#FAF8F5] border border-slate-200/80 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 lg:p-16 text-center space-y-8 relative overflow-hidden group hover:shadow-[0_30px_70px_rgba(0,0,0,0.05)] transition-shadow duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#124b8d]/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#124b8d]/10 transition-all duration-500" />
            
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Map Your Path to{" "}
              <span className="relative inline-block text-[#124b8d]">
                Permanent Residency
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#124b8d]/15 rounded-full" />
              </span>
            </h2>
            
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
              Migration rules evolve frequently. AEC connects you to long-standing legal <strong className="font-semibold text-slate-800">MARA-registered expertise</strong> to audit your point score and design your academic-to-residency timeline.
            </p>
            
            <div className="pt-4 flex justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#124b8d] hover:bg-[#0c3463] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.2)] hover:shadow-[0_15px_35px_rgba(18,75,141,0.3)] hover:-translate-y-0.5 active:translate-y-0 border-0 transition-all duration-300 px-10 py-5 h-auto text-base inline-flex items-center gap-2 group cursor-pointer">
                  Get Your PR Assessment
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
