"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const preDepartureServices = [
  { title: "FREE Qualified Counseling", desc: "Our certified PIER counselors help you select the exact professional course, location, and university to match your scorecard." },
  { title: "University Applications", desc: "Complete, meticulous application submission and tracking for universities, TAFEs, and pathway colleges." },
  { title: "FREE MARA Visa Advice", desc: "Expert, student visa coordination supported by registered migration legal networks." },
  { title: "Financial Planning & Loans", desc: "Comprehensive support outlining tuition terms, living costs, bank documentation, and educational loans." },
  { title: "Partner & Family Support", desc: "Meticulous guidance to include spouses, dependents, or guardians in your visa lodging." },
  { title: "Airline Ticketing Support", desc: "Coordination for flight bookings, seat parameters, luggage limits, and student flight discounts." },
  { title: "Document Preparation", desc: "Assistance organizing legal transcripts, translation validations, health panel reviews, and police clearance logs." },
  { title: "English Test Guidance", desc: "IELTS and PTE registration support, mapping test centers, scheduling dates, and booking slots." }
];

export default function PreDeparture() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Pre-Departure Services" 
        subtitle="Complete, expert preparation before you leave Sri Lanka or the UAE."
        breadcrumb="Services / Pre-Departure"
        bgImage="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-3">
              Preparation Stages
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Before You Leave
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preDepartureServices.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 relative group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-[#124b8d] flex items-center justify-center mb-6 font-mono text-sm font-bold shadow-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-lg text-[#11181C] mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist banner */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 text-center shadow-[0_15px_50px_rgba(0,0,0,0.03)] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-bl-full pointer-events-none" />
            <h2 className="font-heading text-3xl md:text-4xl font-black tracking-tight text-[#11181C]">
              Complete Pre-Departure Checklist
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              Secure your smooth departure. Review your transcripts, statement of purpose documents, financial deposits, health tests, and ticketing details with our certified study teams.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                  <span>Download Pre-Departure Checklist</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
