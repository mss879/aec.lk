"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
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

const prFAQs = [
  { title: "Can I bring my spouse while I study in Australia?", content: "Yes. Your spouse and dependent children may accompany you on a dependent student visa, subject to current eligibility and financial capacity conditions. AEC provides expert support with dependent visa applications." },
  { title: "How long does it take from student visa to PR?", content: "A common skilled migration pathway typically takes around 4 to 6 years, which includes your study duration (2-4 years), post-study graduate work visa (2-4 years), accumulating local work experience, and official PR points assessment and processing." },
  { title: "Do I need work experience before getting PR?", content: "While not strictly mandatory for all subclasses, having relevant Australian work experience significantly strengthens your PR points score and is generally required for employer sponsorship or successful skills assessment." },
  { title: "What is a Professional Year Program?", content: "It is a structured 12-month professional development program combining formal learning and an internship for Accounting, IT, or Engineering graduates. Completing it grants 5 valuable points toward your skilled migration PR points test." },
  { title: "Can my family get PR if I get it?", content: "Yes. Eligible spouses, de facto partners, and dependent children can usually be included as secondary applicants in your skilled migration or employer-nominated PR applications." },
  { title: "Which courses give better PR chances?", content: "Courses that align directly with long-standing occupations on Australia's Medium and Long-term Strategic Skills List (MLTSSL) generally offer stronger PR prospects. Leading examples include Nursing, Engineering, IT, Accounting, Teaching, and specialized trades." }
];

export default function PRPathwaysPortal() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Pathway to Permanent Residency" 
        subtitle="From Student to PR - We guide you strategically through every regulatory milestone."
        breadcrumb="Visas & PR"
        bgImage="https://images.unsplash.com/photo-1525413725615-11e7baea450d?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Visas & PR Hub Intro */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#124b8d] text-xs font-bold uppercase tracking-wider">
                Immigration Experts
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-6">
                Navigating the Australian Skilled Migration System
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Studying in Australia can be the first step toward building a long-term professional career and future in Australia. AEC helps students map post-study work visas, secure employer sponsorships, navigate skilled regional programs, and coordinate family-inclusive PR pathways.
              </p>
              
              <div className="p-6 bg-[#FAF8F5] border border-slate-200 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-lg text-[#11181C]">MARA-Registered Migration Support</div>
                  <div className="text-slate-400 text-xs mt-0.5">Connected to long-standing legal visa expertise</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                    Get Your PR Pathway Assessment
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right floating layout cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6 relative">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full pointer-events-none" />

              <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#11181C] mb-1">Post-Study Visa (485)</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">Secure 2 to 4 years of open work rights after graduation to gain local professional experience.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e31b23] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#11181C] mb-1">Employer Sponsorship (482/186)</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">Transition smoothly onto temporary skill shortages or direct employer nominations.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#11181C] mb-1">Points-Based Skilled Migration</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">Master the subclass 189, 190, and 491 points calculators with strategic course choices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Subpages Bento Section */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#124b8d] text-xs font-bold uppercase tracking-wider mb-3">
              Subpage Portals
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Explore Visa & PR Core Sections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Visa Options Card */}
            <Link href="/pr-pathways/visa-options" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[260px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF8F5] rounded-bl-full group-hover:bg-[#FAF8F5]/80 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#124b8d] flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#11181C] mb-2 group-hover:text-[#124b8d] transition-colors">Visa Options: 485, 407, 482</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">Detailing Subclass 485 Temporary Graduate Streams, Subclass 407 Training Visa, and Subclass 482 Temporary Skill Shortage.</p>
              </div>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#124b8d]">
                Explore Visas <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Journey Card */}
            <Link href="/pr-pathways/journey" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[260px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF8F5] rounded-bl-full group-hover:bg-[#FAF8F5]/80 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-[#e31b23] flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#11181C] mb-2 group-hover:text-[#e31b23] transition-colors">Step-by-Step Journey to PR</h3>
                <p className="text-slate-505 text-sm leading-relaxed line-clamp-2">Mapping your timeline from landing as an international student, graduate work experience, to skilled points tests.</p>
              </div>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#e31b23]">
                View Journey Timeline <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* PR Categories Card */}
            <Link href="/pr-pathways/categories" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[260px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF8F5] rounded-bl-full group-hover:bg-[#FAF8F5]/80 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#124b8d] flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#11181C] mb-2 group-hover:text-[#124b8d] transition-colors">Permanent Residency Categories</h3>
                <p className="text-slate-550 text-sm leading-relaxed line-clamp-2">Comprehensive grids breaking down Subclasses 491 (Skilled Regional), 189 (Independent), 190 (Nominated), and 186.</p>
              </div>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#124b8d]">
                Compare Categories <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PR FAQs Accordion Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#124b8d] text-xs font-bold uppercase tracking-wider mb-3">
              Quick Answers
            </span>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-[#11181C]">
              PR Pathways FAQs
            </h2>
          </div>
          
          <Accordion items={prFAQs} />
          
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Book a PR Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
