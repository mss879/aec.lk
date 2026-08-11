"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  Home, Users, ShieldCheck, CheckCircle2, Compass, ChevronRight 
} from "lucide-react";
import Link from "next/link";

export default function SchoolAccommodation() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Accommodation & Welfare" 
        subtitle="Explore Homestay, School Boarding, and Parent Guardian arrangements."
        breadcrumb="Schools / Accommodation"
        bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Grid of accommodations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Homestay */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl text-[#11181C] leading-tight tracking-tight">Homestay Families</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Students live with a carefully approved and vetted Australian family. Provides absolute safety, emotional warmth, home-cooked meals, and deep English language immersion.
                </p>
                <div className="p-4 bg-[#FAF8F5] border border-slate-100 rounded-2xl">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Typical Cost:</div>
                  <div className="font-bold text-lg text-[#124b8d] mt-0.5">AUD 280 to 350 / week</div>
                </div>
                
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Nutritious daily meals included</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Checked, secure suburban residences</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Direct Australian cultural exchange</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Commutable travel proximity to campus</span></li>
                </ul>
              </div>
            </div>

            {/* Boarding */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e31b23] flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl text-[#11181C] leading-tight tracking-tight">School Boarding</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Students live on campus in fully supervised, elite boarding houses. Provides highly structured study routines, peer relationships, and academic tutor assistance.
                </p>
                <div className="p-4 bg-[#FAF8F5] border border-slate-100 rounded-2xl">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Typical Cost:</div>
                  <div className="font-bold text-lg text-[#e31b23] mt-0.5">AUD 15,000 to 35,000 / year</div>
                </div>
                
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Secure on-campus accommodation</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Compulsory structured evening study halls</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Immediate peer integration & sports access</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#e31b23] shrink-0 mt-0.5" /> <span>Live-in faculty masters & care advisors</span></li>
                </ul>
              </div>
            </div>

            {/* Parent Guardian */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl text-[#11181C] leading-tight tracking-tight">Guardian Arrangements</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  One parent accompanies their minor child to Australia on a Student Guardian Visa (Subclass 590), renting private local apartments to provide direct family care.
                </p>
                <div className="p-4 bg-[#FAF8F5] border border-slate-100 rounded-2xl">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Typical Apartment Rent:</div>
                  <div className="font-bold text-lg text-[#124b8d] mt-0.5">AUD 1,500 to 2,500 / month</div>
                </div>
                
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Direct parent care & customized home environments</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Requires separate Subclass 590 Visa application</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Flexible local apartment choice</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" /> <span>Complete family proximity and security</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welfare notice */}
      <section className="py-24 bg-[#FAF8F5] border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 text-[#e31b23] flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Strict Welfare & CAAW Compliance
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Australia enforces strict minor student protection regulations. If a student is under 18 years of age, the school must issue a Confirmation of Appropriate Accommodation and Welfare (CAAW) before the department issues a student visa, verifying that homestays or boarding houses satisfy highest standards. AEC coordinates all approvals seamlessly.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                <span>Register Interest for Vetted Homestays</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

