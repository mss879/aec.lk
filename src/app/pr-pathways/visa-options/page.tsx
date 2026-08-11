"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Briefcase, Award, TrendingUp, CheckCircle2, 
  MapPin, Clock, ArrowUpRight, Compass, ShieldCheck, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function VisaOptions() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Post-Study Visa Options" 
        subtitle="Explore Subclass 485, 407, and 482 to secure Australian work experience."
        breadcrumb="Visas & PR / Visa Options"
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Visas Grid Overviews */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-24">
          
          {/* Subclass 485 Overhaul (Featured Section) */}
          <div className="bg-[#FAF8F5] border border-slate-200 rounded-[2.5rem] p-8 lg:p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-bl-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#124b8d] text-xs font-bold uppercase tracking-wider">
                    Post-Graduate Rights
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#11181C] leading-tight">
                  Subclass 485 - Temporary Graduate Visa
                </h2>
                <p className="text-slate-500 text-base leading-relaxed font-light">
                  The Temporary Graduate Visa allows eligible graduates to remain in Australia after completing their studies, gain valuable local work experience, and significantly boost their migration points.
                </p>
                <div className="p-5 bg-[#124b8d]/5 rounded-2xl border-l-4 border-l-[#124b8d] border-y border-r border-[#124b8d]/10 text-slate-700 text-sm leading-relaxed shadow-sm">
                  🛡️ <strong className="font-semibold text-slate-900">AEC Support:</strong> We assist with 485 visa preparation, skills assessment tracking, relationships compilation, health checks, and submission as part of the student support journey.
                </div>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button size="lg" className="bg-[#124b8d] hover:bg-[#0c3463] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.2)] hover:shadow-[0_15px_35px_rgba(18,75,141,0.3)] hover:-translate-y-0.5 active:translate-y-0 border-0 transition-all duration-300 px-8 py-4 h-auto inline-flex items-center gap-2 group cursor-pointer">
                      Check 485 Eligibility - FREE
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Two streams side-by-side inside the card */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Stream 1 */}
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group/card cursor-default">
                  <div>
                    <h3 className="font-bold text-lg text-[#124b8d] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-3.5 rounded bg-[#124b8d]" />
                      Post-Study Work Stream
                    </h3>
                    <ul className="space-y-3.5 text-slate-600 text-sm leading-relaxed font-medium">
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5 group-hover/card:scale-110 transition-transform" /> <span><strong className="text-slate-800 font-semibold">Bachelor Degree:</strong> 2 years rights</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> <span><strong className="text-slate-800 font-semibold">Masters Degree:</strong> 3 years rights</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> <span><strong className="text-slate-800 font-semibold">PhD Degree:</strong> 4 years rights</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Work in any professional field</li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Bring spouse & children</li>
                    </ul>
                  </div>
                </div>

                {/* Stream 2 */}
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group/card cursor-default">
                  <div>
                    <h3 className="font-bold text-lg text-[#124b8d] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-3.5 rounded bg-[#124b8d]" />
                      Graduate Work Stream
                    </h3>
                    <ul className="space-y-3.5 text-slate-600 text-sm leading-relaxed font-medium">
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5 group-hover/card:scale-110 transition-transform" /> <span><strong className="text-slate-800 font-semibold">Duration:</strong> 18 months work rights</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Must be in a nominated skilled occupation</li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Skills assessment required</li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Supports regional skilled migration</li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Bring spouse & children</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subclass 407 & 482 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Subclass 407 Training Visa */}
            <div className="bg-[#FAF8F5] border border-slate-200 rounded-[2.5rem] p-8 lg:p-10 shadow-sm relative overflow-hidden group flex flex-col justify-between h-full hover:shadow-xl hover:border-slate-300 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e31b23]/5 rounded-bl-full pointer-events-none" />
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#e31b23] text-xs font-bold uppercase tracking-wider">
                    Structured Training
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-[#11181C] leading-tight">
                  Subclass 407 - Training Visa
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light">
                  The Training Visa supports structured workplace-based training to improve professional skills and gain valuable Australian industry exposure.
                </p>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4">
                  <div className="text-sm font-bold uppercase tracking-wider text-[#e31b23] flex items-center gap-1.5">
                    <span>📋</span> Key Highlights:
                  </div>
                  <ul className="text-sm text-slate-600 space-y-3 leading-relaxed font-medium">
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#e31b23] shrink-0 mt-0.5" /> Duration up to 2 years</li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#e31b23] shrink-0 mt-0.5" /> Requires an approved nominating sponsor</li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#e31b23] shrink-0 mt-0.5" /> Focuses on workplace-based practical training</li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#e31b23] shrink-0 mt-0.5" /> Builds local CV references & leads to employer sponsorship</li>
                  </ul>
                </div>
                <div className="p-5 bg-[#e31b23]/5 rounded-2xl border-l-4 border-l-[#e31b23] border-y border-r border-[#e31b23]/10 text-slate-700 text-sm leading-relaxed shadow-sm">
                  🛡️ <strong className="font-semibold text-slate-900">AEC Support:</strong> We connect eligible students with approved Australian sponsors and workplace training opportunities.
                </div>
              </div>
              <div className="pt-6">
                <Link href="/contact">
                  <Button size="lg" className="w-full bg-[#e31b23] hover:bg-[#b81218] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(227,27,35,0.15)] hover:shadow-[0_15px_35px_rgba(227,27,35,0.25)] hover:-translate-y-0.5 active:translate-y-0 border-0 transition-all duration-300 px-8 py-4 h-auto inline-flex items-center justify-center gap-2 group cursor-pointer">
                    Explore Training Opportunities
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Subclass 482 Temporary Skill Shortage */}
            <div className="bg-[#FAF8F5] border border-slate-200 rounded-[2.5rem] p-8 lg:p-10 shadow-sm relative overflow-hidden group flex flex-col justify-between h-full hover:shadow-xl hover:border-slate-300 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#124b8d]/5 rounded-bl-full pointer-events-none" />
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#124b8d] text-xs font-bold uppercase tracking-wider">
                    Employer Nomination
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-[#11181C] leading-tight">
                  Subclass 482 - Temporary Skill Shortage
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light">
                  The 482 visa allows eligible skilled international graduates to work in Australia for an approved nominating employer.
                </p>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4">
                  <div className="text-sm font-bold uppercase tracking-wider text-[#124b8d] flex items-center gap-1.5">
                    <span>📋</span> Key Highlights:
                  </div>
                  <ul className="text-sm text-slate-600 space-y-3 leading-relaxed font-medium">
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> <span><strong className="text-slate-800 font-semibold">Short-Term Stream:</strong> up to 2 years (renewable once)</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> <span><strong className="text-slate-800 font-semibold">Medium-Term Stream:</strong> up to 4 years (direct PR pathway potential)</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Requires a formal job offer from an approved sponsor</li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2.5 text-[#124b8d] shrink-0 mt-0.5" /> Spouses receive open work rights; children can study</li>
                  </ul>
                </div>
                <div className="p-5 bg-[#124b8d]/5 rounded-2xl border-l-4 border-l-[#124b8d] border-y border-r border-[#124b8d]/10 text-slate-700 text-sm leading-relaxed shadow-sm">
                  🛡️ <strong className="font-semibold text-slate-900">AEC Support:</strong> Our career placement support helps graduates build resumes and connect with employers seeking skilled workers.
                </div>
              </div>
              <div className="pt-6">
                <Link href="/contact">
                  <Button size="lg" className="w-full bg-[#124b8d] hover:bg-[#0c3463] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.2)] hover:shadow-[0_15px_35px_rgba(18,75,141,0.3)] hover:-translate-y-0.5 active:translate-y-0 border-0 transition-all duration-300 px-8 py-4 h-auto inline-flex items-center justify-center gap-2 group cursor-pointer">
                    Find Sponsoring Employers
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
