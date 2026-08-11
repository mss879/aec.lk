"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, GraduationCap, Building2, MapPin, 
  ArrowUpRight, Award, HelpCircle, ShieldCheck, Compass 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const universities = [
  "Australian Catholic University", "Australian National University", "Bond University", 
  "Central Queensland University", "Charles Sturt University", "Curtin University", 
  "Deakin University", "Edith Cowan University", "Federation University", 
  "Flinders University", "Monash University", "RMIT University", 
  "Southern Cross University", "Swinburne University of Technology", "The University of Adelaide", 
  "The University of Newcastle", "The University of Queensland", "Torrens University Australia", 
  "University of Canberra", "University of New South Wales", "University of Tasmania", 
  "University of Technology Sydney", "University of Western Australia", "University of Wollongong", 
  "Victoria University", "Western Sydney University"
];

const colleges = [
  "Academy of Film Theatre and Television", "APM College of Business and Communication", 
  "Asia Pacific International College", "Australasian College of Natural Therapies", 
  "Australia Institute of Business and Technology", "Australian College of Applied Professions", 
  "Australian Harbour International College", "Box Hill Institute", "Browns English Language School", 
  "Canberra Institute of Technology", "Chisholm Institute", "Curtin College", 
  "Deakin College", "Edith Cowan College", "Engineering Institute of Technology", 
  "Federation University pathway partners", "SAE Institute", "TAFE NSW", 
  "TAFE SA", "UTS College", "University of Wollongong College"
];

