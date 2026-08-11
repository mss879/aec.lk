"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { 
  Book, GraduationCap, Home, HeartHandshake, ShieldCheck, 
  CheckCircle2, Users, ArrowUpRight, Award, Compass, School, ChevronRight 
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

const schoolProcess = [
  { title: "Step 1: Free Consultation", description: "Discuss your child's personality profile, academic scorecard, preferred locations, and family budget requirements." },
  { title: "Step 2: Selection & Application", description: "Shortlist suitable government or private schools and compile official academic transcripts." },
  { title: "Step 3: Acceptance & Enrollment", description: "Confirm the school's Letter of Offer, coordinate fee payment, and receive the official Confirmation of Enrolment (CoE)." },
  { title: "Step 4: Welfare Arrangements", description: "Vett and approve boarding house placement, homestay families, or parent guardian accommodation." },
  { title: "Step 5: Visa Processing", description: "Lodge the Student Visa (Subclass 500) and Guardian Visa (if applicable) with complete documentation support." },
  { title: "Step 6: Arrival & Support", description: "Organize pre-departure briefing, arrival settlement, ongoing welfare checks, and university progression audits." }
];

export default function AustralianSchoolSectorPortal() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Give Your Child a World-Class Australian Education" 
        subtitle="Premium school placements in Australia for students aged 8-18 years."
        breadcrumb="Schools"
        bgImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-24 bg-white" id="special">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Primary & Secondary Education
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-6">
                What Makes Australian Schools Special
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Australian schools combine rigorous academic standards with critical thinking, character building, independence, and real-world technology skills. Our certified placement experts connect you to carefully vetted institutions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <ShieldCheck className="w-8 h-8 text-[#e31b23] mb-4" />
                  <h3 className="font-bold text-base text-[#11181C]">Vetted Safety</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed font-medium">Strict welfare support codes for all international minors.</p>
                </div>
                <div className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <GraduationCap className="w-8 h-8 text-[#124b8d] mb-4" />
                  <h3 className="font-bold text-base text-[#11181C]">Global Certs</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed font-medium">Year 12 certificates recognized by top global universities.</p>
                </div>
                <div className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <HeartHandshake className="w-8 h-8 text-[#124b8d] mb-4" />
                  <h3 className="font-bold text-base text-[#11181C]">Holistic growth</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed font-medium">Focus on sports, creative arts, and leadership skills.</p>
                </div>
              </div>
            </div>

            {/* Right Graphic column */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[350px]">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />
              <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl rotate-[6deg] group hover:rotate-0 transition-transform duration-500 z-10">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2940&auto=format&fit=crop" alt="Students" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Bento Grid */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Subpages Hub
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Explore School Core Sections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* School Types */}
            <Link href="/australian-school-sector/school-types" className="group block bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-[260px] flex flex-col justify-between">
              <div>
                <School className="w-8 h-8 text-[#124b8d] mb-4" />
                <h3 className="font-bold text-lg text-[#11181C] mb-2 group-hover:text-[#124b8d] transition-colors tracking-tight">School Types</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">Detailing Private/Independent, Catholic, and Public/Government schools.</p>
              </div>
              <div className="flex items-center text-sm font-bold uppercase tracking-wider text-[#124b8d] pt-4 border-t border-slate-50 mt-4">
                <span>Explore Types</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Entry Points */}
            <Link href="/australian-school-sector/entry-points" className="group block bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-[260px] flex flex-col justify-between">
              <div>
                <GraduationCap className="w-8 h-8 text-[#e31b23] mb-4" />
                <h3 className="font-bold text-lg text-[#11181C] mb-2 group-hover:text-[#e31b23] transition-colors tracking-tight">Entry Points</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">Visual guides to Years 3–6 (Primary), Years 7–9 (Junior), and Years 10–11.</p>
              </div>
              <div className="flex items-center text-sm font-bold uppercase tracking-wider text-[#e31b23] pt-4 border-t border-slate-50 mt-4">
                <span>View Entry Points</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Costs & Budget */}
            <Link href="/australian-school-sector/costs" className="group block bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-[260px] flex flex-col justify-between">
              <div>
                <Award className="w-8 h-8 text-[#124b8d] mb-4" />
                <h3 className="font-bold text-lg text-[#11181C] mb-2 group-hover:text-[#124b8d] transition-colors tracking-tight">Costs & Estimator</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">Calculate tuition fees, uniform, and pocket budgets in real-time.</p>
              </div>
              <div className="flex items-center text-sm font-bold uppercase tracking-wider text-[#124b8d] pt-4 border-t border-slate-50 mt-4">
                <span>Calculate Budgets</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Accommodation */}
            <Link href="/australian-school-sector/accommodation" className="group block bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-[260px] flex flex-col justify-between">
              <div>
                <Home className="w-8 h-8 text-[#e31b23] mb-4" />
                <h3 className="font-bold text-lg text-[#11181C] mb-2 group-hover:text-[#e31b23] transition-colors tracking-tight">Welfare & Housing</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">Auditing Homestay families, School boarding, or Guardian visa setups.</p>
              </div>
              <div className="flex items-center text-sm font-bold uppercase tracking-wider text-[#e31b23] pt-4 border-t border-slate-50 mt-4">
                <span>View Accommodation</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 bg-white" id="process">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1]">
              The Application Process
            </h2>
            <p className="text-slate-500 mt-2">Our chronological, step-by-step guidance from review to arrival.</p>
          </div>

          <Timeline items={schoolProcess} />

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                <span>Start Your Child&apos;s Application Today</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
