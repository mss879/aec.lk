"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Calendar, Compass, ChevronRight, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

const entryPoints = [
  {
    stage: "Ages 8-11 (Primary School - Years 3-6)",
    bullets: [
      "Easiest adaptation",
      "Language acquisition prime age",
      "Cultural integration",
      "Long-term foundation"
    ],
    icon: <Calendar className="w-6 h-6 text-[#124b8d]" />
  },
  {
    stage: "Ages 12-14 (Junior High School - Years 7-9)",
    bullets: [
      "Still young enough to adapt easily",
      "Better English development",
      "Complete high school in Australia",
      "5-6 years to settle before university"
    ],
    icon: <GraduationCap className="w-6 h-6 text-[#e31b23]" />
  },
  {
    stage: "Ages 15-16 (Senior High School - Years 10-11)",
    bullets: [
      "Most common entry age",
      "2-3 years before university",
      "Mature enough for homestay",
      "Focused goal"
    ],
    icon: <Compass className="w-6 h-6 text-[#124b8d]" />
  }
];

export default function EntryPoints() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Age-Appropriate Entry Points" 
        subtitle="Visual guide to key school entry years, academic divisions, and age guidelines."
        breadcrumb="Schools / Entry Points"
        bgImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Grid of entry points */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Enrollment Milestones
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Child School Placement Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {entryPoints.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center border border-blue-100/50">
                    {item.icon}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 leading-tight tracking-tight">{item.stage}</h3>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Why This Age:</div>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      {item.bullets.map((b, bidx) => (
                        <li key={bidx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#124b8d] shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-600">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning note */}
      <section className="py-24 bg-[#FAF8F5] border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Important Academic Placement Rules
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
            We highly recommend planning enrollment for the start of Year 7 (Junior Secondary) or the start of Year 9/10. Entering mid-way through Year 11 or 12 is generally <strong>not permitted</strong> by education departments, as it disrupts the mandatory final senior secondary certificate assessment frameworks.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                <span>Audit Your Child&apos;s Placement Timeline</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
