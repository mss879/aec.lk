"use client";

import { useState } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, Calculator, Landmark, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const investmentTiers = [
  { tier: "Budget Option", value: "Around AUD 43,000 / year", label: "Government school plus homestay with meals. Excellent foundational value." },
  { tier: "Mid-Range Option", value: "Around AUD 49,000 / year", label: "Catholic school plus homestay with meals. Disciplined moral pastoral care." },
  { tier: "Premium Option", value: "Around AUD 72,000 / year", label: "Private day school plus homestay with meals. High-tech facilities." },
  { tier: "Elite Option", value: "Around AUD 69,000 / year", label: "Private boarding school on-campus. Structured routines and strong networks." }
];

export default function CostsInvestment() {
  // Calculator State
  const [schoolType, setSchoolType] = useState("government"); // government, catholic, private
  const [housingType, setHousingType] = useState("homestay"); // homestay, boarding, guardian
  const [includeExtra, setIncludeExtra] = useState(true);

  // Cost mapping
  const tuitionFees = {
    government: 11500, // median of 8k - 15k
    catholic: 16000,    // median of 12k - 20k
    private: 35000     // median of 25k - 45k
  };

  const housingFees = {
    homestay: 16350,   // median of 14.5k - 18.2k
    boarding: 25000,   // median of 15k - 35k
    guardian: 24000    // median of 1.5k - 2.5k per month (2k * 12)
  };

  const otherFees = includeExtra ? 15000 : 3000; // pocket, uniform, book, OSHC, guardian services

  const calculatedTotal = tuitionFees[schoolType as keyof typeof tuitionFees] + 
                          housingFees[housingType as keyof typeof housingFees] + 
                          otherFees;

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Costs & Investment" 
        subtitle="Detailed tuition fees, accommodation options, uniform costs, and dynamic budget calculators."
        breadcrumb="Schools / Costs & Investment"
        bgImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Investment Portals
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Annual Costs Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tuition Fees */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-bold text-xl text-[#11181C] flex items-center gap-2 tracking-tight">
                <Landmark className="w-5 h-5 text-[#124b8d]" /> Annual School Fees
              </h3>
              <ul className="text-sm text-slate-600 space-y-3.5 leading-relaxed pt-2">
                <li className="flex justify-between border-b border-slate-100 pb-2.5"><span>Government public schools:</span> <span className="font-bold text-[#124b8d]">AUD 8,000 - 15,000</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-2.5"><span>Catholic moral schools:</span> <span className="font-bold text-[#124b8d]">AUD 12,000 - 20,000</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-2.5"><span>Private independent day:</span> <span className="font-bold text-[#124b8d]">AUD 25,000 - 45,000</span></li>
                <li className="flex justify-between"><span>Private boarding extra:</span> <span className="font-bold text-slate-600">AUD 15,000 - 35,000</span></li>
              </ul>
            </div>

            {/* Accommodation */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-bold text-xl text-[#11181C] flex items-center gap-2 tracking-tight">
                <Calculator className="w-5 h-5 text-[#e31b23]" /> Accommodation
              </h3>
              <ul className="text-sm text-slate-600 space-y-3.5 leading-relaxed pt-2">
                <li className="flex justify-between border-b border-slate-100 pb-2.5"><span>Homestay with meals:</span> <span className="font-bold text-[#e31b23]">AUD 14,500 - 18,200</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-2.5"><span>School boarding house:</span> <span className="font-bold text-[#e31b23]">AUD 15,000 - 35,000</span></li>
                <li className="flex justify-between"><span>Guardian rental (approx):</span> <span className="font-bold text-slate-600">AUD 1,500 - 2,500/mo</span></li>
              </ul>
            </div>

            {/* Other Costs */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-bold text-xl text-[#11181C] flex items-center gap-2 tracking-tight">
                <DollarSign className="w-5 h-5 text-[#124b8d]" /> Other Annual Costs
              </h3>
              <ul className="text-sm text-slate-600 space-y-3 leading-relaxed pt-2">
                <li className="flex justify-between border-b border-slate-100 pb-2"><span>Pocket money / transit:</span> <span className="font-bold">AUD 10,400 - 15,600</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-2"><span>School Uniforms:</span> <span className="font-bold">AUD 500 - 1,500</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-2"><span>Books & Supplies:</span> <span className="font-bold">AUD 500 - 1,000</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-2"><span>Compulsory OSHC:</span> <span className="font-bold text-[#124b8d]">AUD ~550 - 650</span></li>
                <li className="flex justify-between"><span>Guardian Services:</span> <span className="font-bold">AUD 2,000 - 4,000</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Calculator */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Interactive Tools
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-[#11181C]">
              Dynamic School Budget Estimator
            </h2>
            <p className="text-slate-500 mt-2">Map your custom child education investment in real-time.</p>
          </div>

          {/* Calculator Card Container */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">1. Select School Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "government", label: "Public" },
                      { id: "catholic", label: "Catholic" },
                      { id: "private", label: "Private" }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setSchoolType(opt.id)}
                        className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          schoolType === opt.id 
                            ? "bg-[#124b8d] text-white border-[#124b8d]" 
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-slate-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">2. Select Housing Arrangement</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "homestay", label: "Homestay" },
                      { id: "boarding", label: "Boarding" },
                      { id: "guardian", label: "Guardian" }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setHousingType(opt.id)}
                        className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          housingType === opt.id 
                            ? "bg-[#124b8d] text-white border-[#124b8d]" 
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-slate-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-slate-100 rounded-2xl">
                  <div>
                    <div className="text-xs font-bold text-[#11181C]">Include Compulsory Extras</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">Pocket money, uniforms, book codes, OSHC</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeExtra}
                    onChange={(e) => setIncludeExtra(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Total Display */}
              <div className="p-8 bg-white border border-slate-100 rounded-[2rem] text-center space-y-6 flex flex-col justify-center items-center shadow-[0_10px_35px_rgba(0,0,0,0.05)] relative overflow-hidden h-[300px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/20 rounded-bl-full pointer-events-none" />
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Projected Annual Investment</div>
                
                <div className="text-5xl font-black tracking-tight text-slate-900">
                  AUD {calculatedTotal.toLocaleString()}
                  <span className="block text-sm font-semibold text-slate-500 mt-1.5">per year</span>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed max-w-[240px] font-medium">
                  *Values represent median state statistics. Subject to specific school quotes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Annual Investment Tiers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
              Example Annual Investment Tiers
            </h2>
            <p className="text-slate-500 mt-2">Typical complete investment brackets mapped from current study files.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {investmentTiers.map((tier, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-[#11181C] leading-tight tracking-tight">{tier.tier}</h3>
                  <div className="font-extrabold text-[#124b8d] text-sm bg-[#FAF8F5] border border-slate-100 px-3 py-1.5 rounded-lg w-fit">{tier.value}</div>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{tier.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Estimate */}
      <section className="py-20 bg-[#FAF8F5] overflow-hidden relative border-t border-slate-200">
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Secure Your Child&apos;s Cost Audit</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Get a personalized cost estimate tailored directly to your child&apos;s age, academic profile, preferred state, and choice of school.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                <span>Get a Personalized Cost Estimate</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

