"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Timeline } from "@/components/ui/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Calendar, Briefcase, Award, 
  MapPin, Clock, ArrowUpRight, Compass, ShieldCheck 
} from "lucide-react";
import Link from "next/link";

const journeySteps = [
  {
    title: "Step 1: Study in Australia",
    timeframe: "2 to 4 Years",
    description: "Complete your degree at an accredited Australian university or college. Align your course strategically with high-demand skilled occupations (such as Nursing, Engineering, IT, early childhood, or trade sets) to ensure maximum visa viability."
  },
  {
    title: "Step 2: 485 Graduate Visa",
    timeframe: "Immediately After Graduation",
    description: "Receive post-study graduate work rights immediately after completing your degree. Gives you the open work rights needed to secure a relevant professional role and live anywhere in Australia."
  },
  {
    title: "Step 3: Gain Experience",
    timeframe: "1 to 3 Years",
    description: "Build critical Australian professional work experience, complete a Professional Year Program (for IT, Engineering, or Accounting) if relevant, pass your English assessments (IELTS/PTE), and maximize your skilled migration points scorecard."
  },
  {
    title: "Step 4: Apply for PR",
    timeframe: "Processing Varies",
    description: "Once eligible, submit your Expression of Interest (EOI) and apply through Skilled Work Regional (491), Skilled Nominated (190), Skilled Independent (189), or Employer Nomination (186) pathways."
  }
];

export default function PRJourney() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Your Step-by-Step Journey to PR" 
        subtitle="Explore the chronological milestones from a student visa to Australian PR."
        breadcrumb="Visas & PR / Journey"
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Journey Timeline Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            {/* Left Info Panel */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#124b8d]/5 border border-[#124b8d]/10 text-[#124b8d] text-xs font-bold uppercase tracking-wider shadow-sm select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] animate-pulse" />
                  Strategic Milestones
                </span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Chronological Path to{" "}
                <span className="relative inline-block text-[#124b8d]">
                  PR
                  <span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-[#124b8d]/15 rounded-full" />
                </span>
              </h2>

              <p className="text-base md:text-lg text-slate-500 leading-relaxed font-light">
                The typical journey from starting as a student to receiving permanent residency spans <strong className="font-semibold text-slate-800">4 to 6 years</strong>, depending on your course, chosen occupation, accumulated work experience, government migration policy, and individual eligibility points.
              </p>
              
              <div className="p-6 bg-[#FAF8F5] border border-slate-200 border-l-4 border-l-[#124b8d] rounded-r-2xl rounded-l-md space-y-4 shadow-sm">
                <div className="text-sm font-bold uppercase tracking-wider text-[#124b8d] flex items-center gap-2">
                  <Clock className="w-4 h-4 animate-pulse text-[#124b8d]" /> Timeline Summary:
                </div>
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed font-medium">
                  <li className="flex items-start gap-2"><span className="text-[#124b8d] font-bold">•</span> <span><strong className="text-slate-800 font-bold">Study Phase:</strong> 2 to 4 years (Bachelors or Masters)</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#124b8d] font-bold">•</span> <span><strong className="text-slate-800 font-bold">Graduate Work Phase (485):</strong> 2 to 4 years of open work rights</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#124b8d] font-bold">•</span> <span><strong className="text-slate-800 font-bold">Processing Phase:</strong> Depends on visa subclasses applied</span></li>
                </ul>
              </div>

              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0c3463] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.2)] hover:shadow-[0_15px_35px_rgba(18,75,141,0.3)] hover:-translate-y-0.5 active:translate-y-0 border-0 transition-all duration-300 px-8 py-5 h-auto text-base inline-flex items-center gap-2 group cursor-pointer">
                    Download Complete PR Pathway Guide
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Timeline Component */}
            <div className="lg:col-span-7">
              <Timeline items={journeySteps} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
