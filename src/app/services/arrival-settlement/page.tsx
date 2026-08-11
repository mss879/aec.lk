"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  Plane, Home, Landmark, Briefcase, Compass, ShieldCheck, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const arrivalServices = [
  { title: "Airport Reception", desc: "Welcome briefing and safe airport transfers upon landing in selected major cities.", icon: <Plane className="w-6 h-6 text-[#124b8d]" /> },
  { title: "Accommodation Finding", desc: "Active support searching, auditing, and securing verified homestays or private rentals.", icon: <Home className="w-6 h-6 text-[#e31b23]" /> },
  { title: "Essential Setup", desc: "Direct guidance activating Australian mobile SIM cards, bank accounts, public transport passes, and Tax File Number (TFN).", icon: <Landmark className="w-6 h-6 text-[#124b8d]" /> },
  { title: "Part-Time Job Coaching", desc: "Resume customization, interview training, and local professional networking to secure compliant part-time employment.", icon: <Briefcase className="w-6 h-6 text-[#e31b23]" /> },
  { title: "University Enrollment", desc: "Meticulous support wrapping up final university registrations, timetables, and campus orientations.", icon: <ShieldCheck className="w-6 h-6 text-[#124b8d]" /> },
  { title: "Ongoing Student Welfare", desc: "Ongoing counseling, academic tracking, emergency links, and monthly status briefs.", icon: <Compass className="w-6 h-6 text-[#e31b23]" /> }
];

export default function ArrivalSettlement() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Arrival & Settlement Services" 
        subtitle="Complete on-shore support to help you adapt and succeed in Australia."
        breadcrumb="Services / Arrival & Settlement"
        bgImage="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-3">
              On-Shore Integration
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              When You Arrive in Australia
            </h2>
            <p className="text-lg text-slate-500">
              Unlike other agencies whose service stops at visa approvals, AEC is physically present in Australia to support your integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {arrivalServices.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 relative group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C] mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA support */}
      <section className="py-20 bg-white overflow-hidden relative border-t border-slate-100">
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Secure Your Settlement Support</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Ensure your on-shore banking, mobile connectivity, public transport setup, and homestays are fully coordinated.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                <span>Learn About Settlement Support</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

