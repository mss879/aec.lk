"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Heart, Award, ShieldCheck, CheckCircle2, 
  MapPin, Clock, ArrowUpRight, Compass, ChevronRight,
  Briefcase, GraduationCap
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

export default function BringFamily() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Bring Your Partner & Family to Australia" 
        subtitle="Expert Guidance on dependent visas and family pathways to Australia."
        breadcrumb="Partner & Family Visas / Bring Family"
        bgImage="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Family Inclusion
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] leading-tight">
                Your Education Journey Does Not Have to Separate You
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Australia is one of the most family-friendly international student destinations. AEC helps students strategically structure applications to include partners, spouses, and children in their Australian study and post-study work plans.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5 text-[#124b8d]" />
                  </div>
                  <div className="font-bold text-lg text-[#11181C]">Stay Together</div>
                  <div className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">Avoid long periods of separation.</div>
                </div>
                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Briefcase className="w-5 h-5 text-[#124b8d]" />
                  </div>
                  <div className="font-bold text-lg text-[#11181C]">Your Partner Can Work</div>
                  <div className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">Partners can work and build experience.</div>
                </div>
                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <GraduationCap className="w-5 h-5 text-[#124b8d]" />
                  </div>
                  <div className="font-bold text-lg text-[#11181C]">Children's Education</div>
                  <div className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">Access safety and top schools.</div>
                </div>
              </div>
            </div>

            {/* Right Graphic column */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[350px]">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />
              <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl rotate-[-6deg] group hover:rotate-0 transition-transform duration-500 z-10">
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2940&auto=format&fit=crop" alt="Family" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Options comparison */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
              Application Pathways & Options
            </h2>
            <p className="text-slate-500 mt-2">Compare the two primary strategies to bring your family to Australia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Option 1 */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-6">
                <h3 className="font-bold text-2xl text-[#11181C] tracking-tight">Option 1: Apply Together Initially</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Highly recommended for most families. The primary student visa and all dependent partner/child visa applications are lodged simultaneously.
                </p>
                
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#124b8d] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d]" />
                    Benefits
                  </div>
                  <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Partner receives visa outcome at the same time</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Arrive in Australia together</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Simpler, more cost-effective application flow</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Clear family setup planning from day one</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-6">
                <h3 className="font-bold text-2xl text-[#11181C] tracking-tight">Option 2: Add Later as Subsequent Entrant</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Suitable if the primary student already holds an approved student visa and plans for their spouse or children to join them later.
                </p>
                
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#124b8d] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d]" />
                    Considerations
                  </div>
                  <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Separate visa application and charges apply</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Processing times may vary compared to primary visa</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Relies heavily on proving continuing relationship</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Additional financial evidence and tracking required</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Requirements Checklist */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Compliance Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Requirements to Include a Partner
            </h2>
            <p className="text-lg text-slate-500">
              The Australian Department of Home Affairs maintains strict standards for dependent visa verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Relationship Evidence */}
            <div className="bg-[#FAF8F5] border border-slate-200/60 p-8 rounded-3xl space-y-6 hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:border-slate-300/80 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-xl text-[#11181C] tracking-tight">Relationship Evidence</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">Proof of genuine married or de facto relationship, including:</p>
              <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Marriage certificate or relationship registration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Joint financial accounts & bank statements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Joint tenancy leases or household bills</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Statutory declarations from family & friends</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Chronological photo album & message records</span>
                </li>
              </ul>
            </div>

            {/* Financial Capacity */}
            <div className="bg-[#FAF8F5] border border-slate-200/60 p-8 rounded-3xl space-y-6 hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:border-slate-300/80 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-xl text-[#11181C] tracking-tight">Financial Capacity</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">Proof of funds covering study, living costs, and travel for the primary student, partner, and child:</p>
              <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Savings bank statements & deposit proofs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Education loan sanction letters</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Sponsor income records & tax returns</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Active salary slip summaries</span>
                </li>
              </ul>
            </div>

            {/* Health & Character */}
            <div className="bg-[#FAF8F5] border border-slate-200/60 p-8 rounded-3xl space-y-6 hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:border-slate-300/80 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-xl text-[#11181C] tracking-tight">Health & Character Requirements</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">Identity and security declarations for all accompanying dependents:</p>
              <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Complete overseas student health cover (OSHC)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Department panel physician medical exams</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>National police clearance certificates</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] shrink-0 mt-2" />
                  <span>Biometric scan completions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Counselor Callout */}
      <section className="py-20 bg-[#FAF8F5] border-t border-slate-200 text-slate-900 overflow-hidden relative">
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#11181C]">Secure Your Family Visa Advice</h2>
          <p className="text-lg text-slate-505 max-w-2xl mx-auto leading-relaxed font-medium">
            Ensure your relationship and financial proof meets high compliance standards. Consult with our legal experts for absolute clarity.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                <span>Get Personalized Family Visa Advice</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
