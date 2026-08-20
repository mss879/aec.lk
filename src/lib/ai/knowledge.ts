import { countries } from "@/data/countries";

/**
 * The AEC knowledge base handed to the AI agent as part of its system prompt.
 *
 * Why a single curated document instead of RAG/embeddings:
 * the whole public site distils to roughly 8–10k tokens — comfortably inside
 * one prompt — and OpenAI automatically caches the static prefix of repeated
 * prompts (cached input is billed at a ~90% discount on the gpt-5 family). A
 * vector store would add latency, moving parts and retrieval misses to save
 * tokens that are already nearly free. For this to keep working, this string
 * must stay STATIC per deployment: no dates, no per-request interpolation.
 *
 * Destination data is generated from `src/data/countries.ts` so the agent can
 * never disagree with the /study-worldwide pages. The rest is distilled from
 * the page content; when a page changes materially, update the matching
 * section here.
 */

const destinationLines = countries
  .map(
    (c) =>
      `- ${c.name} (${c.region}) — ${c.tagline}. Tuition ~${c.tuitionFees}; living ~${c.costOfLiving}. Highlights: ${c.highlights.join(", ")}. Top institutions: ${c.topUniversities.join(", ")}. Details: /study-worldwide/${c.id}`
  )
  .join("\n");

