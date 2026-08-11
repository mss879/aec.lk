"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, School, Landmark, GraduationCap, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const schoolTypes = [
  {
    type: "Private/Independent Schools (Premium)",
    icon: <GraduationCap className="w-6 h-6 text-[#124b8d]" />,
    badge: "Premium & Prestigious",
    text: "Best for parents seeking premium boarding facilities, elite academic scores, extensive sports/arts portfolios, and prestigious traditions.",
    fee: "AUD 25,000 to 45,000 / year",
    features: [
      "Smaller class sizes & personalized study tutoring",
      "Elite facilities & tech labs",
      "Exceptional university entrance (ATAR) averages",
      "Supervised boarding house placement available",
      "Extensive global leadership and creative arts programs"
    ]
  },
  {
    type: "Catholic/Religious Schools (Excellent Value)",
    icon: <Landmark className="w-6 h-6 text-[#e31b23]" />,
    badge: "Values-Based & Disciplined",
    text: "Best for families seeking solid quality education, strong moral frameworks, pastoral care, and disciplined academic settings at moderate costs.",
    fee: "AUD 12,000 to 20,000 / year",
    features: [
      "Moral values & character development integration",
      "Excellent facilities & structured pastoral care",
      "Warm community-centric atmosphere",
      "Highly competitive academic scorecards",
      "More affordable tuition than premier private day schools"
    ]
  },
  {
    type: "Government/Public Schools (Budget-Friendly)",
    icon: <School className="w-6 h-6 text-[#124b8d]" />,
    badge: "Elite National Curriculums",
    text: "Best for families seeking highly recognized, state-funded Australian education with maximum cultural integration and excellent value.",
    fee: "AUD 8,000 to 15,000 / year",
    features: [
      "Rigorous state-supported national curriculum",
      "Broad, diverse Australian student bodies",
      "Fully regulated international student support",
      "Excellent local sports & recreational facilities",
      "Unmatched budget-to-value educational index"
    ]
  }
];

export default function SchoolTypes() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="School Types & Programs" 
        subtitle="Compare Private, Catholic, and Public schools to choose the best environment."
        breadcrumb="Schools / Types & Programs"
        bgImage="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Grid of types */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Sector Comparison
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Compare School Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {schoolTypes.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center border border-blue-100/50">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-full text-slate-600 border border-slate-100">
                      {item.badge}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-2xl text-[#11181C] leading-tight tracking-tight">{item.type}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.text}</p>
                  
                  <div className="p-4 bg-[#FAF8F5] border border-slate-100 rounded-2xl">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Indicative Tuition:</div>
                    <div className="font-bold text-lg text-[#124b8d] mt-0.5">{item.fee}</div>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-600 leading-relaxed pt-2">
                    {item.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-[#124b8d] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support callout */}
      <section className="py-20 bg-[#FAF8F5] overflow-hidden relative border-t border-slate-200">
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Unsure Which Sector Fits Your Child?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Our qualified educational counselors help you evaluate specific school locations, uniform codes, boarding costs, and admission tests.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                <span>Book a Free School Consultation</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
