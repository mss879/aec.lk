"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Baby, GraduationCap, CheckCircle2, AlertTriangle, 
  MapPin, Clock, ArrowUpRight, ShieldCheck, Heart 
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

export default function ChildrenBenefits() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Schooling & Children's Benefits" 
        subtitle="Explore quality primary, secondary, and early childhood education benefits in Australia."
        breadcrumb="Partner & Family Visas / Children"
        bgImage="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Elite Childhood Pathways
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] mb-4">
              Give Your Children a World-Class Foundation
            </h2>
            <p className="text-lg text-slate-500">
              Australia offers a safe, multicultural, and highly nurturing environment. International student dependents gain direct access to elite state schooling systems and early learning centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* School Age */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl text-[#11181C] tracking-tight">School-Age Children (5-18 years)</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Eligible to enroll in premium Australian public or private school systems, offering high academic standards and comprehensive character development.
                </p>
                
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Full enrollment in primary and secondary schools</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Immersive English language environment</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Diverse, global student body friendships</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Strong preparation for top international university entry</span></li>
                </ul>
              </div>
            </div>

            {/* Younger Children (Under 5 Years) */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e31b23] flex items-center justify-center">
                  <Baby className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl text-[#11181C] tracking-tight">Younger Children (Under 5 Years)</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Excellent childcare and early kindergarten settings, allowing parents to focus on studies or career development.
                </p>
                
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Access to premium regulated childcare centers</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Play-based early learning frameworks</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Active social interaction in high safety zones</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Complete peace of mind for working/studying parents</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School fees details */}
      <section className="py-24 bg-[#FAF8F5] border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-blue-50/40 border border-blue-100 rounded-[2rem] p-8 lg:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#124b8d] shrink-0 flex items-center justify-center border border-blue-100/50">
              <AlertTriangle className="w-6 h-6 text-[#124b8d]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-slate-900">Important Schooling Fees Notice</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                School tuition fees may apply for dependent children in Australian public schools. Costs vary significantly based on your visa subclass, student level, child age, and individual Australian state rules. Speak to our team to plan your family budget accurately.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