export default function UniversitiesColleges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // all, universities, colleges

  // Handle hash anchor routing on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#pathway") {
        setActiveFilter("colleges");
        const el = document.getElementById("directory-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#universities") {
        setActiveFilter("universities");
        const el = document.getElementById("directory-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const filteredUnis = universities.filter(uni => 
    uni.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredColleges = colleges.filter(coll => 
    coll.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalResults = 
    (activeFilter === "all" || activeFilter === "universities" ? filteredUnis.length : 0) +
    (activeFilter === "all" || activeFilter === "colleges" ? filteredColleges.length : 0);

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Universities & Colleges" 
        subtitle="AEC connects you directly to over 50 leading Australian universities, TAFEs, and colleges."
        breadcrumb="Study in Australia / Partners"
        bgImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-16 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50/50 border border-slate-200 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-105 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">25+ Public Universities</div>
                <div className="text-slate-400 text-xs mt-0.5">Top-ranked global institutions</div>
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 border border-slate-200 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e31b23] border border-red-105 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">20+ Pathway Colleges</div>
                <div className="text-slate-400 text-xs mt-0.5">Diploma & foundation pathways</div>
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 border border-slate-200 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-105 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">TAFE NSW & TAFE SA</div>
                <div className="text-slate-400 text-xs mt-0.5">Elite government trade colleges</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Dashboard Section (Interactive Tool!) */}
      <section id="directory-section" className="py-24 bg-[#FAF8F5] border-y border-slate-200 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-12 p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
            {/* Filter Tabs */}
            <div className="flex p-1.5 bg-slate-100/90 border border-slate-200/80 rounded-full w-full lg:w-auto relative z-10 backdrop-blur-md">
              <button
                onClick={() => setActiveFilter("all")}
                className="flex-1 lg:flex-initial px-6 py-3 rounded-full text-xs font-bold transition-all relative group outline-none"
              >
                {/* Sliding Background Indicator */}
                {activeFilter === "all" && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-[#124b8d] shadow-[0_4px_12px_rgba(18,75,141,0.25)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                  activeFilter === "all" ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-900"
                }`}>
                  {activeFilter === "all" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                  )}
                  All Partners
                </span>
              </button>
              <button
                onClick={() => setActiveFilter("universities")}
                className="flex-1 lg:flex-initial px-6 py-3 rounded-full text-xs font-bold transition-all relative group outline-none"
              >
                {/* Sliding Background Indicator */}
                {activeFilter === "universities" && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-[#124b8d] shadow-[0_4px_12px_rgba(18,75,141,0.25)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                  activeFilter === "universities" ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-900"
                }`}>
                  {activeFilter === "universities" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                  )}
                  Universities
                </span>
              </button>
              <button
                onClick={() => setActiveFilter("colleges")}
                className="flex-1 lg:flex-initial px-6 py-3 rounded-full text-xs font-bold transition-all relative group outline-none"
              >
                {/* Sliding Background Indicator */}
                {activeFilter === "colleges" && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-[#124b8d] shadow-[0_4px_12px_rgba(18,75,141,0.25)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                  activeFilter === "colleges" ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-900"
                }`}>
                  {activeFilter === "colleges" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                  )}
                  Pathway Colleges
                </span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search universities or colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#11181C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-550 transition-all font-semibold"
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="text-sm font-semibold text-slate-400 mb-6 px-2">
            Showing {totalResults} matching institutions
          </div>

          {/* Grid Layout of results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Universities */}
            {(activeFilter === "all" || activeFilter === "universities") && (
              <AnimatePresence>
                {filteredUnis.map((uni, idx) => (
                  <motion.div 
                    key={uni}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200 p-6 rounded-[2rem] flex flex-col justify-between hover:shadow-xl hover:border-slate-350 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-blue-50/20 transition-colors" />
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#124b8d] text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
                        <GraduationCap className="w-3.5 h-3.5 animate-pulse" /> University
                      </span>
                      <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors leading-tight">
                        {uni}
                      </h3>
                    </div>
                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400 font-medium relative z-10">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#124b8d]" /> Australia</span>
                      <Link href="/contact" className="text-[#124b8d] hover:underline flex items-center gap-0.5 font-bold">Apply <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Colleges */}
            {(activeFilter === "all" || activeFilter === "colleges") && (
              <AnimatePresence>
                {filteredColleges.map((coll, idx) => (
                  <motion.div 
                    key={coll}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200 p-6 rounded-[2rem] flex flex-col justify-between hover:shadow-xl hover:border-red-350 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-red-50/20 transition-colors" />
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#e31b23] text-[10px] font-bold uppercase tracking-wider mb-4 border border-red-100">
                        <Building2 className="w-3.5 h-3.5 animate-pulse" /> College / Pathway
                      </span>
                      <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-[#e31b23] transition-colors leading-tight">
                        {coll}
                      </h3>
                    </div>
                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400 font-medium relative z-10">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#e31b23]" /> Australia</span>
                      <Link href="/contact" className="text-[#e31b23] hover:underline flex items-center gap-0.5 font-bold">Apply <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Empty State */}
          {totalResults === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-[2.5rem] shadow-inner">
              <HelpCircle className="w-12 h-12 text-slate-350 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No matching institutions found</h3>
              <p className="text-slate-400 text-xs mt-1">Try refining your search terms or changing your filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* University Placement Services */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side illustration */}
            <div className="lg:col-span-5 relative rounded-[2rem] overflow-hidden h-72 w-full border border-slate-200 shadow-sm group">
              <Image 
                src="/placement_guide.png" 
                alt="Placement support" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white text-base font-bold tracking-tight">
                Secure your complete educational pathway in Australia
              </div>
            </div>

            {/* Right side text content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase border border-blue-200 bg-blue-50/50 px-3 py-1 rounded-full">AEC Guidance</span>
              </div>
              <h2 className="text-4xl font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Our University Placement Services
              </h2>
              <ul className="space-y-3 text-slate-600 text-base">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] mt-2.5 shrink-0" />
                  <span>Institution selection based on academic profile & budget</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] mt-2.5 shrink-0" />
                  <span>Pathway options for students without direct entry eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] mt-2.5 shrink-0" />
                  <span>Multi-institution applications to improve visa success</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] mt-2.5 shrink-0" />
                  <span>Clear comparison of tuition fees, locations, and intakes</span>
                </li>
              </ul>
              <p className="text-slate-700 font-semibold text-base leading-relaxed">
                We ensure students are placed in <strong>genuine, accredited institutions</strong> that match both education and career goals.
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                    Start Your Admissions Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
