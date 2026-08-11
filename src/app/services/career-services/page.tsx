"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const careerServicesList = [
  { title: "Graduate Visa Subclass 485", desc: "Expert, student support visa processing to secure your temporary graduate post-study work rights." },
  { title: "Professional Year Program", desc: "Meticulous guidance registering in approved Professional Years (IT, Accounting, Engineering) to secure 5 PR points." },
  { title: "Internship Opportunities", desc: "Direct matching onto vetted internship positions within major Australian corporate partnerships." },
  { title: "Job Placement Support", desc: "Active connection onto employers actively seeking skilled international student graduates." },
  { title: "Employer Sponsorship (407/482)", desc: "Expert legal guidance transitioning onto Subclass 407 Training or Subclass 482 temporary visas." },
  { title: "PR Pathway Guidance", desc: "Direct audits of your skilled migration points scorecard under latest sovereign immigration updates." },
  { title: "Resume & Cover Letters", desc: "Professional copywriting services adjusting your credentials to Australian hiring guidelines." },
  { title: "Networking Opportunities", desc: "Access to exclusive corporate panels, trade associations, and graduate career fairs." }
];

export default function CareerServices() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Post-Study Career Services" 
        subtitle="Meticulous support to help you transition from international student to global professional."
        breadcrumb="Services / Career Support"
        bgImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-3">
              Professional Development
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Career & PR Pathways Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerServicesList.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 relative group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-[#e31b23] flex items-center justify-center mb-6 font-mono text-sm font-bold shadow-sm">
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

      {/* Counselor Callout */}
      <section className="py-20 bg-white overflow-hidden relative border-t border-slate-100">
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Secure Your Graduate Career Path</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Ensure your professional resume, cover letters, and points tests satisfy high standards.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                <span>Explore Career Support</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

