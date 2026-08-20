"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// --- Types ---
type SubLink = { name: string; href: string; tag?: string };
type MegaMenuSection = { title?: string; links: SubLink[] };
type NavLink = {
  name: string;
  href: string;
  megaMenu?: MegaMenuSection[];
};

// --- Original AEC Navigation Data ---
const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Study in Australia",
    href: "/study-in-australia",
    megaMenu: [
      {
        title: "Explore Programs",
        links: [
          { name: "Why Study in Australia?", href: "/study-in-australia/why-study" },
          { name: "Course Finder", href: "/study-in-australia/course-finder" },
          { name: "Short & Specialized Courses", href: "/study-in-australia/short-courses" },
          { name: "Scholarships", href: "/study-in-australia/scholarships" },
          { name: "University Exploration Tours", href: "/university-tours" },
          { name: "FAQs", href: "/study-in-australia/faqs" },
        ]
      },
      {
        title: "Universities & Colleges",
        links: [
          { name: "Colleges / Institutes / Pathway Providers", href: "/study-in-australia/universities-colleges#pathway" },
          { name: "Universities", href: "/study-in-australia/universities-colleges#universities" },
        ]
      }
    ]
  },
  {
    name: "Visas & PR",
    href: "/pr-pathways",
    megaMenu: [
      {
        title: "PR Pathways After Study",
        links: [
          { name: "Visa Options: 485, 407, 482", href: "/pr-pathways/visa-options" },
          { name: "Step-by-Step Journey to PR", href: "/pr-pathways/journey" },
          { name: "Permanent Residency Categories", href: "/pr-pathways/categories" },
        ]
      },
      {
        title: "Partner & Family Visas",
        links: [
          { name: "Bring Your Partner & Family", href: "/partner-family-visas/bring-family" },
          { name: "Partner's Work Rights", href: "/partner-family-visas/work-rights" },
          { name: "Benefits for Children", href: "/partner-family-visas/children-benefits" },
          { name: "FAQs", href: "/partner-family-visas#faqs" },
        ]
      }
    ]
  },
  {
    name: "Schools",
    href: "/australian-school-sector",
    megaMenu: [
      {
        title: "Australian School Sector",
        links: [
          { name: "What Makes Schools Special", href: "/australian-school-sector#special" },
          { name: "School Types & Programs", href: "/australian-school-sector/school-types" },
          { name: "Age-Appropriate Entry Points", href: "/australian-school-sector/entry-points" },
          { name: "Costs & Investment", href: "/australian-school-sector/costs" },
          { name: "Accommodation & Welfare", href: "/australian-school-sector/accommodation" },
          { name: "Application Process", href: "/australian-school-sector#process" },
        ]
      }
    ]
  },
  {
    name: "Study Worldwide",
    href: "/study-worldwide",
    megaMenu: [
      {
        title: "Destinations",
        links: [
          { name: "Country Pages", href: "/study-worldwide#countries" },
          { name: "Compare Destinations Tool", href: "/study-worldwide#compare" },
          { name: "MBBS in Belarus & Georgia", href: "/study-worldwide#mbbs" },
          { name: "FAQs", href: "/study-worldwide#faqs" },
        ]
      }
    ]
  },
  {
    name: "Services",
    href: "/services",
    megaMenu: [
      {
        title: "Our Services",
        links: [
          { name: "Pre-Departure Services", href: "/services/pre-departure" },
          { name: "Arrival & Settlement Services", href: "/services/arrival-settlement" },
          { name: "Post-Study Career Services", href: "/services/career-services" },
          { name: "IELTS / PTE Preparation", href: "/services/ielts-pte" },
          { name: "Partner & Family Visa Services", href: "/services/partner-family" },
          { name: "For Parents: Resources", href: "/services/parents-resources" },
        ]
      }
    ]
  },
  {
    name: "About AEC",
    href: "/about",
    megaMenu: [
      {
        title: "Who We Are",
        links: [
          { name: "Our Story", href: "/about/our-story" },
          { name: "Our Mission & Values", href: "/about/mission-values" },
          { name: "Why Choose AEC", href: "/about#why-us" },
          { name: "Professional Credentials", href: "/about/credentials" },
        ]
      },
      {
        title: "Insights & Stories",
        links: [
          { name: "Testimonials", href: "/testimonials" },
          { name: "Blog", href: "/blog" },
        ]
      }
    ]
  },
  {
    name: "Contact",
    href: "/contact",
  }
];

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // The bar floats transparently over the hero, then pins itself to the top and
  // shrinks once the page starts moving so it costs less vertical space.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every menu when the route changes. React's documented way to react
  // to a prop/derived change is to adjust state during render rather than in an
  // effect, which also avoids the extra render pass an effect would cost.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsMobileOpen(false);
    setActiveDropdown(null);
    setOpenMobileSection(null);
  }

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-[0_2px_20px_rgba(15,23,42,0.08)]"
            : "bg-transparent"
          }`}
      >
        <div
          className={`w-full px-4 lg:px-6 xl:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-[72px]" : "h-28"
            }`}
        >

          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center shrink-0 z-50 ml-2 sm:ml-4 lg:ml-6 2xl:ml-8 transition-all duration-300 ${isScrolled ? "mt-0" : "mt-4"
              }`}
          >
            <img
              src="/auseducenter_logo.png"
              alt="AEC Logo"
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-12 md:h-14" : "h-20 md:h-24"
                }`}
            />
          </Link>

          {/* Desktop Main Nav & Right Side CTA */}
          <div className="flex flex-1 justify-end items-center">
            <nav
              className={`hidden xl:flex items-center bg-white rounded-2xl pl-2 2xl:pl-4 pr-2 border-[2px] border-slate-900 transition-all duration-300 ${isScrolled
                  ? "py-1.5 shadow-[3px_3px_0px_rgba(15,23,42,1)]"
                  : "py-2 shadow-[4px_4px_0px_rgba(15,23,42,1)]"
                }`}
            >
              {navLinks.map((link) => {
                const isActive = activeDropdown === link.name;
                return (
                  <div
                    key={link.name}
                    className="group"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 2xl:gap-1.5 font-bold transition-all duration-300 rounded-xl ${isScrolled
                          ? "text-[13px] px-2.5 2xl:px-3.5 py-2"
                          : "text-[14px] px-3 2xl:px-4 py-2.5"
                        } ${isActive && link.megaMenu
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-800 hover:text-blue-600'
                        }`}
                    >
                      {link.name}
                      {link.megaMenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-180 opacity-100' : 'opacity-50 group-hover:rotate-180'}`} />
                      )}
                    </Link>

                    {/* Desktop Mega Menu Dropdown */}
                    <AnimatePresence>
                      {link.megaMenu && isActive && (
                        <div className={`absolute left-0 w-full flex justify-center pt-4 z-50 px-4 pointer-events-none ${isScrolled ? "top-[52px]" : "top-[84px]"}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="pointer-events-auto relative w-full max-w-5xl"
                          >
                            {/* Invisible bridge for hover */}
                            <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />

                            <div className="bg-white border border-slate-100 shadow-2xl rounded-[2rem] overflow-hidden p-8">
                              <div className="grid grid-cols-4 gap-8">
                                {/* Map through up to 3 sections for the main links */}
                                {[0, 1, 2].map((colIdx) => {
                                  const section = link.megaMenu![colIdx];
                                  if (!section) return <div key={colIdx} className="hidden md:block"></div>;
                                  return (
                                    <div key={colIdx} className="flex flex-col gap-4 text-left">
                                      {section.title && (
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">
                                          {section.title}
                                        </h4>
                                      )}
                                      <div className="flex flex-col gap-3">
                                        {section.links.map(sublink => (
                                          <Link
                                            key={sublink.href}
                                            href={sublink.href}
                                            className="text-base font-bold text-slate-800 hover:text-blue-600 transition-colors flex items-center justify-between group/link"
                                          >
                                            <span>{sublink.name}</span>
                                            {sublink.tag && (
                                              <span className="text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                                                {sublink.tag}
                                              </span>
                                            )}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Blue Promo Card in the last column */}
                                <div className="col-span-1 text-left">
                                  <Link href="/contact" className="block w-full h-full bg-blue-600 hover:bg-blue-700 transition-colors rounded-[1.5rem] p-6 relative group/promo overflow-hidden shadow-lg">
                                    <div className="absolute top-6 right-6 w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center transform group-hover/promo:scale-110 group-hover/promo:rotate-12 transition-transform duration-300">
                                      <ArrowUpRight className="w-5 h-5 text-black" />
                                    </div>
                                    <div className="mt-16 flex flex-col gap-2">
                                      <h3 className="text-xl font-black text-white leading-tight">
                                        Ready to start your journey?
                                      </h3>
                                      <span className="text-blue-100 font-bold text-sm uppercase tracking-wider">Book a free consultation</span>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Integrated Apply Now Button */}
              <div className="pl-2 ml-2 border-l-[2px] border-slate-200">
                <Link href="/contact" className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black tracking-widest uppercase transition-all duration-300 ${isScrolled ? "px-4 2xl:px-5 py-2 text-[13px]" : "px-5 2xl:px-6 py-2.5 text-[14px]"}`}>
                  Apply Now
                </Link>
              </div>
            </nav>

            {/* Mobile Actions */}
            <div className="flex xl:hidden items-center shrink-0 z-50">
              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 text-slate-800 bg-white border-[2px] border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] rounded-full hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_rgba(15,23,42,1)] transition-all"
              >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Full-Screen Menu --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`xl:hidden fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 flex flex-col ${isScrolled
                ? "top-[72px] h-[calc(100vh-72px)]"
                : "top-28 h-[calc(100vh-112px)]"
              }`}
          >
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isSectionOpen = openMobileSection === link.name;

                  return (
                    <div key={link.name} className="flex flex-col border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="flex items-center justify-between gap-4">
                        <Link
                          href={link.href}
                          className="text-xl font-bold text-slate-900 dark:text-white"
                        >
                          {link.name}
                        </Link>
                        {link.megaMenu && (
                          <button
                            type="button"
                            onClick={() => setOpenMobileSection(isSectionOpen ? null : link.name)}
                            aria-expanded={isSectionOpen}
                            aria-label={`${isSectionOpen ? "Collapse" : "Expand"} ${link.name} menu`}
                            className="-mr-2 p-2 text-slate-500"
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isSectionOpen ? "rotate-180" : ""}`} />
                          </button>
                        )}
                      </div>

                      {/* Sub-links were previously unreachable on mobile — the
                          chevron was decorative and the parent link was
                          preventDefault-ed, so nothing opened. */}
                      <AnimatePresence initial={false}>
                        {link.megaMenu && isSectionOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-5 pl-1 pt-4">
                              {link.megaMenu.map((section, sectionIdx) => (
                                <div key={section.title ?? sectionIdx} className="flex flex-col gap-2.5">
                                  {section.title && (
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                                      {section.title}
                                    </h4>
                                  )}
                                  {section.links.map((sublink) => (
                                    <Link
                                      key={sublink.href}
                                      href={sublink.href}
                                      className="text-base font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
                                    >
                                      {sublink.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
              <Link href="/contact" className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full w-full py-4 text-lg font-bold transition-colors">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

