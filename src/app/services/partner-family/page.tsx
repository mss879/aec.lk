"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

const visaCategories = [
  { title: "Partner or Spouse Visas", desc: "For married or registered de facto spouses seeking to join students in Australia initially or as subsequent entrants." },
  { title: "Dependent Child Visas", desc: "For minor dependent children accompanying studying parents, matching schooling and daycare guidelines." },
  { title: "Family Visitor Visas", desc: "For parents and direct relatives planning short visits to join students during graduations or breaks." },
  { title: "Guardian Visas", desc: "For one parent or legal guardian accompanying an international school minor student under 18 years." },
  { title: "Graduate Dependent Add-Ons", desc: "For spouses or children seeking to join graduates holding active Subclass 485 Temporary Graduate visas." }
];

export default function PartnerFamilyVisaServices() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Partner & Family Visa Services" 
        subtitle="Stay connected. AEC provides specialized support bringing spouses, children, and guardians to Australia."
        breadcrumb="Services / Family Visas"
        bgImage="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
                Accompanying Dependents
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Accompanying Family Visas
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                AEC helps students, graduates, and parents stay connected with their loved ones. Our migration support networks provide transparent, compliant, and highly structured guidance to include family members in your student visa lodging or post-study transition plans.
              </p>
              
              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                    <span>Schedule Family Visa Consultation</span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Card Grid */}
            <div className="lg:col-span-5 space-y-4">
              {visaCategories.map((cat, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl flex items-start gap-3.5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#124b8d] shrink-0 mr-1 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#11181C]">{cat.title}</h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions checklist */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
              Our Comprehensive Family Support Includes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Eligibility Assessment */}
            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 text-[#124b8d] flex items-center justify-center font-bold text-sm shadow-sm">01</div>
              <h3 className="font-bold text-lg text-[#11181C] tracking-tight">Eligibility Audits</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Detailed reviews of previous visa histories, GTE parameters, financial capacities, and country compliance lists.
              </p>
            </div>

            {/* Document Prep */}
            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 text-[#124b8d] flex items-center justify-center font-bold text-sm shadow-sm">02</div>
              <h3 className="font-bold text-lg text-[#11181C] tracking-tight">Document Review</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Meticulous coordination of financial records, joint bank details, statutory declarations, tax statements, and OSHC family plans.
              </p>
            </div>

            {/* Relationship Compilation */}
            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 text-[#124b8d] flex items-center justify-center font-bold text-sm shadow-sm">03</div>
              <h3 className="font-bold text-lg text-[#11181C] tracking-tight">Evidence Compilation</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Strategic advice structuring relationship timelines, marriage registries, communication logs, and statutory declarations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

