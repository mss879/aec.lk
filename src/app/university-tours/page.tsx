"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plane, Map, CheckCircle2, Award, Users, 
  MapPin, Clock, Compass, ArrowUpRight, Flame, HelpCircle, GraduationCap, ShieldCheck, Heart, Sparkles, BookOpen, Home
} from "lucide-react";
import Link from "next/link";

const tourFormats = [
  {
    name: "Classic University Explorer (7 Days)",
    duration: "7 Days / 6 Nights",
    highlights: [
      "8-10 major institutions visited",
      "2 full days of STEM workshops",
      "Group size: 10-15 students",
      "6 nights student accommodation",
      "Daily breakfast, campus tours & workshops",
      "Domestic flights & airport transfers included",
      "Welcome and farewell dinners included",
      "Public transport cards provided",
      "Personalized university report"
    ]
  },
  {
    name: "Comprehensive University Experience (10 Days)",
    duration: "10 Days / 9 Nights",
    highlights: [
      "12-15 major institutions visited",
      "3 full days of STEM workshops",
      "Group size: 10-15 students",
      "9 nights student accommodation",
      "Extended STEM programs",
      "Industry site visits",
      "Post-tour consultation"
    ]
  },
  {
    name: "Premium VIP Tour (10 Days)",
    duration: "10 Days / 9 Nights",
    highlights: [
      "Maximum 6 students per group",
      "Small group personalized attention",
      "Private university meetings",
      "One-on-one professor meetings",
      "Research lab access",
      "Stay with current students (2 nights)",
      "VIP industry visits",
      "All meals included",
      "Professional photos catalog",
      "3 months application assistance"
    ]
  }
];

