"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, Briefcase, Award, TrendingUp, CheckCircle2, 
  MapPin, ArrowUpRight, Compass, ShieldCheck, ChevronRight 
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

export default function PartnerWorkRights() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Partner's Work Rights" 
        subtitle="Detailed guide on working hours and conditions for dependent partners in Australia."
        breadcrumb="Partner & Family Visas / Work Rights"
        bgImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Working Regulations
              </span>
              <h2 className="font-heading text-3xl md:text-[2.75rem] font-bold tracking-tight text-[#11181C] leading-tight">
                Unlock Dual Income Opportunities
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                One of the major benefits of the Australian student visa framework is spousal support. Dependent partners receive work rights, enabling them to work, build professional local networks, support living expenses, and contribute to future PR points.
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                    <span>Calculate Your Family Study Plan</span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Card Grid */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#11181C] mb-1">During Your Studies</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1">Work limits are bound strictly to your degree levels. Masters and PhD spouses receive unlimited full-time work rights.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e31b23] flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#11181C] mb-1">After You Graduate</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1">On eligible graduate visas (subclass 485), partners receive unlimited open work rights to build full-time careers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1]">
              Dependent Work Rights Matrix
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-500 border-collapse">
                <thead className="bg-slate-100 text-[#11181C] font-bold uppercase text-xs tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-5">Your Course Level</th>
                    <th className="px-8 py-5">Spouse Work Rights Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#124b8d]">
                      Bachelors Degree (Subclass 500)
                    </td>
                    <td className="px-8 py-6 font-semibold">
                      Up to 48 hours per fortnight during semesters (unlimited in breaks)
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#124b8d]">
                      Masters Coursework / Research (Subclass 500)
                    </td>
                    <td className="px-8 py-6 font-bold text-[#e31b23]">
                      Full-time unlimited work rights
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#124b8d]">
                      Doctorate / PhD (Subclass 500)
                    </td>
                    <td className="px-8 py-6 font-bold text-[#e31b23]">
                      Full-time unlimited work rights
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#124b8d]">
                      Temporary Graduate (Subclass 485)
                    </td>
                    <td className="px-8 py-6 font-bold text-[#e31b23]">
                      Full-time unlimited work rights
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
