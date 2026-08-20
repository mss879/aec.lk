import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Star } from "lucide-react";
import { ConsultationForm } from "@/app/contact/consultation-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Book a free consultation with Australian Education Centre. Offices in Colombo, Melbourne, Adelaide and Dubai.",
  path: "/contact",
});

const offices = [
  {
    city: "Sri Lanka Office - Head Office",
    name: "Australian Education Centre (Pvt) Ltd",
    address: "No. 421/1/1, Thimbirigasyaya Road, Colombo 05, Sri Lanka",
    phone: "+94 11 5500100",
    mobiles: ["+94 77 395 0448", "+94 77 107 6990", "+94 77 107 6991"],
    email: "edu@multinational.com.au",
    hours: [
      "Monday - Friday: 8:30 AM to 6:30 PM",
      "Saturday: 9:30 AM to 5:30 PM",
      "2nd & 4th Sunday: 9:30 AM to 5:30 PM"
    ]
  },
  {
    city: "Melbourne Office",
    name: "Australian Education Centre",
    address: "Unit 1/11-15 Rocklea Drive, Port Melbourne, Victoria 3207, Australia",
    phone: "+61 489 980 366",
    email: "melbourne@multinational.com.au",
    hours: ["Monday - Friday: 9:00 AM to 5:30 PM"]
  },
  {
    city: "Adelaide Office",
    name: "Australian Education Centre",
    address: "Level 1, 90 King William Street, Adelaide, South Australia 5000, Australia",
    phone: "+61 489 980 366",
    email: "adelaide@multinational.com.au",
    hours: ["Monday - Friday: 9:00 AM to 5:30 PM"]
  },
  {
    city: "Dubai Office",
    name: "Australian Education Centre",
    address: "Office 9, Level 17, Boulevard Plaza Tower 1, Sheikh Mohammed Bin Rashid Boulevard, Downtown Dubai, United Arab Emirates",
    phone: "+971 58 596 0366",
    email: "dubai@multinational.com.au",
    hours: ["Monday - Friday: 9:00 AM to 5:30 PM"]
  }
];

export default function Contact() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <BreadcrumbSchema items={[{ name: "Contact Us", path: "/contact" }]} />
      <PageHero
        title="Get in Touch Today"
        subtitle="Start your international education journey with Australia&apos;s trusted education consultancy."
        breadcrumb="Contact Us"
      />

      {/* Quick Contact Portal bar */}
      <section className="py-8 bg-[#FAF8F5] text-slate-900 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="py-4 md:py-0">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Call Us Now</span>
              <a href="tel:+94115500100" className="text-lg font-black text-[#124b8d] hover:underline">+94 11 5500100</a>
            </div>
            <div className="py-4 md:py-0">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">WhatsApp Us</span>
              <a href="https://wa.me/94773950448" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-[#e31b23] hover:underline">+94 77 395 0448</a>
            </div>
            <div className="py-4 md:py-0">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">MARA Registered Sister</span>
              <span className="text-base font-bold text-slate-700">Australian Migration Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form & Contact block */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Form Column */}
            <ConsultationForm />

            {/* Office Summary Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                  Global Reach
                </span>
                <h2 className="font-heading text-3xl font-bold text-[#11181C] leading-tight">
                  Seamless Overseas Support
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  With 4 active office branches worldwide, AEC provides continuous assistance from application to local settlement.
                </p>
              </div>

              {/* Head office quick card */}
              <div className="bg-[#FAF8F5] border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
                <h3 className="font-bold text-base text-[#11181C] flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#124b8d]" /> Colombo Head Office Hours
                </h3>
                <div className="text-xs text-slate-500 space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span>Monday - Friday</span>
                    <span className="font-bold">8:30 AM to 6:30 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span>Saturday</span>
                    <span className="font-bold">9:30 AM to 5:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2nd & 4th Sunday</span>
                    <span className="font-bold">9:30 AM to 5:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Offices grid */}
      <section className="py-24 bg-[#FAF8F5] border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Locations
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] mb-4">
              Our Physical Branches
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, idx) => (
              <Card key={idx} className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 transition-all duration-500 rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#124b8d] uppercase tracking-widest block mb-1">Branch Location</span>
                    <h3 className="font-bold text-xl text-[#11181C] leading-tight">{office.city}</h3>
                    <p className="text-slate-500 text-xs mt-1 font-semibold">{office.name}</p>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-500">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-3 text-[#124b8d] shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-4 h-4 mr-3 text-[#124b8d] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div>Direct: {office.phone}</div>
                        {office.mobiles && (
                          <div className="text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
                            {office.mobiles.map((mob, mIdx) => (
                              <span key={mIdx}>Mobile: {mob}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-3 text-[#124b8d] shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:underline">{office.email}</a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Office Hours</span>
                    <ul className="text-xxs text-slate-500 space-y-1 leading-relaxed">
                      {office.hours.map((hr, hIdx) => (
                        <li key={hIdx}>• {hr}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories band. The full wall of testimonials now lives at
          /testimonials and is managed from the back office, so this page just
          points at it rather than hardcoding three quotes. */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-[2rem] border border-slate-200 bg-[#FAF8F5] px-8 py-12 md:px-14 md:py-14 shadow-sm">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                  Success Stories
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-[#11181C]">
                  Read Our Success Stories
                </h2>
                <p className="text-slate-500 mt-3 leading-relaxed">
                  Two decades of students placed in Australian universities, schools and PR pathways — in their own words.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex gap-1 text-[#e31b23]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Verified student reviews
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link href="/testimonials">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                    Read Our Success Stories
                    <ArrowUpRight className="w-4 h-4 ml-2" />
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
