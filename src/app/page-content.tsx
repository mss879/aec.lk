"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, GraduationCap, Building2, Users, Target, Plane, FileCheck, ArrowRight, MapPin, Phone, Calendar, ArrowUpRight, Search, Plus, ShieldCheck, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HomeContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isProcessPaused, setIsProcessPaused] = useState(false);

  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!isProcessInView || isProcessPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, [isProcessInView, isProcessPaused]);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[600px] lg:min-h-[80vh] pt-32 pb-20 flex flex-col justify-center bg-white overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="w-full px-4 lg:px-6 xl:px-8 relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content (Text) */}
            <div className="flex-1 w-full max-w-2xl lg:max-w-3xl pt-12 lg:pt-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[2rem] sm:text-5xl md:text-[3.5rem] lg:text-[3.8rem] xl:text-[4.2rem] font-black tracking-tighter text-slate-900 leading-[1.02] w-full"
              >
                <span className="block whitespace-nowrap">Your Complete Journey</span>
                <span className="text-blue-600 block mt-1 xl:mt-2">to Global Education</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-700 mt-6 max-w-xl leading-relaxed font-medium"
              >
                From university placements and visa approvals to global career success - we support you every step of the way.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 text-base font-bold transition-colors shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 sm:border-transparent">
                  Check Your Eligibility - FREE
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 rounded-full px-6 py-3 text-base font-bold transition-colors shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900">
                  Explore Our Services
                </Link>
              </motion.div>
            </div>

            {/* Right Content (Framer Motion UI Mockup) */}
            <div className="flex-1 w-full relative hidden lg:flex justify-end items-center h-[500px]">
              <div className="relative w-[450px] h-[500px] flex items-center justify-center scale-[0.85] xl:scale-90 origin-center">

                {/* SVG Network Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {/* Base dashed lines connecting center (225,250) to the 4 nodes */}
                  <line x1="225" y1="250" x2="100" y2="100" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />
                  <line x1="225" y1="250" x2="350" y2="100" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />
                  <line x1="225" y1="250" x2="100" y2="400" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />
                  <line x1="225" y1="250" x2="350" y2="400" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Animated Energy Pulses flowing outwards */}
                  <motion.line x1="225" y1="250" x2="100" y2="100" stroke="#124b8d" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }} />
                  <motion.line x1="225" y1="250" x2="350" y2="100" stroke="#e31b23" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }} />
                  <motion.line x1="225" y1="250" x2="100" y2="400" stroke="#e31b23" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }} />
                  <motion.line x1="225" y1="250" x2="350" y2="400" stroke="#124b8d" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }} />
                </svg>

                {/* Central Core: The AEC Logo */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.0, type: "spring", bounce: 0.5, delay: 0.1 }}
                  className="absolute z-20 w-36 h-36 rounded-full bg-white shadow-[0_0_60px_rgba(18,75,141,0.15)] flex flex-col items-center justify-center border-[6px] border-slate-50"
                >
                  <Image src="/auseducenter_logo.png" alt="AEC Logo" width={90} height={90} className="object-contain" />
                  {/* Pulsing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-[#124b8d] -z-10"
                  />
                </motion.div>

                {/* Node 1: University Admissions (Top Left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20, y: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: [-4, 4, -4] }}
                  transition={{ opacity: { delay: 0.4 }, scale: { delay: 0.4 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
                  className="absolute top-[50px] left-[10px] z-10 w-[180px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-[2px] border-slate-900 p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#124b8d] shrink-0">
                      <Building2 size={18} />
                    </div>
                    <div className="text-xs font-black text-slate-900 uppercase leading-tight">University<br />Admissions</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">
                    500+ Institutions
                  </div>
                </motion.div>

                {/* Node 2: Student Visas (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: [-4, 4, -4] }}
                  transition={{ opacity: { delay: 0.5 }, scale: { delay: 0.5 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                  className="absolute top-[50px] right-[10px] z-10 w-[180px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-[2px] border-slate-900 p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[#e31b23] shrink-0">
                      <Plane size={18} />
                    </div>
                    <div className="text-xs font-black text-slate-900 uppercase leading-tight">Student<br />Visas</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">
                    98% Success Rate
                  </div>
                </motion.div>

                {/* Node 3: Dependent Visas (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: [-4, 4, -4] }}
                  transition={{ opacity: { delay: 0.6 }, scale: { delay: 0.6 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
                  className="absolute bottom-[50px] left-[10px] z-10 w-[180px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-[2px] border-slate-900 p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[#e31b23] shrink-0">
                      <Users size={18} />
                    </div>
                    <div className="text-xs font-black text-slate-900 uppercase leading-tight">Dependent<br />Visas</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">
                    Family Included
                  </div>
                </motion.div>

                {/* Node 4: Test Preparation (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: [-4, 4, -4] }}
                  transition={{ opacity: { delay: 0.7 }, scale: { delay: 0.7 }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 } }}
                  className="absolute bottom-[50px] right-[10px] z-10 w-[180px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-[2px] border-slate-900 p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#124b8d] shrink-0">
                      <FileCheck size={18} />
                    </div>
                    <div className="text-xs font-black text-slate-900 uppercase leading-tight">Test<br />Preparation</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">
                    IELTS & PTE Experts
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 1.5. Trust Stats Section */}
      <section className="w-full bg-white pb-16 relative z-20">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {/* Card 1: 20+ Years Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="group relative bg-[#FAF9F6] rounded-[24px] px-6 py-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex-1 min-w-[160px] max-w-[220px] flex flex-col items-center text-center cursor-default"
            >
              <div className="text-4xl font-semibold text-[#11181C] mb-1 tracking-tight group-hover:text-blue-600 transition-colors duration-300">20+</div>
              <div className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-normal">Years Experience</div>
            </motion.div>

            {/* Card 2: PIER Qualified Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="group relative bg-[#FAF9F6] rounded-[24px] px-6 py-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex-1 min-w-[160px] max-w-[220px] flex flex-col items-center text-center cursor-default"
            >
              <div className="text-4xl font-semibold text-[#11181C] mb-1 tracking-tight group-hover:text-blue-600 transition-colors duration-300">PIER</div>
              <div className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-normal">Qualified Agents</div>
            </motion.div>

            {/* Card 3: MARA Registered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
              className="group relative bg-[#FAF9F6] rounded-[24px] px-6 py-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex-1 min-w-[160px] max-w-[220px] flex flex-col items-center text-center cursor-default"
            >
              <div className="text-4xl font-semibold text-[#11181C] mb-1 tracking-tight group-hover:text-blue-600 transition-colors duration-300">MARA</div>
              <div className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-normal">Registered</div>
            </motion.div>

            {/* Card 4: 4 Global Offices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4 }}
              className="group relative bg-[#FAF9F6] rounded-[24px] px-6 py-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex-1 min-w-[160px] max-w-[220px] flex flex-col items-center text-center cursor-default"
            >
              <div className="text-4xl font-semibold text-[#11181C] mb-1 tracking-tight group-hover:text-blue-600 transition-colors duration-300">4</div>
              <div className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-normal">Global Offices</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Why We're Different (Restored Bento Grid Layout) */}
      <section className="py-24 bg-[#FAF8F5] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Why Us</span>
              <div className="w-8 h-[1px] bg-blue-600"></div>
            </div>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1] mb-6">
              Why We&apos;re Different From <br className="hidden md:block" /> Other Education Agents
            </h2>
            <p className="text-slate-500 max-w-2xl text-lg">
              We don&apos;t just get you a visa - we build your entire future in Australia or New Zealand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* 1. First MARA Agent */}
            <div className="md:col-span-1 bg-[#FAF9F6] rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col group overflow-hidden">
              <div className="p-8 pb-0">
                <h3 className="text-2xl font-medium text-[#11181C] mb-3 leading-tight">First MARA Agent</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  20+ years expertise with Australia&apos;s official Migration Agents Registration Authority. FREE qualified immigration advice.
                </p>
              </div>
              <div className="mt-auto relative overflow-hidden h-48 w-full border-t border-slate-100/50">
                <video
                  src="/hero-opt-1-compressed.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-4 px-4 overflow-hidden z-15">
                  <div className="flex gap-4 whitespace-nowrap w-max animate-marquee">
                    <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">MARA Registered</span>
                    <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">PIER Qualified</span>
                    <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">20+ Years Exp</span>
                    <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">MARA Registered</span>
                    <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">PIER Qualified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 4 Global Offices */}
            <div className="md:col-span-1 bg-[#FAF9F6] rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col group overflow-hidden">
              <h3 className="text-2xl font-medium text-[#11181C] mb-3 leading-tight">4 Global Offices</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Melbourne, Adelaide, Colombo &amp; Dubai - providing 24/7 support across multiple time zones.
              </p>
              <div className="mt-auto relative rounded-2xl overflow-hidden h-48 w-full bg-gradient-to-br from-slate-50/80 via-white to-slate-50/80 flex items-center justify-center border border-slate-200/60 shadow-inner">
                <style dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes connectionDash {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .animate-connection {
                    stroke-dasharray: 6 4;
                    animation: connectionDash 1.2s linear infinite;
                  }
                `}} />
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative z-20 transition-transform duration-300 group-hover:scale-105">
                    {/* Pulsing ring background */}
                    <div className="absolute inset-0 bg-[#10b981]/20 rounded-full animate-ping opacity-75 scale-110"></div>
                    <div className="w-14 h-14 bg-[#11181C] rounded-full flex items-center justify-center shadow-xl shadow-black/20 relative z-10 border border-slate-800">
                      <Globe className="w-6 h-6 text-[#10b981] animate-pulse" />
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full z-10" fill="none" strokeWidth="2">
                    <line x1="50%" y1="50%" x2="25%" y2="20%" className="stroke-[#10b981]/40 animate-connection" />
                    <line x1="50%" y1="50%" x2="75%" y2="25%" className="stroke-[#10b981]/40 animate-connection" />
                    <line x1="50%" y1="50%" x2="25%" y2="80%" className="stroke-[#10b981]/40 animate-connection" />
                    <line x1="50%" y1="50%" x2="75%" y2="75%" className="stroke-[#10b981]/40 animate-connection" />
                  </svg>

                  {/* Melbourne Capsule */}
                  <div className="absolute top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="h-9 px-2.5 rounded-full bg-white border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-2 group/node cursor-default transition-transform duration-300 hover:-translate-y-1 hover:border-[#10b981] hover:shadow-[0_6px_16px_rgba(16,185,129,0.1)]">
                      <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0 border border-slate-100 shadow-sm">
                        <Image src="/office_melbourne.png" alt="Melbourne" fill className="object-cover group-hover/node:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center gap-1.5 pr-0.5">
                        <span className="text-slate-800 text-[10px] font-bold tracking-wider">MELBOURNE</span>
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-50"></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Adelaide Capsule */}
                  <div className="absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="h-9 px-2.5 rounded-full bg-white border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-2 group/node cursor-default transition-transform duration-300 hover:translate-y-1 hover:border-[#10b981] hover:shadow-[0_6px_16px_rgba(16,185,129,0.1)]">
                      <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0 border border-slate-100 shadow-sm">
                        <Image src="/office_adelaide.png" alt="Adelaide" fill className="object-cover group-hover/node:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center gap-1.5 pr-0.5">
                        <span className="text-slate-800 text-[10px] font-bold tracking-wider">ADELAIDE</span>
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-50"></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Colombo Capsule */}
                  <div className="absolute top-[80%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="h-9 px-2.5 rounded-full bg-white border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-2 group/node cursor-default transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#10b981] hover:shadow-[0_6px_16px_rgba(16,185,129,0.1)]">
                      <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0 border border-slate-100 shadow-sm">
                        <Image src="/office_colombo.png" alt="Colombo" fill className="object-cover group-hover/node:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center gap-1.5 pr-0.5">
                        <span className="text-slate-800 text-[10px] font-bold tracking-wider">COLOMBO</span>
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-50"></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dubai Capsule */}
                  <div className="absolute top-[75%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="h-9 px-2.5 rounded-full bg-white border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-2 group/node cursor-default transition-transform duration-300 hover:translate-y-1 hover:border-[#10b981] hover:shadow-[0_6px_16px_rgba(16,185,129,0.1)]">
                      <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0 border border-slate-100 shadow-sm">
                        <Image src="/office_dubai.png" alt="Dubai" fill className="object-cover group-hover/node:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center gap-1.5 pr-0.5">
                        <span className="text-slate-800 text-[10px] font-bold tracking-wider">DUBAI</span>
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-50"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Pre-Departure Support */}
            <div className="md:col-span-1 bg-[#FAF9F6] rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col group overflow-hidden min-h-[380px]">
              <div className="p-8 pb-0">
                <h3 className="text-2xl font-medium text-[#11181C] mb-3 leading-tight">Pre-Departure Support</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Airline ticketing and airport assistance included to ensure a smooth journey.
                </p>
              </div>
              <div className="mt-auto relative overflow-hidden h-48 w-full border-t border-slate-100/50">
                <video
                  src="/Travel_video_animation_airplane_compressed.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />

                {/* Floating pill input */}
                <div className="absolute inset-x-3 bottom-3 z-20 flex justify-center">
                  <div className="w-full bg-white/90 backdrop-blur-sm pl-3 pr-1 py-1 rounded-full flex items-center justify-between shadow-md border border-slate-100/50">
                    <span className="text-slate-500 text-[10px] font-medium tracking-wide flex-1 text-left">Your journey begins...</span>
                    <div className="w-6 h-6 bg-[#11181C] rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                      <Plane className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Career Placement & Family Visas */}
            <div className="md:col-span-2 bg-[#E9EBE2] rounded-[32px] p-8 lg:p-10 border border-[#DCE0D4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row items-center gap-8 group overflow-hidden">
              <div className="flex-1 z-10">
                <h3 className="text-3xl lg:text-4xl font-medium text-[#11181C] mb-4 leading-tight">
                  Career Placement &amp; Family Visas
                </h3>
                <p className="text-slate-600 text-sm mb-8 max-w-lg leading-relaxed">
                  Job opportunities, employer sponsorship, Professional Year programs, and expert guidance on dependent visas for your whole family.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact?booking=true" className="inline-flex items-center justify-center bg-[#11181C] text-white rounded-xl px-8 py-4 text-sm font-semibold transition-colors hover:bg-black shadow-md">
                    Start Learning
                  </Link>
                  <Link href="/services/career-services" className="inline-flex items-center justify-center border border-slate-400 text-[#11181C] rounded-xl px-8 py-4 text-sm font-semibold transition-colors hover:border-[#11181C] hover:bg-white bg-transparent">
                    Course Plans
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-1/2 lg:w-5/12 h-64 relative flex items-center justify-center mt-8 md:mt-0 z-0 perspective-[1000px]">
                <div className="absolute right-[5%] top-[10%] w-40 h-56 rounded-2xl overflow-hidden shadow-2xl rotate-[12deg] group-hover:rotate-[6deg] transition-all duration-500 border border-white/20">
                  <Image src="/why_card1.png" alt="Student" fill className="object-cover" />
                </div>
                <div className="absolute right-[45%] top-0 w-44 h-60 rounded-2xl overflow-hidden shadow-2xl -rotate-[6deg] group-hover:-rotate-[12deg] transition-all duration-500 z-10 border border-white/20">
                  <Image src="/why_card2.png" alt="Professional" fill className="object-cover" />
                </div>
                <div className="absolute right-[25%] bottom-[15%] w-16 h-16 bg-[#11181C] rounded-full flex items-center justify-center shadow-xl z-20 border-[4px] border-[#E9EBE2] transition-transform duration-300 group-hover:scale-105">
                  <Target className="w-7 h-7 text-[#10b981]" />
                </div>
              </div>
            </div>

            {/* 5. Complete Settlement */}
            <div className="md:col-span-1 bg-[#FAF9F6] rounded-[32px] overflow-hidden relative shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col border border-slate-100 min-h-[380px]">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/why_settlement.png"
                  alt="Settlement"
                  fill
                  className="object-cover object-bottom opacity-90 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] from-40% via-[#FAF9F6]/90 via-60% to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h3 className="text-2xl font-medium text-[#11181C] mb-3 leading-tight">Complete Settlement</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed relative z-10 max-w-[90%]">
                  Finding accommodation, part-time jobs, and settling into Australian life smoothly.
                </p>
                <div className="mt-auto flex justify-center w-full mb-2">
                  <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-full py-3 px-5 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:bg-white/95 transition-colors duration-500 transform group-hover:-translate-y-1 cursor-text w-full max-w-[240px]">
                    <span className="text-slate-500 text-xs font-medium tracking-wide flex-1 text-left">Discover your path...</span>
                    <div className="w-7 h-7 bg-[#11181C] rounded-full flex items-center justify-center shrink-0">
                      <Search className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A0F1C] relative border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-[1400px]">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-semibold tracking-tight text-white mb-6 leading-[1.1]">
              Comprehensive <span className="text-[#00A3FF]">Services</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
              Expert guidance and complete support designed to ensure your success, from your first application to your final settlement.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {[
              { title: "Education Counseling & Course Selection", text: "Get expert guidance to choose the best study destination, course, and institution for your future." },
              { title: "University, College & School Applications", text: "We help you apply to trusted universities, colleges, pathway providers, and schools." },
              { title: "Student Visa Guidance", text: "Receive complete student visa guidance with document preparation and application support." },
              { title: "Pre-Departure & Settlement Support", text: "From travel planning to settling overseas, we support you before and after arrival." },
              { title: "Career, Job Placement & PR Pathways", text: "Plan your future with support for internships, job placement, post-study visas, and PR pathways." },
              { title: "Partner & Family Support", text: "Bring your loved ones with expert support for partner, child, and family visa pathways." }
            ].map((service, idx) => {
              const isOpen = activeService === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveService(isOpen ? null : idx)}
                  className={`group cursor-pointer transition-all duration-500 overflow-hidden ${isOpen ? 'bg-white rounded-3xl my-6 border-transparent shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'border-b border-white/10 hover:bg-white/[0.02]'}`}
                >
                  <div className={`py-6 md:py-8 flex items-center justify-between transition-all duration-500 ${isOpen ? 'px-6 md:px-10' : 'px-2'}`}>
                    <div className="flex items-center gap-6 md:gap-12 w-full">
                      <span className="font-mono text-sm tracking-wider text-[#00A3FF]">
                        /00{idx + 1}
                      </span>
                      <h3 className={`text-xl md:text-[1.75rem] font-semibold tracking-wide transition-colors duration-300 ${isOpen ? 'text-[#0A0F1C]' : 'text-slate-100'}`}>
                        {service.title}
                      </h3>
                    </div>
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#0A0F1C] border-[#0A0F1C] text-white rotate-45' : 'border-white/20 bg-transparent text-slate-400 group-hover:border-[#00A3FF] group-hover:text-[#00A3FF]'}`}>
                      <Plus className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Expanding Text */}
                  <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className={`pb-8 pt-0 transition-all duration-500 ${isOpen ? 'px-6 md:px-10 pl-[4.5rem] md:pl-[8.5rem]' : 'pl-[4.5rem] md:pl-[6.5rem] pr-4'}`}>
                        <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 max-w-3xl ${isOpen ? 'text-slate-600' : 'text-slate-400'}`}>
                          {service.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 flex justify-start pl-2">
            <Link href="/services" className="inline-flex items-center justify-center bg-white text-[#0A0F1C] rounded-full px-8 py-4 text-sm font-bold transition-all duration-300 hover:bg-[#00A3FF] hover:text-white shadow-lg">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Study Destinations -> "Global Network" Bento Layout */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4 block border border-slate-200 px-3 py-1 rounded-full w-fit bg-white">GLOBAL</span>
              <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Study Destinations <br /> Overview
              </h2>
            </div>
            <Link href="/study-worldwide" className="hidden md:inline-flex items-center justify-center bg-[#11181C] text-white rounded-full px-8 py-3 text-sm font-medium transition-colors hover:bg-blue-600">
              Explore All 18 Countries
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Destination: Australia */}
            <div className="lg:col-span-2 bg-slate-100 rounded-3xl border border-slate-100 overflow-hidden relative group h-[400px] lg:h-full">
              <Image src="/dest_australia.png" alt="Australia" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11181C]/90 via-[#11181C]/20 to-transparent"></div>
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold rounded-lg w-fit mb-4 uppercase tracking-wider">Primary Destination</div>
                <h3 className="text-4xl font-bold mb-3">Australia</h3>
                <p className="text-white/80 max-w-lg text-lg mb-6">Top-tier universities, vibrant cities, and a world-class lifestyle. The perfect choice for international students seeking clear PR pathways.</p>

                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-white/60 text-sm mb-1">Universities</div>
                    <div className="font-semibold">Top 100+</div>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">Post-Study Work</div>
                    <div className="font-semibold">Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Destinations List */}
            <div className="flex flex-col gap-4">
              {[
                { id: "new-zealand", country: "New Zealand", desc: "World-class education in a safe environment.", image: "/dest_nz.png" },
                { id: "uk", country: "United Kingdom", desc: "Historic campuses with global recognition.", image: "/dest_uk.png" },
                { id: "canada", country: "Canada", desc: "High quality of life & clear PR pathways.", image: "/dest_canada.png" },
                { id: "usa", country: "USA", desc: "Cutting-edge research opportunities.", image: "/dest_usa.png" },
                { id: "uae", country: "UAE", desc: "Modern innovation blending with culture.", image: "/dest_uae.png" }
              ].map((dest, i) => (
                <Link key={i} href={`/study-worldwide/${dest.id}`} className="bg-white rounded-2xl p-3 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300 flex items-center group flex-1">
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative">
                    <Image src={dest.image} alt={dest.country} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-[#11181C] mb-0.5 group-hover:text-blue-600 transition-colors">{dest.country}</h3>
                    <p className="text-slate-500 text-sm line-clamp-1">{dest.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-slate-400 shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/study-worldwide" className="md:hidden mt-8 flex w-full items-center justify-center bg-[#11181C] text-white rounded-full px-8 py-3 text-sm font-medium transition-colors hover:bg-blue-600">
            Explore All 18 Countries
          </Link>
        </div>
      </section>

      {/* 4. How We Help You -> Animated Interactive Timeline */}
      <section ref={processRef} className="py-24 bg-[#FAF8F5] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4 border border-slate-200 px-3 py-1 rounded-full bg-white">OUR PROCESS</span>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              How We Help You<br />Through Every Stage
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">

            {/* Left Column: Interactive Timeline Navigation */}
            <div className="md:w-1/3 relative">
              {/* Vertical Line */}
              <div className="absolute left-[39px] top-[40px] bottom-[40px] w-[2px] bg-slate-200 rounded-full hidden md:block z-0"></div>

              <div className="flex flex-col gap-2 relative z-10">
                {[
                  { title: "Assessment", id: 0 },
                  { title: "Application", id: 1 },
                  { title: "Visa Processing", id: 2 },
                  { title: "Pre-Departure", id: 3 },
                  { title: "Settlement", id: 4 }
                ].map((step, i) => {
                  const isActive = activeStep === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveStep(i);
                        setIsProcessPaused(true);
                      }}
                      className={`flex items-center gap-6 p-4 rounded-2xl transition-all duration-300 text-left relative z-10 ${isActive ? 'bg-white shadow-md shadow-slate-200/50 border border-slate-100' : 'hover:bg-slate-100 opacity-70 hover:opacity-100'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-200 text-slate-500'}`}>
                        <span className="font-bold text-sm">0{i + 1}</span>
                      </div>
                      <div className={`font-semibold text-lg transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-[#11181C]'}`}>
                        {step.title}
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-12 bg-blue-600 rounded-r-full hidden md:block"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Animated Display Area */}
            <div className="md:w-2/3 flex items-center">
              <div className="w-full bg-[#11181C] rounded-[2rem] shadow-2xl min-h-[500px] h-[500px] relative overflow-hidden flex flex-col group">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {[
                      { title: "Assessment & Counseling", desc: "We start with a FREE Assessment & Counseling session to find your perfect fit. We evaluate your background, financial capacity, and career goals to suggest the best paths forward.", image: "/stage1.png" },
                      { title: "University Selection & Application", desc: "Once we map out your pathway, we handle the University Selection & Application processing. We meticulously manage the paperwork and liaise directly with institutions on your behalf.", image: "/stage2.png" },
                      { title: "Visa Processing & Documentation", desc: "Benefit from expert handling of all Visa Processing & Documentation. Our MARA registered agents ensure strict compliance with all Department of Home Affairs requirements for a successful outcome.", image: "/stage3.png" },
                      { title: "Pre-Departure & Travel Assistance", desc: "Your journey starts before you board. Pre-Departure & Travel Assistance is fully included. We book tickets, arrange airport pickups, and prepare you for your new life abroad.", image: "/stage4.png" },
                      { title: "On-ground Settlement & Career", desc: "We don't abandon you after arrival. Enjoy On-ground Settlement & Career Support. Finding accommodation, part-time jobs, and integrating into a new culture has never been easier.", image: "/stage5.png" }
                    ].filter((_, i) => i === activeStep).map((stage, idx) => (
                      <div key={idx} className="absolute inset-0 w-full h-full flex flex-col justify-end">
                        <Image src={stage.image} alt={stage.title} fill className="object-cover" priority />

                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-10" />

                        <div className="relative z-20 p-8 md:p-12 text-white w-full">
                          <div className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-4 border border-blue-400/30 px-3 py-1 rounded-full w-fit bg-blue-400/10 backdrop-blur-md">Stage 0{activeStep + 1}</div>
                          <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 leading-tight">{stage.title}</h3>
                          <p className="text-white/80 text-lg leading-relaxed max-w-xl mb-6">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicators at bottom of card */}
                <div className="absolute bottom-8 left-8 md:left-12 flex gap-2 z-30">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === i ? 'w-12 bg-blue-500' : 'w-4 bg-white/30'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/services" className="inline-flex items-center justify-center border-2 border-slate-200 hover:border-[#11181C] text-[#11181C] rounded-full px-8 py-3 text-sm font-medium transition-colors">
              See Our Complete Services
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Success Stories -> "Real Results" Split View */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
              Real Results of Students<br />Achieving Their Goals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { name: "Sarah M.", role: "Master of IT", uni: "Monash University", text: "The team made my application process seamless. The post-arrival support was incredible!" },
              { name: "David K.", role: "B. Engineering", uni: "RMIT", text: "From finding the right course to securing my visa, AEC was there every step of the way." }
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full md:w-48 h-48 bg-slate-900 rounded-3xl flex items-center justify-center p-6 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
                  <p className="text-white font-serif text-lg leading-tight relative z-10">&quot;{t.text.substring(0, 40)}...&quot;</p>
                </div>
                <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
                  <p className="text-[#11181C] text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700">{t.name.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-semibold text-[#11181C]">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hidden on mobile, show 2 more on desktop */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { name: "Amaya P.", role: "Nursing", uni: "Deakin University", text: "Their visa expertise is unmatched. I got my approval within weeks with zero hassle." },
              { name: "Ruwan J.", role: "MBA", uni: "University of Sydney", text: "The PR pathway guidance they provided changed my life trajectory in Australia completely." }
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full md:w-48 h-48 bg-slate-900 rounded-3xl flex items-center justify-center p-6 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
                  <p className="text-white font-serif text-lg leading-tight relative z-10">&quot;{t.text.substring(0, 40)}...&quot;</p>
                </div>
                <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
                  <p className="text-[#11181C] text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700">{t.name.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-semibold text-[#11181C]">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/testimonials" className="inline-flex items-center justify-center bg-[#11181C] text-white rounded-full px-8 py-3 text-sm font-medium transition-colors hover:bg-black">
              Read More Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Choose AEC -> "FAQ" Layout with Checkmarks */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-[35%]">
              <span className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-6 block border border-slate-200 px-4 py-1.5 rounded-full w-fit">ADVANTAGE</span>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-tight text-[#11181C] leading-[1.1] mb-10">
                Why Choose<br />AEC
              </h2>

              <div className="bg-white rounded-3xl p-8 mb-6 border border-slate-100 shadow-sm">
                <div className="text-sm font-semibold text-[#11181C] mb-2">24/7 Support</div>
                <a href="tel:+94773950448" className="block text-2xl font-medium text-[#11181C] mb-6 hover:text-blue-600 transition-colors">+94 77 395 0448</a>

                <div className="w-full h-px bg-slate-200/60 mb-6"></div>

                <div className="text-xs text-slate-500 mb-1">Send us an email</div>
                <a href="mailto:edu@multinational.com.au" className="text-sm font-medium text-[#11181C] hover:text-blue-600 transition-colors break-all">edu@multinational.com.au</a>
              </div>

              <Link href="/about" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-sm font-semibold transition-colors w-full">
                Learn More About Us
              </Link>
            </div>

            <div className="lg:w-[65%] mt-8 lg:mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-slate-100">
                {[
                  "Pre-departure airline ticketing",
                  "Airport reception services",
                  "Accommodation finding",
                  "Settlement support",
                  "Part-time job assistance",
                  "Career placement after studies",
                  "PR pathway guidance",
                  "Deep understanding of Australian immigration",
                  "Direct relationships with Home Affairs",
                  "FREE qualified migration advice"
                ].map((point, i) => (
                  <div key={i} className={`flex items-center gap-4 py-7 ${i >= 8 ? '' : 'border-b border-slate-100'}`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[#11181C] text-[15px] font-medium leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Latest News -> "Expert Insights" layout */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4 border border-slate-200 px-3 py-1 rounded-full">INSIGHTS</span>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
              Expert-Led Talks & <br className="hidden md:block" /> Latest News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "New Visa Rules for Australia 2026",
                excerpt: "Everything you need to know about the latest changes in student visa regulations and requirements.",
                date: "May 10, 2026",
                category: "Visa & Immigration",
                image: "/insight_visa_rules.jpg",
                href: "/blog"
              },
              {
                title: "Top 5 Emerging Careers in New Zealand",
                excerpt: "Discover high-demand green tech, engineering, and digital industries with post-study work pathways.",
                date: "May 05, 2026",
                category: "Career Pathways",
                image: "/insight_emerging_careers.jpg",
                href: "/blog"
              },
              {
                title: "How to Ace Your University Interview",
                excerpt: "Expert tips from our certified counsellors on preparing for top university admissions.",
                date: "April 28, 2026",
                category: "Student Guidance",
                image: "/insight_university_interview.jpg",
                href: "/blog"
              }
            ].map((article, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 flex flex-col gap-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                <div className="w-full h-52 bg-slate-100 rounded-2xl shrink-0 overflow-hidden relative group">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-blue-600 shadow-sm">
                    {article.category}
                  </div>
                </div>
                <div className="flex-1 px-2 pb-2 flex flex-col">
                  <h3 className="text-lg font-semibold text-[#11181C] mb-2 leading-snug">{article.title}</h3>
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                    <Calendar size={12} /> {article.date}
                  </div>
                  <p className="text-sm text-slate-500 mb-6 flex-1">{article.excerpt}</p>
                  <Link href={article.href} className="w-full py-2.5 border border-slate-200 rounded-full text-sm font-semibold text-[#11181C] hover:bg-slate-50 hover:border-slate-300 transition-colors mt-auto text-center inline-block">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact CTA -> "Ready to Start Your Australian Dream?" */}
      <section className="py-0 relative overflow-hidden bg-white">
        <div className="bg-[#0A192F] py-24 lg:py-32 rounded-none">
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-6xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white leading-[1.1] mb-6">
                  Ready to Start <br /> Your Australian Dream?
                </h2>
                <p className="text-slate-400 text-lg mb-0 font-medium max-w-md">
                  Take our FREE eligibility assessment now - Get your personalized pathway in 24 hours.
                </p>
              </div>

              <div className="lg:w-1/2 flex justify-center lg:justify-end items-center relative w-full">
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl hidden md:block"></div>

                <div className="flex flex-col items-center lg:items-end gap-4 relative z-10 w-full sm:w-auto">
                  <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white rounded-full px-8 py-4 text-sm font-semibold transition-transform shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105">
                    Check Eligibility Now - It&apos;s FREE!
                  </Link>
                  <Link href="/contact?booking=true" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#0A192F] rounded-full px-8 py-4 text-sm font-semibold transition-transform hover:scale-105">
                    <Calendar className="mr-2" size={18} /> Book a Consultation
                  </Link>
                  <a href="tel:+94773950448" className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-slate-700 text-white hover:bg-slate-800 rounded-full px-8 py-4 text-sm font-semibold transition-colors">
                    <Phone className="mr-2" size={18} /> Call Us Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
