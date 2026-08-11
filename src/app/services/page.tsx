"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  FileText, Plane, Briefcase, BookOpen, Users, 
  HeartHandshake, ArrowUpRight, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const serviceCards = [
  {
    name: "Pre-Departure Services",
    href: "/services/pre-departure",
    icon: <FileText className="w-6 h-6 text-[#124b8d]" />,
    desc: "Thorough support before you leave, including university admissions, GTE counseling, MARA-registered visa prep, and documentation reviews."
  },
  {
    name: "Arrival & Settlement Services",
    href: "/services/arrival-settlement",
    icon: <Plane className="w-6 h-6 text-[#e31b23]" />,
    desc: "Complete local transition support in Australia, covering airport pickup, homestay finding, banking, SIM activation, TFN, and public transport card setup."
  },
  {
    name: "Post-Study Career Services",
    href: "/services/career-services",
    icon: <Briefcase className="w-6 h-6 text-[#124b8d]" />,
    desc: "Launch your professional career with subclass 485 graduate visa submissions, Professional Year programs, internship matching, and placement coaching."
  },
  {
    name: "IELTS & PTE Preparation",
    href: "/services/ielts-pte",
    icon: <BookOpen className="w-6 h-6 text-[#e31b23]" />,
    desc: "Achieve your target academic scorecards with expert trainers, small class sizes, weekly mock exams, and flexible batches."
  },
  {
    name: "Partner & Family Visa Services",
    href: "/services/partner-family",
    icon: <Users className="w-6 h-6 text-[#124b8d]" />,
    desc: "Bring your loved ones with specialized relationship compilation checklists, financial capacity audits, and dependent child visa processing."
  },
  {
    name: "For Parents: Resources & Updates",
    href: "/services/parents-resources",
    icon: <HeartHandshake className="w-6 h-6 text-[#e31b23]" />,
    desc: "Providing absolute reassurance for parents with student safety updates, budget guidelines, course progression audits, and emergency links."
  }
];

export default function ServicesPortal() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Complete Services" 
        subtitle="Supporting you seamlessly from your first discovery session to your final settlement."
        breadcrumb="Services"
        bgImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Directory Bento Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-3">
              Comprehensive Support
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Explore Our Specialized Divisions
            </h2>
            <p className="text-lg text-slate-500">
              Unlike traditional agencies who stop caring after visa approvals, AEC acts as your dedicated local career partner throughout your entire global education journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceCards.map((service, idx) => (
              <Link 
                key={idx}
                href={service.href}
                className="group block border border-slate-100 bg-white rounded-3xl p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C] mb-3 group-hover:text-[#124b8d] transition-colors leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-[#124b8d] pt-4 border-t border-slate-100 mt-4">
                  Learn More <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Counselor Callout */}
      <section className="py-20 bg-white overflow-hidden relative border-t border-slate-100">
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Start Your Educational Roadmap Today</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Take the first step toward securing a world-class degree. Secure a comprehensive, customized profile evaluation from our qualified counseling teams.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                <span>Book Your Free Assessment</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

