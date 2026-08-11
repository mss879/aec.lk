import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-[var(--color-brand-primary)] dark:text-white">
              AEC<span className="text-[var(--color-brand-accent)]">.</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your Complete Journey to Australian & New Zealand Education. 
              From Visa to Career Success - We're With You Every Step.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/study-in-australia" className="hover:text-[var(--color-brand-primary)]">Study Destinations</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-brand-primary)]">Our Services</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-brand-primary)]">About Us</Link></li>
              <li><Link href="/testimonials" className="hover:text-[var(--color-brand-primary)]">Testimonials</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--color-brand-primary)]">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-brand-primary)]">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Contact Info</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
              <li>123 Education Blvd, Colombo</li>
              <li>+94 77 395 0448</li>
              <li>edu@multinational.com.au</li>
              <li>Mon-Fri: 9am - 5pm</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subscribe to get the latest updates on study abroad opportunities.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex h-10 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Australian Education Centre. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
