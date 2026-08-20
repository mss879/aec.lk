import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

/** lucide-react v1 dropped brand marks, so the social glyphs stay inline. */
const brandIcon = "w-4 h-4";

function FacebookIcon() {
  return (
    <svg className={brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className={brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className={brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className={brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg className={brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 7.9v4.04a9.95 9.95 0 0 1-5-1.95v4.5a6.5 6.5 0 1 1-8-6.33v4.33a2.5 2.5 0 1 0 4 2V3h4.08A6 6 0 0 0 21 7.9z" />
    </svg>
  );
}

/**
 * Mirrors the header mega-menu so every page reachable from the navbar is also
 * reachable from the footer. Keep this in sync with `navLinks` in header.tsx.
 */
const footerNav: { title: string; href: string; links: { name: string; href: string }[] }[] = [
  {
    title: "Study in Australia",
    href: "/study-in-australia",
    links: [
      { name: "Why Study in Australia?", href: "/study-in-australia/why-study" },
      { name: "Course Finder", href: "/study-in-australia/course-finder" },
      { name: "Short & Specialized Courses", href: "/study-in-australia/short-courses" },
      { name: "Scholarships", href: "/study-in-australia/scholarships" },
      { name: "Universities & Pathway Colleges", href: "/study-in-australia/universities-colleges#directory-section" },
      { name: "University Exploration Tours", href: "/university-tours" },
      { name: "Student FAQs", href: "/study-in-australia/faqs" },
    ],
  },
  {
    title: "Visas & PR",
    href: "/pr-pathways",
    links: [
      { name: "Visa Options: 485, 407, 482", href: "/pr-pathways/visa-options" },
      { name: "Step-by-Step Journey to PR", href: "/pr-pathways/journey" },
      { name: "Permanent Residency Categories", href: "/pr-pathways/categories" },
      { name: "Bring Your Partner & Family", href: "/partner-family-visas/bring-family" },
      { name: "Partner's Work Rights", href: "/partner-family-visas/work-rights" },
      { name: "Benefits for Children", href: "/partner-family-visas/children-benefits" },
      { name: "Partner & Family Visa FAQs", href: "/partner-family-visas#faqs" },
    ],
  },
  {
    title: "Australian Schools",
    href: "/australian-school-sector",
    links: [
      { name: "What Makes Schools Special", href: "/australian-school-sector#special" },
      { name: "School Types & Programs", href: "/australian-school-sector/school-types" },
      { name: "Age-Appropriate Entry Points", href: "/australian-school-sector/entry-points" },
      { name: "Costs & Investment", href: "/australian-school-sector/costs" },
      { name: "Accommodation & Welfare", href: "/australian-school-sector/accommodation" },
      { name: "Application Process", href: "/australian-school-sector#process" },
    ],
  },
  {
    title: "Study Worldwide",
    href: "/study-worldwide",
    links: [
      { name: "All Destinations", href: "/study-worldwide#countries" },
      { name: "Compare Destinations", href: "/study-worldwide#compare" },
      { name: "MBBS in Belarus & Georgia", href: "/study-worldwide#mbbs" },
      { name: "Destination FAQs", href: "/study-worldwide#faqs" },
    ],
  },
  {
    title: "Our Services",
    href: "/services",
    links: [
      { name: "Pre-Departure Services", href: "/services/pre-departure" },
      { name: "Arrival & Settlement", href: "/services/arrival-settlement" },
      { name: "Post-Study Career Services", href: "/services/career-services" },
      { name: "IELTS / PTE Preparation", href: "/services/ielts-pte" },
      { name: "Partner & Family Visa Services", href: "/services/partner-family" },
      { name: "For Parents: Resources", href: "/services/parents-resources" },
    ],
  },
  {
    title: "About AEC",
    href: "/about",
    links: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Our Mission & Values", href: "/about/mission-values" },
      { name: "Why Choose AEC", href: "/about#why-us" },
      { name: "Professional Credentials", href: "/about/credentials" },
      { name: "Student Testimonials", href: "/testimonials" },
      { name: "Visa Grant Success Stories", href: "/success-stories" },
      { name: "Student Visa News", href: "/visa-news" },
      { name: "Blog & Insights", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

/**
 * Client-supplied profiles. Tracking params (`igsh`, `_r`, `_t`) are stripped
 * from the URLs. LinkedIn and YouTube are kept here without a link because the
 * client names them but has not sent a URL — an empty `href` is filtered out so
 * the icon stays hidden rather than pointing somewhere wrong.
 */
const socials = [
  { name: "Facebook", href: "https://www.facebook.com/australianeducationcentre", Icon: FacebookIcon },
  { name: "Instagram", href: "https://www.instagram.com/australian_edu", Icon: InstagramIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@australianeducentre", Icon: TiktokIcon },
  { name: "LinkedIn", href: "", Icon: LinkedinIcon },
  { name: "YouTube", href: "", Icon: YoutubeIcon },
].filter((social) => social.href !== "");

export function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t-2 border-slate-900">
      {/* --- CTA strip --- */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              Not sure where to start?
            </h2>
            <p className="text-[13px] md:text-sm text-slate-600 font-medium mt-1">
              Book a free consultation and get a personalised pathway within 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              href="/contact?booking=true"
              className="inline-flex items-center justify-center gap-2 bg-[#124b8d] hover:bg-[#0e3c72] text-white rounded-xl px-6 py-3 text-[12px] font-black uppercase tracking-widest transition-colors"
            >
              Book a Consultation
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/94773950448"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-900 text-slate-900 rounded-xl px-6 py-3 text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(15,23,42,1)] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* --- Brand + navigation --- */}
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand column */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <Link href="/" className="inline-block group w-fit">
              <Image
                src="/auseducenter_logo.png"
                alt="Australian Education Centre"
                width={140}
                height={80}
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-slate-600">
              Your complete journey to Australia, New Zealand &amp; global education.
              From visa to career success &mdash; we&apos;re with you every step.
            </p>

            <ul className="flex flex-col gap-3 text-[13px] text-slate-600">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#124b8d]" />
                <span>No. 421/1/1, Thimbirigasyaya Road, Colombo 05, Sri Lanka</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#124b8d]" />
                {/* Tap targets: bare inline links were under the 24px
                    minimum and sat right on top of each other. */}
                <span className="flex flex-col gap-1">
                  <a
                    href="tel:+94115500100"
                    className="inline-flex min-h-6 items-center hover:text-[#124b8d] transition-colors"
                  >
                    +94 11 5500100
                  </a>
                  <a
                    href="tel:+94773950448"
                    className="inline-flex min-h-6 items-center hover:text-[#124b8d] transition-colors"
                  >
                    +94 77 395 0448
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#124b8d]" />
                <a href="mailto:edu@multinational.com.au" className="hover:text-[#124b8d] transition-colors break-all">
                  edu@multinational.com.au
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#124b8d]" />
                <span className="flex flex-col">
                  <span>Mon &ndash; Fri: 8:30 AM &ndash; 6:30 PM</span>
                  <span>Sat: 9:30 AM &ndash; 5:30 PM</span>
                </span>
              </li>
            </ul>

            <div className="flex gap-3 pt-1">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 rounded-xl border-2 border-slate-900 bg-white flex items-center justify-center text-slate-900 shadow-[3px_3px_0px_rgba(15,23,42,1)] hover:bg-[#124b8d] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_rgba(15,23,42,1)] transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns — mirrors the header mega menu */}
          <div className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10">
            {footerNav.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <Link
                  href={section.href}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#124b8d] transition-colors"
                >
                  {section.title}
                </Link>
                <ul className="flex flex-col gap-2.5 text-[13px] text-slate-600">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-[#124b8d] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bottom bar --- */}
      <div className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-6 flex flex-col md:grid md:grid-cols-3 items-center gap-4 text-[13px] text-slate-500">
          <p className="text-center md:text-left md:justify-self-start">
            &copy; {new Date().getFullYear()} Australian Education Centre (Pvt) Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-4 order-3 md:justify-self-end">
            <Link href="/privacy" className="hover:text-[#124b8d] transition-colors">Privacy Policy</Link>
            <span className="h-3 w-px bg-slate-300" />
            <Link href="/terms" className="hover:text-[#124b8d] transition-colors">Terms &amp; Conditions</Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 order-2 md:justify-self-center">
            <span>Built and Designed by</span>
            <a
              href="https://www.arcai.agency"
              target="_blank"
              rel="noopener noreferrer"
              title="ARC AI - Built and Designed by ARC AI Agency"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/arclogo-dark.png"
                alt="ARC AI"
                width={90}
                height={26}
                className="h-[18px] w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
