"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, Clock, Landmark, Compass, 
  MapPin, ShieldCheck, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

const storyTimeline = [
  { year: "2000s", title: "Multinational Holdings Formed", desc: "Established in Melbourne, Victoria, as a diversified group representing long-standing migration and commercial solutions." },
  { year: "2010s", title: "Sister Alliance with AMS", desc: "Forged a corporate sister alliance with Australian Migration Services (AMS) to align legal migration pathways with education." },
  { year: "Today", title: "Global Expansion", desc: "Formed dedicated physically staffed offices in Colombo, Adelaide, Melbourne, and Dubai serving thousands of students annually." }
];

export default function OurStory() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Our Story" 
        subtitle="20+ years of established pedigree matching education counseling to long-term career goals."
        breadcrumb="About Us / Our Story"
        bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Corporate story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
                Corporate Pedigree
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] leading-tight">
                Pioneering Strategic Counseling
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Formed as the premier education division of Multinational Holdings, AEC was established as a sister company to Australian Migration Services to solve a crucial industry gap: matching academic counseling to valid, compliant, long-term legal migration and career outcomes. Today, we serve students across Sri Lanka and the UAE with physical office locations.
              </p>
            </div>

            {/* Right Graphic column */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[320px]">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />
              <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl rotate-[-6deg] group hover:rotate-0 transition-transform duration-500 z-10">
                <img src="/our_story_meeting.png" alt="Meeting" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
              Our Corporate Growth Timeline
            </h2>
          </div>

          <div className="relative border-l-2 border-slate-300 ml-6 md:ml-12 my-8">
            {storyTimeline.map((item, index) => (
              <div key={index} className="mb-10 ml-8 relative">
                <span className="absolute -left-[43px] flex items-center justify-center w-8 h-8 rounded-full bg-[#124b8d] text-white ring-4 ring-white">
                  <span className="text-sm font-bold">{index + 1}</span>
                </span>
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-sm font-bold text-[#124b8d] uppercase tracking-wider">{item.year}</div>
                  <h3 className="font-bold text-lg text-[#11181C] mb-2 mt-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
