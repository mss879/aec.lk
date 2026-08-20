import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Scale, CheckCircle2, AlertTriangle, FileCheck, DollarSign, HelpCircle, Shield, Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing education counseling, admission processing, and migration pathway coordination with Australian Education Centre.",
  path: "/terms",
});

export default function TermsAndConditionsPage() {
  const lastUpdated = "May 2026";

  const sections = [
    {
      id: "agreement",
      title: "1. Acceptance of Terms",
      icon: <Scale className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            Welcome to Australian Education Centre (Pvt) Ltd (<strong>&ldquo;AEC&rdquo;</strong>, <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>, or <strong>&ldquo;our&rdquo;</strong>). By accessing our website, booking a consultation, submitting application documents, or engaging our counseling services, you agree to be bound by these Terms and Conditions (<strong>&ldquo;Terms&rdquo;</strong>).
          </p>
          <p>
            If you do not agree with any part of these Terms, please do not use our website or engage our educational services. These Terms constitute a binding legal agreement between AEC and the student, parent, or guardian accessing our services.
          </p>
        </div>
      ),
    },
    {
      id: "scope-of-services",
      title: "2. Scope of AEC Services",
      icon: <CheckCircle2 className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>AEC provides comprehensive international education counseling and admissions coordination, including:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Free Initial Profile Evaluation:</strong> Review of academic transcripts, English proficiency, and career goals to recommend study destinations, universities, and eligible courses.</li>
            <li><strong>University Application Management:</strong> Verification of academic credentials, Statement of Purpose (SOP) guidance, submission of formal admission applications, and tracking offer letters.</li>
            <li><strong>Scholarship Assessment:</strong> Identifying and applying for institutional, governmental, and merit-based financial aid schemes.</li>
            <li><strong>Visa Coordination & Compliance:</strong> Guidance on Genuine Student (GS) criteria, financial solvency documentation, and student visa submissions supported by registered MARA agents.</li>
            <li><strong>Pre-Departure & Settlement Support:</strong> Briefings on travel insurance, accommodation booking, airport pickup, banking, and part-time work regulations.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "client-obligations",
      title: "3. Student & Client Obligations",
      icon: <FileCheck className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>To ensure successful and lawful processing of your applications, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Provide Genuine & Authentic Documents:</strong> All submitted academic transcripts, test certificates (IELTS/PTE), financial statements, and personal identification must be genuine, unaltered, and verifiable.</li>
            <li><strong>Full Disclosure:</strong> Disclose all previous visa applications, visa refusals, travel history, and medical or character issues to any country.</li>
            <li><strong>Timely Communication:</strong> Respond promptly to requests for additional documentation, interview preparations, tuition payment deadlines, and acceptance forms.</li>
            <li><strong>Independent Verification:</strong> Verify that your chosen course meets your long-term personal, academic, and professional accreditation requirements.</li>
          </ul>
          <p className="font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
            Notice: Submission of fraudulent or altered documents is strictly prohibited under Australian and international law. Doing so will result in immediate termination of services and may lead to institutional bans and permanent visa refusals by immigration authorities.
          </p>
        </div>
      ),
    },
    {
      id: "decisions-disclaimers",
      title: "4. Institutional Decisions & Visa Disclaimers",
      icon: <AlertTriangle className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            While AEC provides expert counseling with industry-leading success rates, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Admission Autonomy:</strong> Higher education institutions (universities, colleges, institutes) reserve sole and absolute discretion over all admissions, course prerequisites, credit transfers, and scholarship allocations.</li>
            <li><strong>Visa Grant Authority:</strong> The issuance of a student visa is exclusively determined by the relevant government immigration authority (such as the Australian Department of Home Affairs or Immigration New Zealand). No education agency or registered agent can guarantee a visa grant.</li>
            <li><strong>Regulatory Updates:</strong> Immigration policies, skilled occupation lists, and post-study work rights are subject to change by government authorities at any time.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "fees-and-payments",
      title: "5. Fees, Free Counseling & Payments",
      icon: <DollarSign className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            <strong>Core Counseling is FREE:</strong> AEC operates as an official representative for hundreds of accredited global universities and colleges. Our comprehensive academic counseling, university selection, and standard application processing are provided free of charge to students.
          </p>
          <p>
            <strong>Third-Party Costs:</strong> Students remain directly responsible for all statutory third-party costs, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>University tuition deposits and institutional application fees (if applicable).</li>
            <li>Government visa application charges (VAC).</li>
            <li>Overseas Student Health Cover (OSHC) or medical insurance.</li>
            <li>English language test registration fees (IELTS, PTE, TOEFL).</li>
            <li>Medical examinations, biometrics, and police clearance certifications.</li>
          </ul>
          <p>
            All university tuition fees must be remitted directly to the institution&rsquo;s official bank account or authorized payment portal (e.g., Flywire, Convera). AEC staff will never ask you to transfer institutional tuition into private personal bank accounts.
          </p>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property",
      icon: <Shield className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            All content on this website—including logos, trademarks, text, graphics, course guides, comparison matrices, software, and visual layouts—is the exclusive intellectual property of Australian Education Centre or its licensors and is protected by copyright and intellectual property laws.
          </p>
          <p>
            You may view, download, and print materials for personal, non-commercial use solely in connection with your educational planning. You may not reproduce, modify, distribute, or republish any content without prior written permission from AEC.
          </p>
        </div>
      ),
    },
    {
      id: "liability-governing-law",
      title: "7. Limitation of Liability & Governing Law",
      icon: <HelpCircle className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            To the maximum extent permitted by applicable law, AEC, its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of the delay, rejection, or cancellation of university applications or visa grants by third-party authorities.
          </p>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Sri Lanka and Australia, without regard to conflict of law principles. Any dispute arising out of or related to these Terms shall be subject to the jurisdiction of the competent courts of Colombo, Sri Lanka or Melbourne, Australia.
          </p>
        </div>
      ),
    },
    {
      id: "contact-info",
      title: "8. Contact & Legal Notices",
      icon: <Mail className="w-5 h-5 text-[#124b8d]" />,
      content: (
        <div className="space-y-3">
          <p>
            For formal legal notices, inquiries regarding these Terms and Conditions, or questions about our service agreements, please contact:
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
      <BreadcrumbSchema items={[{ name: "Terms & Conditions", path: "/terms" }]} />
      <PageHero
        title="Terms & Conditions"
        subtitle="The service framework, obligations, and guidelines governing your engagement with Australian Education Centre."
        breadcrumb="Terms & Conditions"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header metadata pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-slate-200 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Last Revised: <strong>{lastUpdated}</strong></span>
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
            <h3 className="text-2xl md:text-3xl font-bold">Ready to Begin Your Global Pathway?</h3>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Book a free counseling consultation with our certified advisors to explore university placements and scholarships.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full px-8 py-3.5 text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