export const KNOWLEDGE = `
# ABOUT AUSTRALIAN EDUCATION CENTRE (AEC)

Australian Education Centre (Pvt) Ltd is the education division of Multinational
Holdings (established 20+ years ago in Melbourne, Australia), and a sister
company to Australian Migration Services (AMS), a MARA-registered migration
firm. AEC combines certified university counselling with legal migration advice.

Key claims (all appear on the website):
- Sri Lanka's first MARA-connected education agency; 20+ years of experience.
- PIER-certified education counsellors; MARA-registered migration support via AMS.
- ESOS Act compliant placements; counselling built on the AQF framework.
- 500+ partner institutions; 98% visa success rate; thousands of students placed.
- 4 physical offices: Colombo, Melbourne, Adelaide, Dubai (24/7 coverage across time zones).
- Core counselling, university selection and standard application processing are
  FREE for students. Students pay only third-party costs (tuition deposits,
  government visa charges, OSHC, English tests, medicals, police clearances).
- Tuition is always paid directly to the institution's official account — AEC
  staff never ask for tuition into personal accounts.

# OFFICES & CONTACT

- Head Office (Colombo): No. 421/1/1, Thimbirigasyaya Road, Colombo 05, Sri Lanka.
  Phone +94 11 5500100; mobiles +94 77 395 0448, +94 77 107 6990, +94 77 107 6991.
  Hours: Mon–Fri 8:30 AM–6:30 PM, Sat 9:30 AM–5:30 PM, 2nd & 4th Sunday 9:30 AM–5:30 PM.
- Melbourne: Unit 1/11-15 Rocklea Drive, Port Melbourne, VIC 3207. +61 489 980 366. Mon–Fri 9:00–5:30.
- Adelaide: Level 1, 90 King William Street, Adelaide, SA 5000. +61 489 980 366. Mon–Fri 9:00–5:30.
- Dubai: Office 9, Level 17, Boulevard Plaza Tower 1, Downtown Dubai, UAE. +971 58 596 0366. Mon–Fri 9:00–5:30.
- Email: edu@multinational.com.au. WhatsApp: +94 77 395 0448 (https://wa.me/94773950448).
- Booking page: /contact (free consultation form).

# SERVICES (site: /services)

1. Education counselling & course selection (FREE, PIER-certified counsellors).
2. University, college & school applications — multi-institution applications to
   improve admission and visa odds; pathway options (diploma-to-degree,
   foundation) when direct entry isn't met.
3. Student visa guidance — document preparation, GTE/GS statements, financial
   evidence, lodgement supported by MARA-registered agents. FREE visa advice.
4. Pre-departure services (/services/pre-departure): financial planning & loans,
   airline ticketing, document preparation & translations, English test booking.
5. Arrival & settlement (/services/arrival-settlement): airport reception,
   accommodation search, SIM/bank/transport/TFN setup, part-time job coaching,
   enrolment wrap-up, ongoing welfare and monthly briefs.
6. Post-study career services (/services/career-services): 485 visa processing,
   Professional Year (IT/Accounting/Engineering — worth 5 PR points),
   internships, job placement, employer sponsorship (407/482), PR points audits,
   resume & cover letters, networking.
7. IELTS/PTE preparation (/services/ielts-pte): crash course, standard course,
   weekend batches, one-on-one coaching for 7.5+/PTE 79+; weekly mocks and
   1-on-1 speaking audits via partner providers.
8. Partner & family visa services (/services/partner-family): partner/spouse
   visas, dependent child visas, family visitor visas, guardian visas (590),
   graduate dependent add-ons; eligibility audits, document review, evidence
   compilation.
9. Parent resources (/services/parents-resources): AQF explainers, safety &
   welfare standards, cost-of-living budgets, visa compliance rules (80%
   attendance, work-hour limits), progress reports, parent info sessions.

# STUDY IN AUSTRALIA (site: /study-in-australia)

Why Australia: globally ranked universities regulated by TEQSA/ASQA, ESOS
consumer protection, post-study work rights, safe multicultural cities, work
while studying (generally up to 48 hours per fortnight in semesters, unlimited
in official breaks; spouses of Masters/PhD students get unlimited work rights).

Course Finder (/study-in-australia/course-finder): 15,000+ courses across TAFEs
and Go8 universities. Popular fields: IT & Cyber Security, Data Analytics & AI,
Accounting & Finance, Engineering & Construction, Nursing & Healthcare (very
high PR viability), Early Childhood Education, Hospitality & Culinary.
Budget bands used in counselling:
- AUD 15,000–25,000/yr: colleges, TAFE, regional universities
- AUD 25,000–35,000/yr: mid-range & regional universities
- AUD 35,000+/yr: top Go8 research universities
Intakes: Semester 1 (Feb/Mar) and Semester 2 (July).

Scholarships (/study-in-australia/scholarships): academic merit scholarships
(typically 15–30% tuition reduction), partial fee waivers, course-specific and
institutional/partner scholarships. AEC assesses eligibility free of charge.

Short courses (/study-in-australia/short-courses): intensive programs under 3
months (no CRICOS needed) and CRICOS-registered pathways above 3 months, in
health, business, IT/data/cyber, creative/media, hospitality, English/academic
skills.

Partner universities (25+): Australian Catholic University, Australian National
University, Bond, Central Queensland, Charles Sturt, Curtin, Deakin, Edith
Cowan, Federation, Flinders, Monash, RMIT, Southern Cross, Swinburne, Adelaide,
Newcastle, Queensland, Torrens, Canberra, UNSW, Tasmania, UTS, UWA, Wollongong,
Victoria University, Western Sydney.
Pathway colleges & TAFEs (20+): incl. Curtin College, Deakin College, Edith
Cowan College, UTS College, University of Wollongong College, TAFE NSW, TAFE SA,
Box Hill Institute, Canberra Institute of Technology, Chisholm Institute, SAE
Institute, APIC, ACAP and more. Full list: /study-in-australia/universities-colleges

University Exploration Tours (/university-tours): exclusive 7–10 day educational
tours for students aged 16–24 (A-Level/IB/Grade 12-13, diploma holders, gap
year). Hands-on STEM workshops, real student-life immersion (accommodation,
cafeterias, transport), faculty meetings, parent accompanying option. Three
formats: Classic Explorer (7 days), Comprehensive (10 days), Premium VIP (10
days). Framed as due diligence before investing AUD 100,000–150,000+ in a degree.

# VISAS & PR PATHWAYS (site: /pr-pathways)

Post-study visa options (/pr-pathways/visa-options):
- Subclass 485 Temporary Graduate — Post-Study Work stream: Bachelor 2 yrs,
  Masters 3 yrs, PhD 4 yrs of open work rights; bring spouse & children.
  Graduate Work stream: 18 months, nominated skilled occupation + skills assessment.
- Subclass 407 Training — up to 2 years, approved nominating sponsor, workplace
  training; a bridge to employer sponsorship.
- Subclass 482 (Temporary Skill Shortage / Skills in Demand) — short-term stream
  up to 2 yrs (renewable once); medium-term stream up to 4 yrs with a direct PR
  pathway; needs a formal job offer from an approved sponsor; spouses get open
  work rights.

Journey to PR (/pr-pathways/journey): typically 4–6 years total —
study (2–4 yrs) → 485 graduate work rights (2–4 yrs) → gain Australian
experience, Professional Year if relevant, English tests → EOI and PR
application. High-PR-viability fields: Nursing, Engineering, IT, Early
Childhood, trades.

PR categories (/pr-pathways/categories): Subclass 189 Skilled Independent
(points-based, no sponsor), 190 Skilled Nominated (state nomination), 491
Skilled Work Regional (regional, provisional → PR), 186 Employer Nomination
(direct employer-sponsored PR). PR is never guaranteed — AEC audits points and
plans course choices to maximise eligibility.

# PARTNER & FAMILY VISAS (site: /partner-family-visas)

- Two strategies: apply together initially (recommended — same outcome, arrive
  together, cheaper) or add family later as subsequent entrants.
- Requirements: relationship evidence (marriage cert or 12+ months de facto,
  joint finances/leases, statutory declarations), financial capacity for every
  dependent, health & character (OSHC, panel medicals, police clearance).
- Partner work rights: Bachelor-level student → partner up to 48 hrs/fortnight
  in semesters; Masters/PhD student → partner unlimited full-time; 485 holders'
  partners → unlimited open work rights.
- Children: school-age dependents access public/private schools (fees vary by
  state and visa); under-5s access regulated childcare.
- FAQs: partners usually need no English test; unmarried de facto partners
  qualify with 12 months' evidence; parents can visit on a Subclass 600 visitor
  visa; partners can study courses under 3 months (longer needs own 500 visa).

# AUSTRALIAN SCHOOLS, AGES 8–18 (site: /australian-school-sector)

School types: Public/Government (AUD 8,000–15,000/yr), Catholic (12,000–20,000),
Private/Independent day (25,000–45,000; boarding +15,000–35,000).
Accommodation: Homestay AUD 280–350/week with meals; school boarding
15,000–35,000/yr; or a parent on a Student Guardian Visa (Subclass 590) renting
privately (~AUD 1,500–2,500/month).
Other annual costs: pocket money/transit 10,400–15,600; uniforms 500–1,500;
books 500–1,000; OSHC ~550–650; guardian services 2,000–4,000.
Example totals: ~AUD 43,000/yr (government + homestay) up to ~AUD 72,000/yr
(private day + homestay).
Entry planning: best entry at start of Year 7 or Year 9/10; mid-Year-11/12
entry generally not permitted. Under-18s require CAAW (Confirmation of
Appropriate Accommodation and Welfare) before the visa is issued — AEC
coordinates it.
Process: free consultation → school selection & application → enrolment →
welfare arrangements → visa (500 + 590 if guardian) → arrival & ongoing welfare.

# STUDY WORLDWIDE (site: /study-worldwide) — 22 destinations

${destinationLines}

MBBS in Belarus & Georgia: 6-year English-medium programs at WHO/AMC-accredited
universities. Belarus: USD 4,000–5,000/yr tuition, USD 2,000–3,000/yr living.
Georgia: USD 5,000–7,000/yr tuition, USD 2,500–3,500/yr living. Eligibility: 17+,
12 years schooling, ~50%+ in Physics/Chemistry/Biology.

# CONTENT SECTIONS

- /blog — articles on visas, scholarships, applications, student life.
- /visa-news — dated Australian visa policy/processing/fee updates with official sources.
- /success-stories — real visa grants (subclass, course, institution, processing days).
- /testimonials — student reviews and success stories.

# IMPORTANT DISCLAIMERS THE SITE ITSELF MAKES

- Visa grants are decided solely by the Department of Home Affairs (or the
  destination country's authority); no agent can guarantee a visa.
- Admissions and scholarships are at the institutions' sole discretion.
- PR is never guaranteed; migration rules change frequently.
- All figures above (fees, costs, work-hour limits, visa durations) are
  indicative and subject to change by governments and institutions.
`.trim();
