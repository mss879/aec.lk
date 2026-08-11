"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, ShieldCheck, Globe2, Lightbulb, 
  CheckCircle2, Compass, ArrowUpRight, Clock, Users, ChevronRight 
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

const aboutCards = [
  {
    name: "Our Story",
    href: "/about/our-story",
    icon: <Clock className="w-6 h-6 text-[#124b8d]" />,
    desc: "AEC combines education counseling with migration pathway guidance as a sister company to Australian Migration Services."
  },
  {
    name: "Our Mission & Values",
    href: "/about/mission-values",
    icon: <Lightbulb className="w-6 h-6 text-[#e31b23]" />,
    desc: "We stand for absolute Integrity, Professional Excellence, Comprehensive Support, Student-Centricity, and ESOS compliance."
  },
  {
    name: "Professional Credentials",
    href: "/about/credentials",
    icon: <Award className="w-6 h-6 text-[#124b8d]" />,
    desc: "Certified by Australia's official MARA migration agents registration and qualified PIER education agent networks."
  }
];

export default function AboutPortal() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="About AEC" 
        subtitle="20+ years of established pedigree in Australian, New Zealand, and global education."
        breadcrumb="About Us"
        bgImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Pedigree Intro Section */}
      <section className="py-24 bg-white" id="why-us">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
                Corporate Pedigree
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] leading-tight">
                Two Decades of Empowering International Students
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Australian Education Centre is the premier education division of Multinational Holdings, established over 20 years ago in Melbourne, Australia. Formed as a sister company to Australian Migration Services, AEC integrates certified university counseling with legal migration advice.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-[#124b8d] pl-4">
                  <h4 className="text-3xl font-extrabold text-[#11181C]">20+ Years</h4>
                  <p className="text-slate-500 text-sm mt-1">Established History</p>
                </div>
                <div className="border-l-4 border-[#e31b23] pl-4">
                  <h4 className="text-3xl font-extrabold text-[#11181C]">4 Offices</h4>
                  <p className="text-slate-500 text-sm mt-1">Colombo, Adelaide, Melbourne, Dubai</p>
                </div>
              </div>
            </div>

            {/* Right Graphic column */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[320px]">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />
              <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl rotate-[6deg] group hover:rotate-0 transition-transform duration-500 z-10">
                <img src="/aec_team.png" alt="AEC Team" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subpage Bento Directory */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-3">
              Subpage Portals
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] mb-4">
              Explore AEC Pedigree
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {aboutCards.map((service, idx) => (
              <Link 
                key={idx}
                href={service.href}
                className="group block border border-slate-100 bg-white rounded-[2.5rem] p-8 flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.015)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C] mb-3 group-hover:text-[#124b8d] transition-colors leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
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

      {/* CTA Team */}
      <section className="py-20 bg-white overflow-hidden relative border-t border-slate-100">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Secure Vetted Academic Advice</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Our qualified educational counselors and MARA migration agents are available to assess your transcripts.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                <span>Talk to Our Team</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
