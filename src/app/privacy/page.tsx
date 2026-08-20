import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { ShieldCheck, Lock, Eye, FileText, Database, UserCheck, Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Australian Education Centre (AEC) collects, stores, protects, and processes your personal data and academic records.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 2026";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction & Commitment",
      icon: <ShieldCheck className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            Australian Education Centre (Pvt) Ltd (<strong>&ldquo;AEC&rdquo;</strong>, <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>, or <strong>&ldquo;our&rdquo;</strong>), operating as a core division of Multinational Holdings, is committed to safeguarding the privacy, confidentiality, and integrity of your personal information.
          </p>
          <p>
            This Privacy Policy sets out how we collect, handle, store, and protect the personal and academic data you provide when using our website, submitting consultation inquiries, or engaging our counseling and admission services across our physical branches in Sri Lanka, Australia, and the United Arab Emirates.
          </p>
          <p>
            Our practices comply with the <em>Australian Privacy Principles (APPs)</em> under the <em>Privacy Act 1988 (Cth)</em>, the <em>Sri Lanka Personal Data Protection Act No. 9 of 2022</em>, the <em>Education Services for Overseas Students (ESOS) Act 2000</em>, and applicable international data protection standards.
          </p>
        </div>
      ),
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      icon: <Database className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>To provide personalized education counseling, university applications, and visa coordination, we collect the following categories of data:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Identity & Contact Information:</strong> Full legal name, date of birth, nationality, postal address, email address, phone number, WhatsApp contact, and national identity/passport details.</li>
            <li><strong>Academic History & Qualifications:</strong> Secondary school certificates (e.g., O/Levels, A/Levels), undergraduate/postgraduate degrees, academic transcripts, grading scales, and institution records.</li>
            <li><strong>English Proficiency & Standardized Testing:</strong> Test scores and verification credentials for IELTS, PTE Academic, TOEFL, SAT, GRE, or GMAT.</li>
            <li><strong>Immigration & Financial Information:</strong> Travel history, previous visa outcomes, statement of purpose (SOP), genuine temporary entrant (GTE/GST) declarations, sponsorship letters, and financial solvency documents required for visa and university compliance.</li>
            <li><strong>Technical & Website Usage Data:</strong> IP addresses, browser type, device identifiers, referring URLs, operating system, and interaction records collected via cookies to optimize website performance.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: <Eye className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>We use your information strictly for legitimate educational, counseling, and regulatory purposes, including:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Assessing your academic eligibility and matching you with suitable global universities, colleges, and scholarship schemes.</li>
            <li>Preparing, processing, and submitting formal application dossiers to higher education institutions on your behalf.</li>
            <li>Coordinating visa documentation, Genuine Student (GS) compliance checks, and legal migration guidance with our registered MARA agents.</li>
            <li>Communicating application updates, offer letters, fee deadlines, interview bookings, and pre-departure briefings.</li>
            <li>Responding to your inquiries submitted via web forms, live chat, email, or telephone.</li>
            <li>Complying with statutory audits, university partner regulations, and international education reporting standards.</li>
          </ul>
          <p className="font-semibold text-slate-800">
            We never sell, lease, monetize, or trade your personal information to any third-party advertisers or commercial brokers.
          </p>
        </div>
      ),
    },
    {
      id: "data-sharing",
      title: "4. Disclosure & Third-Party Sharing",
      icon: <UserCheck className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>Your information is only shared with authorized entities necessary to fulfill your study abroad objectives:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Partner Institutions:</strong> Universities, TAFEs, polytechnics, colleges, and language schools to which you authorize us to apply.</li>
            <li><strong>Government & Immigration Authorities:</strong> The Australian Department of Home Affairs, Immigration New Zealand, and associated visa processing centres when submitting or auditing visa filings.</li>
            <li><strong>Accredited Assessment Bodies:</strong> Professional qualification boards, credential evaluators, and English language testing providers for verification.</li>
            <li><strong>Associated Legal Entities:</strong> Our registered sister migration firm, Australian Migration Services (AMS), for certified MARA legal migration oversight.</li>
            <li><strong>Secure Cloud Infrastructure Providers:</strong> ISO-certified hosting, database, and CRM vendors bound by strict data processing and non-disclosure agreements.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-security",
      title: "5. Data Security & Storage",
      icon: <Lock className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            We implement enterprise-grade physical, technical, and managerial safeguards to protect your personal information against unauthorized access, loss, misuse, alteration, or disclosure:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>End-to-end SSL/TLS 256-bit encryption across all digital submissions and web interactions.</li>
            <li>Role-based access controls ensuring only assigned certified counselors and compliance staff can view sensitive student records.</li>
            <li>Secure, redundant cloud storage with continuous monitoring, regular vulnerability audits, and automatic encrypted backups.</li>
            <li>Physical office security protocols across our branches in Colombo, Melbourne, Adelaide, and Dubai.</li>
          </ul>
          <p>
            Personal data is retained only for as long as necessary to provide counseling services, maintain application records for institutional audits, and fulfill legal compliance obligations.
          </p>
        </div>
      ),
    },
    {
      id: "your-rights",
      title: "6. Your Rights & Data Choices",
      icon: <FileText className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>You maintain full control over your personal data. Subject to applicable laws, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Access:</strong> Request a copy of the personal information and records we hold about you.</li>
            <li><strong>Correction:</strong> Request immediate rectification of any incomplete, inaccurate, or outdated data.</li>
            <li><strong>Erasure:</strong> Request the deletion of your personal data when it is no longer required for statutory or educational admission purposes.</li>
            <li><strong>Consent Withdrawal:</strong> Withdraw consent for marketing communications or optional newsletter updates at any time via the unsubscribe link or direct email.</li>
            <li><strong>Data Portability:</strong> Obtain your submitted academic dossiers in a structured, machine-readable format.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "7. Cookies & Analytics",
      icon: <Eye className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            Our website uses essential and analytical cookies to ensure seamless navigation, improve page loading speed, and understand how visitors interact with our service pages.
          </p>
          <p>
            You can configure your web browser settings to decline or delete cookies at any time; however, disabling essential cookies may impact certain interactive features such as consultation bookings or course filter wizards.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "8. Contact Our Privacy Officer",
      icon: <Mail className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or wish to exercise your data privacy rights, please contact our Data Governance Team:
          </p>
          <div className="bg-[#FAF8F5] border border-slate-200 rounded-2xl p-6 space-y-2.5 text-sm text-slate-700 not-prose mt-4">
            <div className="font-bold text-base text-[#11181C]">Australian Education Centre (Pvt) Ltd</div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#124b8d] shrink-0 mt-1" />
              <span>No. 421/1/1, Thimbirigasyaya Road, Colombo 05, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#124b8d] shrink-0" />
              <span>+94 11 5500100 / +94 77 395 0448</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#124b8d] shrink-0" />
              <a href="mailto:edu@multinational.com.au" className="text-[#124b8d] font-semibold hover:underline">edu@multinational.com.au</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-[#124b8d] shrink-0" />
              <span>Monday – Friday: 8:30 AM to 6:30 PM (IST)</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <BreadcrumbSchema items={[{ name: "Privacy Policy", path: "/privacy" }]} />
      <PageHero
        title="Privacy Policy"
        subtitle="How Australian Education Centre collects, uses, protects, and handles your personal information."
        breadcrumb="Privacy Policy"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header metadata pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-slate-200 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Effective Date: <strong>{lastUpdated}</strong></span>
            </div>
            <div>
              <span>Entity: <strong>Australian Education Centre (Pvt) Ltd</strong></span>
            </div>
          </div>

          {/* Quick navigation anchor bar */}
          <div className="bg-[#FAF8F5] border border-slate-200 rounded-2xl p-6 mb-16">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 mb-4">Table of Contents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-slate-600 hover:text-[#124b8d] hover:underline flex items-center gap-2 transition-colors"
                >
                  <span className="text-slate-400 font-mono text-xs">→</span>
                  <span>{sec.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border border-slate-150 rounded-3xl p-8 lg:p-10 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    {section.icon}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-[#11181C]">
                    {section.title}
                  </h2>
                </div>
                <div className="text-slate-600 text-base leading-relaxed">
                  {section.content}
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Help CTA */}
          <div className="mt-16 text-center bg-[#0A192F] text-white rounded-3xl p-10 lg:p-12 space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">Have Questions About Your Data?</h3>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Our compliance counselors are available to answer any questions regarding how your applications and records are managed.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full px-8 py-3.5 text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Contact Privacy Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
