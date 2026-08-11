"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  Search, HelpCircle, ChevronDown, Plus, 
  Minus, MessageCircle, Landmark, ShieldCheck, Compass 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const faqsList = [
  {
    category: "General",
    q: "Why should I choose Australia for higher education?",
    a: "Australia offers globally recognized qualifications, excellent teaching standards, attractive post-study work opportunities, and a safe, inclusive, multicultural environment that is ideal for learning and growth."
  },
  {
    category: "General",
    q: "Is Australia suitable for Sri Lankan students?",
    a: "Yes. Australia has a very large, established Sri Lankan student and expatriate community. It provides strong support networks, culturally diverse grocery stores and restaurants, and streamlined visa frameworks tailored for South Asian students."
  },
  {
    category: "Visas & Working",
    q: "Can I work while studying in Australia?",
    a: "Yes. International students on a valid student visa can work part-time during study periods (subject to current visa conditions, which generally allow up to 48 hours per fortnight) and full-time during official course breaks."
  },
  {
    category: "Migration",
    q: "Can studying in Australia lead to Permanent Residency?",
    a: "Permanent Residency is not guaranteed. However, choosing specific courses that are in high demand on Australia's skilled occupation lists, and studying in designated regional areas can significantly strengthen your eligibility points under current migration frameworks."
  }
];

export default function StudyInAustraliaFAQs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqsList.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Frequently Asked Questions" 
        subtitle="Get quick answers regarding studying, working, and PR pathways in Australia."
        breadcrumb="Study in Australia / FAQs"
        bgImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Accordion List with interactive search in high-end dual column */}
      <section className="py-24 max-w-7xl mx-auto w-full px-4 bg-[#FAF8F5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left panel: Info + Search */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase border border-blue-200 bg-blue-50/50 px-3 py-1 rounded-full">Knowledge Base</span>
            </div>
            <h2 className="text-4xl font-medium tracking-tight text-[#11181C] leading-[1.1]">
              Got Questions? <br /> We Have Answers.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Browse our comprehensive knowledge base or input keywords below to filter through visa rules, qualifications, and pathway questions.
            </p>

            {/* Search Panel */}
            <div className="relative max-w-md">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search FAQs by keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm text-[#11181C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-550 transition-all shadow-sm font-semibold"
              />
            </div>

            {/* Premium visual card for support */}
            <div className="relative rounded-[2rem] overflow-hidden h-60 w-full border border-slate-200 shadow-sm group">
              <Image 
                src="/faq_consulting.png" 
                alt="AEC direct support" 
                fill 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-200">Need specific help?</div>
                <div className="text-sm font-semibold">Talk directly with our MARA Agents</div>
              </div>
            </div>
          </div>

          {/* Right panel: Dynamic Accordion list */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence>
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`border rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      isOpen ? "bg-white shadow-xl border-blue-200 scale-[1.01]" : "bg-white hover:bg-slate-50 border-slate-200"
                    }`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="p-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isOpen ? "bg-blue-50 text-[#124b8d] border-blue-100" : "bg-slate-50 text-slate-400 border-slate-200"
                        }`}>
                          <HelpCircle className="w-5 h-5 shrink-0" />
                        </div>
                        <h3 className={`font-bold text-base md:text-lg leading-tight transition-colors ${isOpen ? "text-[#124b8d]" : "text-slate-900"}`}>
                          {faq.q}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-all ${
                        isOpen ? "bg-[#124b8d] border-[#124b8d] text-white rotate-180" : "text-slate-400"
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* expanding body content */}
                    <div className={`grid transition-all duration-350 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <div className="p-6 pt-0 pl-20 text-sm md:text-base leading-relaxed text-slate-505 border-t border-slate-150 mt-2 bg-slate-50/20">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty search state */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-[2.5rem] shadow-inner">
                <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No matching questions found</h3>
                <p className="text-slate-400 text-xs mt-1">Try typing different search keywords or ask our counselors directly below.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Counselor Callout Panel */}
      <section className="py-24 bg-white overflow-hidden relative border-t border-slate-200">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#11181C]">Still Have Questions?</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Our qualified educational counselors and MARA migration agents are available to assess your profile and answer complex queries.
          </p>

          <div className="relative rounded-[2rem] overflow-hidden h-[300px] w-full max-w-3xl mx-auto border border-slate-205 shadow-lg group mt-8">
            <Image 
              src="/faq_support.png" 
              alt="FAQ support" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="pt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Ask Our Counselors - FREE
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