export default function UniversityTours() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Experience Australian University Life Before You Commit" 
        subtitle="Exclusive 7-10 Day Educational Tours for Future University Students"
        breadcrumb="University Tours"
        bgImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-24 bg-[#FAF8F5]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#124b8d]/5 border border-[#124b8d]/10 text-[#124b8d] text-xs font-bold uppercase tracking-wider shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#124b8d] animate-pulse" />
                  Elite Academic Tours
                </span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                The Smart Way to Choose the{" "}
                <span className="relative inline-block text-[#e31b23]">
                  Right Australian University
                  <span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-[#e31b23]/15 rounded-full" />
                </span>
              </h2>

              <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-light">
                Before you invest AUD 100,000-150,000+ in your child&apos;s Australian university education, wouldn&apos;t you want them to actually see and experience what they&apos;re signing up for? This is <strong className="font-semibold text-slate-800">NOT a tourist holiday</strong>. This is a serious educational investment that allows your child to make informed decisions based on real experience.
              </p>
              
              <div className="pt-6">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#e31b23] hover:bg-[#b81218] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(227,27,35,0.2)] hover:shadow-[0_15px_35px_rgba(227,27,35,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 px-8 py-5 h-auto text-base inline-flex items-center gap-2 group border-0">
                    Secure Your Spot - Register Now
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Graphic column */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6 relative">
              <div className="absolute inset-0 bg-[#124b8d]/5 blur-3xl rounded-full z-0 pointer-events-none" />
              
              <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 p-8 rounded-[2rem] flex gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[#124b8d]/30 hover:-translate-y-1.5 transition-all duration-500 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#124b8d]/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#124b8d]/10 transition-all duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-slate-200 text-[#124b8d] flex items-center justify-center shrink-0 group-hover:bg-[#124b8d] group-hover:text-white group-hover:rotate-[8deg] group-hover:scale-110 shadow-sm transition-all duration-500">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#124b8d] transition-colors leading-tight mb-2">Hands-On STEM Workshops</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">Exclusive access to university facilities: Engineering workshops, IT & Computer Science labs, Health Sciences experiences, and Science laboratory sessions.</p>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 p-8 rounded-[2rem] flex gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[#e31b23]/30 hover:-translate-y-1.5 transition-all duration-500 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#e31b23]/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#e31b23]/10 transition-all duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-slate-200 text-[#e31b23] flex items-center justify-center shrink-0 group-hover:bg-[#e31b23] group-hover:text-white group-hover:rotate-[8deg] group-hover:scale-110 shadow-sm transition-all duration-500">
                  <Users className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#e31b23] transition-colors leading-tight mb-2">Real Student Life Experience</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">Live in student accommodation, eat at university cafeterias, use public transport, and join social activities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Tour Is For */}
      <section className="py-24 bg-white border-y border-slate-200/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Side */}
            <div className="lg:col-span-5 relative h-[420px] rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format&fit=crop" 
                alt="Students on campus" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/40 border border-red-500/20 px-3 py-1 rounded-full backdrop-blur-sm">Admissions Focus</span>
                <h3 className="text-2xl font-bold mt-3">Start Your Global Degree Pathway Today</h3>
              </div>
            </div>

            {/* Right Copy Side */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase border border-blue-200 bg-blue-50/50 px-3 py-1 rounded-full">Audience Criteria</span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Who This Tour Is For
              </h2>
              
              <p className="text-slate-600 font-medium">
                This tour is specifically designed for:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#124b8d]" />
                    Students aged 16-24 in:
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm pl-7 list-disc">
                    <li>A-Level Year 12/13</li>
                    <li>IB students</li>
                    <li>Grade 12/13 completing Advanced Level</li>
                    <li>Diploma holders considering Bachelor degrees</li>
                    <li>Gap year students</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#124b8d]" />
                      Academic Achievers
                    </h4>
                    <p className="text-xs text-slate-500 pl-7 leading-relaxed">Students with strong academic records targeting elite institutions.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#124b8d]" />
                      STEM-Focused Students
                    </h4>
                    <p className="text-xs text-slate-500 pl-7 leading-relaxed">Ideal for students wanting physical lab exposure and engineering training.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour formats tab switcher */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Tour Formats
            </h2>
            <p className="text-slate-505 text-sm md:text-base font-light">Select a tab below to compare Classic, Comprehensive, and Premium VIP structures.</p>
          </div>

          {/* Tabs header */}
          <div className="flex flex-wrap justify-center p-1.5 bg-slate-100/90 border border-slate-200/80 rounded-full max-w-4xl mx-auto shadow-inner relative z-10 backdrop-blur-md">
            {tourFormats.map((format, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className="px-6 py-3.5 rounded-full text-sm font-bold transition-all flex-1 md:flex-initial relative group outline-none cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTourTab"
                      className="absolute inset-0 bg-[#124b8d] shadow-[0_4px_12px_rgba(18,75,141,0.2)] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                    isActive ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-900"
                  }`}>
                    {format.name.replace(" (7 Days)", "").replace(" (10 Days)", "")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab content */}
          <div className="bg-white border border-slate-200/80 rounded-[2.5rem] shadow-xl p-8 lg:p-12 max-w-5xl mx-auto relative overflow-hidden min-h-[380px] flex flex-col justify-between hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] transition-shadow duration-500">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{tourFormats[activeTab].name}</h3>
                  <div className="inline-block mt-3 px-4 py-1.5 bg-[#124b8d]/5 border border-[#124b8d]/10 text-[#124b8d] text-sm font-bold rounded-full shadow-sm">
                    ⏱️ {tourFormats[activeTab].duration}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span>📋</span> Tour Package Inclusions:
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {tourFormats[activeTab].highlights.map((highlight, hidx) => (
                      <li 
                        key={hidx} 
                        className="flex items-start p-3 bg-[#FAF8F5]/30 hover:bg-slate-50 border border-slate-100/30 hover:border-slate-200/50 rounded-2xl transition-all duration-300 group cursor-default"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm md:text-base text-slate-600 group-hover:text-slate-900 transition-colors duration-200 font-medium leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why Choose AEC Tours */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase border border-blue-200 bg-blue-50/50 px-3 py-1 rounded-full">AEC Tour Advantages</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Why Choose AEC Tours
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "1. Genuine Educational Focus",
                desc: "We're education consultants who've created tours to help students make university decisions, not a travel company.",
                icon: <GraduationCap className="w-6 h-6 text-[#124b8d]" />
              },
              {
                title: "2. Expert University Knowledge",
                desc: "PIER-qualified counselors with 10+ years experience and university relationships.",
                icon: <Award className="w-6 h-6 text-[#e31b23]" />
              },
              {
                title: "3. Exclusive University Access",
                desc: "Private sessions, lab access, faculty meetings not available to public.",
                icon: <ShieldCheck className="w-6 h-6 text-[#124b8d]" />
              },
              {
                title: "4. Hands-On STEM",
                desc: "Actually do the work, not just look at buildings.",
                icon: <Flame className="w-6 h-6 text-[#e31b23]" />
              },
              {
                title: "5. Real Student Life Immersion",
                desc: "Stay, eat, travel like students do.",
                icon: <Home className="w-6 h-6 text-[#124b8d]" />
              },
              {
                title: "6. Complete Application Support",
                desc: "Tour is the start of your journey with us.",
                icon: <Sparkles className="w-6 h-6 text-[#e31b23]" />
              },
              {
                title: "7. Sri Lankan & South Asian Focus",
                desc: "Shared culture, meet current students from home.",
                icon: <Users className="w-6 h-6 text-[#124b8d]" />
              },
              {
                title: "8. Safety & 24/7 Support",
                desc: "Comprehensive supervision and parent updates.",
                icon: <Heart className="w-6 h-6 text-[#e31b23]" />
              }
            ].map((adv, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-slate-350 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-blue-50/20 transition-colors" />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#124b8d] group-hover:text-white transition-colors duration-300">
                    {adv.icon}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#124b8d] transition-colors leading-snug">{adv.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Accompanying Section */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-8 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#124b8d]/5 text-[#124b8d] flex items-center justify-center mx-auto mb-4 border border-[#124b8d]/10 hover:rotate-12 transition-transform duration-300">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Parent Accompanying Option
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed font-light">
            Parents experience: University tours, meet university staff, parent information sessions, financial planning workshops, and free time during student workshops. Complete peace of mind BEFORE a major educational investment.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0c3463] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.2)] hover:shadow-[0_15px_35px_rgba(18,75,141,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 px-8 py-5 h-auto text-base inline-flex items-center gap-2 group border-0">
                Register for the Next Tour
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
