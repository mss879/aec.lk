import { countries } from "@/data/countries";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Wallet, GraduationCap, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.id,
  }));
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const countryId = params.country;
  
  const country = countries.find(c => c.id === countryId);
  
  if (!country) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title={`Study in ${country.name}`} 
        subtitle={country.tagline}
        breadcrumb={`Study Worldwide / ${country.name}`}
        bgImage={country.image}
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-[#11181C] mb-6">Why Study in {country.name}?</h2>
                <p className="text-lg text-slate-500 mb-6 leading-relaxed font-medium">
                  {country.description}
                </p>
                <div className="space-y-4">
                  {country.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start bg-[#FAF8F5] p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6 mr-4 text-[#124b8d] shrink-0" />
                      <span className="font-bold text-[#11181C] text-base">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-[#11181C] mb-6 flex items-center">
                  <GraduationCap className="w-8 h-8 mr-3 text-[#124b8d]" />
                  Top Universities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {country.topUniversities.map((uni, i) => (
                    <div key={i} className="p-4 border border-slate-200 bg-[#FAF8F5] rounded-xl font-bold text-center text-[#11181C] text-base md:text-lg hover:border-[#124b8d] hover:bg-white hover:shadow-md transition-all duration-300">
                      {uni}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar / Quick Facts */}
            <div className="space-y-8">
              <Card className="bg-white border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] rounded-[2rem] overflow-hidden">
                <CardHeader className="bg-slate-50/70 border-b border-slate-100 p-6 text-slate-900 rounded-none">
                  <CardTitle className="font-bold text-xl text-slate-900 tracking-tight">Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6 text-slate-900">
                  <div>
                    <div className="flex items-center text-base text-slate-600 mb-1.5 font-bold">
                      <Wallet className="w-4 h-4 mr-2 text-[#124b8d]" /> Tuition Fees (Approx)
                    </div>
                    <div className="font-extrabold text-xl text-slate-900">{country.tuitionFees}</div>
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center text-base text-slate-600 mb-1.5 font-bold">
                      <Building2 className="w-4 h-4 mr-2 text-[#124b8d]" /> Cost of Living (Approx)
                    </div>
                    <div className="font-extrabold text-xl text-slate-900">{country.costOfLiving}</div>
                  </div>
                  <div className="border-t border-slate-100 pt-6">
                    <Link href="/contact" className="block">
                      <Button size="lg" className="w-full bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-6 py-4 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                        <span>Apply Now</span>
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-[#FAF8F5] border border-slate-200/50 p-8 rounded-[2rem] text-slate-900 text-center hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <h3 className="font-bold text-2xl text-slate-900 tracking-tight">Need help deciding?</h3>
                  <p className="text-slate-600 text-base font-medium leading-relaxed">
                    Speak to our {country.name} education experts for a free profile evaluation.
                  </p>
                  <Link href="/contact" className="block pt-2">
                    <Button size="lg" className="w-full bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-6 py-4 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                      <span>Book Consultation</span>
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

